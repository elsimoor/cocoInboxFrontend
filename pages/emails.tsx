import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useEphemeralEmails } from '../hooks/useEphemeralEmails';
import type { EphemeralEmail } from '../hooks/useEphemeralEmails';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function Emails() {
  const { user, loading: authLoading } = useAuth();
  const { emails, loading, error, createEmail, deactivateEmail } = useEphemeralEmails();
  const [aliasName, setAliasName] = useState('');
  const [creating, setCreating] = useState(false);
  const [mailchimpConfigured, setMailchimpConfigured] = useState<boolean | null>(null);
  const [search, setSearch] = useState('');
  const [copyState, setCopyState] = useState<string | null>(null);
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

  const handleCreate = async () => {
    setCreating(true);
    await createEmail(aliasName || undefined);
    setAliasName('');
    setCreating(false);
  };

  const handleCopy = async (value: string, id: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyState(id);
      setTimeout(() => setCopyState(null), 1500);
    } catch {
      setCopyState(null);
    }
  };

  const filteredEmails = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return emails;
    return emails.filter((email) => {
      return (
        email.email_address.toLowerCase().includes(query) ||
        (email.alias_name || '').toLowerCase().includes(query)
      );
    });
  }, [emails, search]);

  if (authLoading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title="Ephemeral Emails">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-4 mb-10">
          <div>
            <p className="text-sm uppercase tracking-widest text-primary font-semibold">Mailboxes</p>
            <h1 className="text-3xl md:text-4xl font-semibold text-foreground mt-2">Ephemeral Email Addresses</h1>
            <p className="text-muted-foreground mt-3 text-lg max-w-3xl">
              Generate premium aliases for secure customer conversations. Pro users get Mailchimp inboxes that can send and receive instantly.
            </p>
          </div>
          {mailchimpConfigured === false && (
            <div className="rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-800">
              Mailchimp API is not configured. To enable premium inboxes, set MAILCHIMP_API_KEY, MAILCHIMP_SERVER_PREFIX, and inbound settings in the backend environment.
            </div>
          )}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Active</CardDescription>
                <CardTitle className="text-3xl">{emails.length}</CardTitle>
              </CardHeader>
              <CardContent>Ephemeral mailboxes currently assigned to your account.</CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Mailchimp Powered</CardDescription>
                <CardTitle className="text-3xl">{emails.filter((e) => e.provider === 'mailchimp').length}</CardTitle>
              </CardHeader>
              <CardContent>Premium inboxes with full send/receive capabilities.</CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Freemium Pool</CardDescription>
                <CardTitle className="text-3xl">{emails.filter((e) => e.provider !== 'mailchimp').length}</CardTitle>
              </CardHeader>
              <CardContent>Temporarily generated addresses for quick tasks.</CardContent>
            </Card>
          </div>
        </div>
        {error && (
          <div className="mb-4 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</div>
        )}

        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <Input
            placeholder="Search by alias or address"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[200px]"
          />
          <div className="flex gap-3">
            <Input placeholder="Optional alias name" value={aliasName} onChange={(e) => setAliasName(e.target.value)} className="min-w-[220px]" />
            <Button onClick={handleCreate} disabled={creating}>{creating ? 'Creating…' : 'Create Email'}</Button>
          </div>
        </div>

        {loading ? (
          <div>Loading emails...</div>
        ) : emails.length === 0 ? (
          <div className="text-center p-12 text-muted-foreground bg-card rounded-xl">No active ephemeral emails. Create one to get started!</div>
        ) : (
          <div className="grid gap-4">
            {filteredEmails.map((email) => (
              <Card key={email.id} className="transition hover:border-primary/60 hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-lg">{email.alias_name || 'Ephemeral Email'}</CardTitle>
                      <CardDescription className="font-mono text-base text-primary">{email.email_address}</CardDescription>
                      <p className="text-sm text-muted-foreground mt-1">Created {new Date(email.created_at).toLocaleString()}</p>
                    </div>
                    {email.provider === 'mailchimp' && (
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
                        Mailchimp
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex flex-wrap items-center justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Expires: {new Date(email.expires_at).toLocaleString()}</p>
                    <p className="text-sm">
                      Status:{' '}
                      <span className={`font-medium ${email.is_active ? 'text-emerald-600' : 'text-muted-foreground'}`}>
                        {email.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="secondary" onClick={() => handleCopy(email.email_address, email.id)}>
                      {copyState === email.id ? 'Copied!' : 'Copy'}
                    </Button>
                    <Button variant="outline" onClick={() => router.push(`/emails/${email.id}`)}>
                      View Inbox
                    </Button>
                    <Button variant="destructive" onClick={() => deactivateEmail(email.id)}>Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
