import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useEphemeralEmails } from '../hooks/useEphemeralEmails';
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
            Mailchimp API is not configured. To enable premium email features (e.g., transactional sending), set MAILCHIMP_API_KEY and MAILCHIMP_SERVER_PREFIX in the backend environment.
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
              <Card key={email.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{email.alias_name || 'Ephemeral Email'}</CardTitle>
                  <CardDescription className="font-mono text-base text-primary">{email.email_address}</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Expires: {new Date(email.expires_at).toLocaleString()}</span>
                  <Button variant="destructive" onClick={() => deactivateEmail(email.id)}>Delete</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
