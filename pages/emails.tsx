import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useEphemeralEmails } from '../hooks/useEphemeralEmails';
import type { EphemeralEmail } from '../hooks/useEphemeralEmails';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface InboundMessage {
  id: string;
  from: string;
  subject?: string;
  text?: string;
  html?: string;
  attachments?: { filename?: string }[];
  received_at: string;
}

interface SentMessage {
  id?: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
  sent_at: string;
}

interface EmailThread {
  email: EphemeralEmail;
  inbound: InboundMessage[];
  sent: SentMessage[];
}

export default function Emails() {
  const { user, token, loading: authLoading } = useAuth();
  const { emails, loading, error, createEmail, deactivateEmail } = useEphemeralEmails();
  const [aliasName, setAliasName] = useState('');
  const [creating, setCreating] = useState(false);
  const [mailchimpConfigured, setMailchimpConfigured] = useState<boolean | null>(null);
  const [selectedEmail, setSelectedEmail] = useState<EphemeralEmail | null>(null);
  const [thread, setThread] = useState<EmailThread | null>(null);
  const [threadLoading, setThreadLoading] = useState(false);
  const [threadError, setThreadError] = useState<string | null>(null);
  const [composeTo, setComposeTo] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');
  const [sending, setSending] = useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/config/public`);
        if (res.ok) {
          const data = await res.json();
          setMailchimpConfigured(!!data.mailchimpConfigured);
        } else {
          setMailchimpConfigured(null);
        }
      } catch {
        setMailchimpConfigured(null);
      }
    })();
  }, []);

  const fetchThread = async (emailId: string) => {
    if (!token) return;
    setThreadLoading(true);
    setThreadError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/emails/${emailId}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || 'Failed to load messages');
      }
      setThread(data as EmailThread);
    } catch (err: any) {
      setThread(null);
      setThreadError(err.message || 'Failed to load messages');
    } finally {
      setThreadLoading(false);
    }
  };

  const handleCreate = async () => {
    setCreating(true);
    await createEmail(aliasName || undefined);
    setAliasName('');
    setCreating(false);
  };

  const handleSelectEmail = (email: EphemeralEmail) => {
    setSelectedEmail(email);
    setThread(null);
    setThreadError(null);
    if (email.provider === 'mailchimp') {
      fetchThread(email.id);
    } else {
      setThreadError('Inbox is only available for Mailchimp-provisioned addresses.');
    }
  };

  const handleSendMessage = async () => {
    if (!selectedEmail || !token) return;
    if (!composeTo || !composeSubject || !composeBody) {
      setThreadError('Please fill in recipient, subject, and message body.');
      return;
    }
    setSending(true);
    setThreadError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/mail/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          to: composeTo,
          subject: composeSubject,
          text: composeBody,
          fromEmailId: selectedEmail.id,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success !== true) {
        throw new Error(data.error || 'Failed to send email');
      }
      setComposeTo('');
      setComposeSubject('');
      setComposeBody('');
      await fetchThread(selectedEmail.id);
    } catch (err: any) {
      setThreadError(err.message || 'Failed to send email');
    } finally {
      setSending(false);
    }
  };

  if (authLoading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title="Ephemeral Emails">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-foreground">Ephemeral Email Addresses</h1>
        <p className="text-muted-foreground mb-8 mt-2 text-lg">Create temporary email addresses that auto-delete after 24 hours</p>
        {error && (
          <div className="mb-4 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</div>
        )}
        {mailchimpConfigured === false && (
          <div className="mb-4 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-800">
            Mailchimp API is not configured. To enable premium email features (e.g., transactional sending), set MAILCHIMP_API_KEY, MAILCHIMP_SERVER_PREFIX, and the inbound settings in the backend environment.
          </div>
        )}

        <div className="flex flex-wrap gap-3 mb-8">
          <Input placeholder="Optional alias name" value={aliasName} onChange={(e) => setAliasName(e.target.value)} className="flex-1 min-w-[250px]" />
          <Button onClick={handleCreate} disabled={creating}>{creating ? 'Creating…' : 'Create New Email'}</Button>
        </div>

        {loading ? (
          <div>Loading emails...</div>
        ) : emails.length === 0 ? (
          <div className="text-center p-12 text-muted-foreground bg-card rounded-xl">No active ephemeral emails. Create one to get started!</div>
        ) : (
          <div className="grid gap-4">
            {emails.map((email) => (
              <Card
                key={email.id}
                className={selectedEmail?.id === email.id ? 'border-primary shadow-lg' : ''}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-lg">{email.alias_name || 'Ephemeral Email'}</CardTitle>
                      <CardDescription className="font-mono text-base text-primary">{email.email_address}</CardDescription>
                    </div>
                    {email.provider === 'mailchimp' && (
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
                        Mailchimp
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-sm text-muted-foreground">Expires: {new Date(email.expires_at).toLocaleString()}</span>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleSelectEmail(email)}>
                      {selectedEmail?.id === email.id ? 'Viewing' : 'View Inbox'}
                    </Button>
                    <Button variant="destructive" onClick={() => deactivateEmail(email.id)}>Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {selectedEmail && (
          <div className="mt-10 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Compose from {selectedEmail.email_address}</CardTitle>
                <CardDescription>Send outbound email as this address (Mailchimp only).</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {threadError && <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">{threadError}</div>}
                <div className="grid gap-3 md:grid-cols-2">
                  <Input placeholder="Recipient email" value={composeTo} onChange={(e) => setComposeTo(e.target.value)} />
                  <Input placeholder="Subject" value={composeSubject} onChange={(e) => setComposeSubject(e.target.value)} />
                </div>
                <Textarea placeholder="Message body" value={composeBody} onChange={(e) => setComposeBody(e.target.value)} rows={6} />
                <Button onClick={handleSendMessage} disabled={sending || selectedEmail.provider !== 'mailchimp'}>
                  {sending ? 'Sending...' : 'Send Email'}
                </Button>
                {selectedEmail.provider !== 'mailchimp' && (
                  <p className="text-sm text-muted-foreground">Sending from this address is only available for Mailchimp-provisioned emails.</p>
                )}
              </CardContent>
            </Card>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Inbox</CardTitle>
                  <CardDescription>Messages delivered to {selectedEmail.email_address}</CardDescription>
                </CardHeader>
                <CardContent>
                  {threadLoading ? (
                    <p>Loading messages...</p>
                  ) : !thread || selectedEmail.provider !== 'mailchimp' ? (
                    <p className="text-sm text-muted-foreground">Inbox not available for this address.</p>
                  ) : thread.inbound.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No inbound messages yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {thread.inbound.map((msg) => (
                        <div key={msg.id} className="rounded-lg border border-border p-3">
                          <div className="text-sm font-semibold">{msg.subject || '(No subject)'}</div>
                          <div className="text-xs text-muted-foreground mb-1">
                            From {msg.from} · {new Date(msg.received_at).toLocaleString()}
                          </div>
                          <p className="text-sm whitespace-pre-line">{msg.text || '(No text body)'}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Sent</CardTitle>
                  <CardDescription>Recent messages sent from this address</CardDescription>
                </CardHeader>
                <CardContent>
                  {!thread || selectedEmail.provider !== 'mailchimp' ? (
                    <p className="text-sm text-muted-foreground">No sent history available.</p>
                  ) : thread.sent.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No sent messages yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {thread.sent.map((msg) => (
                        <div key={msg.id || `${msg.sent_at}-${msg.to}`} className="rounded-lg border border-border p-3">
                          <div className="text-sm font-semibold">{msg.subject}</div>
                          <div className="text-xs text-muted-foreground mb-1">
                            To {msg.to} · {new Date(msg.sent_at).toLocaleString()}
                          </div>
                          <p className="text-sm whitespace-pre-line">{msg.text || '(No text body)'}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
