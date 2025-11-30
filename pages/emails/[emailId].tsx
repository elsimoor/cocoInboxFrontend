import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { useEphemeralEmails, EphemeralEmail } from '../../hooks/useEphemeralEmails';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface InboundMessage {
  id: string;
  from: string;
  subject?: string;
  text?: string;
  html?: string;
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
  meta: {
    inboundPage: number;
    inboundLimit: number;
    inboundTotal: number;
    sentPage: number;
    sentLimit: number;
    sentTotal: number;
  };
}

export default function EmailInboxPage() {
  const router = useRouter();
  const { emailId } = router.query;
  const { user, token, loading: authLoading } = useAuth();
  const { emails, loading: emailsLoading } = useEphemeralEmails();
  const [currentEmail, setCurrentEmail] = useState<EphemeralEmail | null>(null);
  const [thread, setThread] = useState<EmailThread | null>(null);
  const [threadLoading, setThreadLoading] = useState(false);
  const [threadError, setThreadError] = useState<string | null>(null);
  const [composeTo, setComposeTo] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');
  const [sending, setSending] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [inboundPage, setInboundPage] = useState(1);
  const [sentPage, setSentPage] = useState(1);
  const INBOUND_LIMIT = 10;
  const SENT_LIMIT = 10;

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!emailId || Array.isArray(emailId)) {
      return;
    }
    const found = emails.find((email) => email.id === emailId);
    if (found) {
      setCurrentEmail(found);
    }
  }, [emailId, emails]);

  useEffect(() => {
    setInboundPage(1);
    setSentPage(1);
  }, [emailId]);

  const fetchThread = async (opts?: { inboundPage?: number; sentPage?: number }) => {
    if (!emailId || Array.isArray(emailId) || !token) return;
    const targetInboundPage = opts?.inboundPage ?? inboundPage;
    const targetSentPage = opts?.sentPage ?? sentPage;
    setThreadLoading(true);
    setThreadError(null);
    try {
      const params = new URLSearchParams({
        inboundPage: String(targetInboundPage),
        inboundLimit: String(INBOUND_LIMIT),
        sentPage: String(targetSentPage),
        sentLimit: String(SENT_LIMIT),
      });
      const res = await fetch(`${API_BASE_URL}/api/emails/${emailId}/messages?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || 'Failed to load inbox');
      }
      const typed = data as EmailThread;
      setThread(typed);
      setCurrentEmail((prev) => prev || typed.email);
      if (typed.meta.inboundPage !== inboundPage) {
        setInboundPage(typed.meta.inboundPage);
      }
      if (typed.meta.sentPage !== sentPage) {
        setSentPage(typed.meta.sentPage);
      }
    } catch (err: any) {
      setThread(null);
      setThreadError(err.message || 'Failed to load inbox');
    } finally {
      setThreadLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchThread({ inboundPage, sentPage }).catch(() => {});
  }, [emailId, token, inboundPage, sentPage]);

  const handleSendMessage = async () => {
    if (!currentEmail || !token) return;
    if (!composeTo || !composeSubject || !composeBody) {
      setThreadError('Recipient, subject, and message body are required.');
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
          fromEmailId: currentEmail.id,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success !== true) {
        throw new Error(data.error || 'Failed to send email');
      }
      setComposeTo('');
      setComposeSubject('');
      setComposeBody('');
      await refreshThread();
    } catch (err: any) {
      setThreadError(err.message || 'Failed to send email');
    } finally {
      setSending(false);
    }
  };

  const refreshThread = async () => {
    if (!emailId || Array.isArray(emailId) || !token) return;
    setRefreshing(true);
    try {
      await fetchThread();
    } finally {
      setRefreshing(false);
    }
  };

  const isMailchimpEmail = useMemo(
    () => currentEmail?.provider === 'mailchimp',
    [currentEmail]
  );

  const inboundTotalPages = thread ? Math.max(1, Math.ceil(thread.meta.inboundTotal / thread.meta.inboundLimit)) : 1;
  const sentTotalPages = thread ? Math.max(1, Math.ceil(thread.meta.sentTotal / thread.meta.sentLimit)) : 1;

  return (
    <Layout title="Mailbox">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <Button variant="ghost" onClick={() => router.push('/emails')} className="px-0 text-sm text-primary" type="button">
              ← Back to Mailboxes
            </Button>
            <h1 className="text-3xl font-semibold mt-2">{currentEmail?.alias_name || 'Ephemeral Inbox'}</h1>
            <p className="font-mono text-primary text-lg">{currentEmail?.email_address || 'Loading…'}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Created {currentEmail ? new Date(currentEmail.created_at).toLocaleString() : '—'} · Expires{' '}
              {currentEmail ? new Date(currentEmail.expires_at).toLocaleString() : '—'}
            </p>
          </div>
          {isMailchimpEmail && (
            <div className="flex gap-3">
              <Button variant="outline" onClick={refreshThread} disabled={refreshing}>
                {refreshing ? 'Refreshing…' : 'Refresh'}
              </Button>
            </div>
          )}
        </div>

        {!isMailchimpEmail && (
          <div className="rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-800">
            Inbox view is only available for Mailchimp-provisioned addresses.
          </div>
        )}

        {threadError && (
          <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">{threadError}</div>
        )}

        <div className="grid gap-6 md:grid-cols-5">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Compose</CardTitle>
              <CardDescription>Send outbound email as this address</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input placeholder="Recipient email" value={composeTo} onChange={(e) => setComposeTo(e.target.value)} disabled={!isMailchimpEmail} />
              <Input placeholder="Subject" value={composeSubject} onChange={(e) => setComposeSubject(e.target.value)} disabled={!isMailchimpEmail} />
              <Textarea placeholder="Message body" rows={6} value={composeBody} onChange={(e) => setComposeBody(e.target.value)} disabled={!isMailchimpEmail} />
              <Button onClick={handleSendMessage} disabled={!isMailchimpEmail || sending}>
                {sending ? 'Sending…' : 'Send'}
              </Button>
            </CardContent>
          </Card>
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Inbox</CardTitle>
              <CardDescription>Newest messages appear first</CardDescription>
            </CardHeader>
            <CardContent>
              {threadLoading ? (
                <p>Loading messages…</p>
              ) : !isMailchimpEmail ? (
                <p className="text-sm text-muted-foreground">Premium inbox unavailable for this address.</p>
              ) : !thread || thread.inbound.length === 0 ? (
                <p className="text-sm text-muted-foreground">No inbound messages yet.</p>
              ) : (
                <div className="space-y-4">
                  {thread.inbound.map((msg) => (
                    <div key={msg.id} className="rounded-lg border border-border p-3 bg-card">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-sm">{msg.subject || '(No subject)'}</p>
                          <p className="text-xs text-muted-foreground">From {msg.from}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{new Date(msg.received_at).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 whitespace-pre-line">{msg.text || '(No text body)'}</p>
                    </div>
                  ))}
                </div>
              )}
              {isMailchimpEmail && thread && thread.inbound.length > 0 && (
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-muted-foreground">
                    Page {thread.meta.inboundPage} of {inboundTotalPages}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setInboundPage((prev) => Math.max(1, prev - 1))}
                      disabled={thread.meta.inboundPage <= 1 || threadLoading}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setInboundPage((prev) => Math.min(inboundTotalPages, prev + 1))}
                      disabled={thread.meta.inboundPage >= inboundTotalPages || threadLoading}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sent Messages</CardTitle>
            <CardDescription>Recent outbound emails</CardDescription>
          </CardHeader>
          <CardContent>
            {!isMailchimpEmail ? (
              <p className="text-sm text-muted-foreground">Sending is disabled for non-Mailchimp addresses.</p>
            ) : !thread || thread.sent.length === 0 ? (
              <p className="text-sm text-muted-foreground">No sent messages yet.</p>
            ) : (
              <div className="space-y-4">
                {thread.sent.map((msg) => (
                  <div key={msg.id || `${msg.sent_at}-${msg.to}`} className="rounded-lg border border-border p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-sm">{msg.subject}</p>
                        <p className="text-xs text-muted-foreground">To {msg.to}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{new Date(msg.sent_at).toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 whitespace-pre-line">{msg.text || '(No text body)'}</p>
                  </div>
                ))}
              </div>
            )}
            {isMailchimpEmail && thread && thread.sent.length > 0 && (
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  Page {thread.meta.sentPage} of {sentTotalPages}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSentPage((prev) => Math.max(1, prev - 1))}
                    disabled={thread.meta.sentPage <= 1 || threadLoading}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSentPage((prev) => Math.min(sentTotalPages, prev + 1))}
                    disabled={thread.meta.sentPage >= sentTotalPages || threadLoading}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
