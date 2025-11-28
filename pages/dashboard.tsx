import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../Components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useStats } from '../hooks/useStats';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';

export default function Dashboard() {
  const { user, loading, refreshUser, token } = useAuth();
  const router = useRouter();
  const { stats, loading: statsLoading } = useStats();

  const isPro = !!(user?.roles?.includes('pro') || user?.is_pro);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // If returning from Stripe with upgraded=1, refresh user to reflect new Pro status
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      if (url.searchParams.get('upgraded') === '1') {
        const sessionId = url.searchParams.get('session_id')
        ;(async () => {
          try {
            if (sessionId) {
              await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000') + `/api/billing/confirm?session_id=${encodeURIComponent(sessionId)}`, { 
                method: 'GET', 
                headers: token ? { Authorization: `Bearer ${token}` } : {}
              })
            }
          } catch {}
          await refreshUser()
        })()
        // Clean the query param for a cleaner URL
        url.searchParams.delete('upgraded')
        url.searchParams.delete('session_id')
        window.history.replaceState({}, document.title, url.toString())
      }
    }
  }, [refreshUser])

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  if (isPro) {
    return (
      <Layout title="Dashboard">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-semibold text-foreground">Welcome to Cocoinbox Pro</h1>
          <p className="text-muted-foreground mb-10 mt-2 text-lg">Manage your privacy tools from one secure location</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="text-4xl">📧</div>
                <div>
                  <CardTitle className="text-base">Ephemeral Emails</CardTitle>
                  <CardDescription>Active addresses</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">
                  {statsLoading ? '…' : (stats?.ephemeralEmails.activeCount ?? 0)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="text-4xl">📝</div>
                <div>
                  <CardTitle className="text-base">Secure Notes</CardTitle>
                  <CardDescription>Encrypted notes</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">
                  {statsLoading ? '…' : (stats?.secureNotes.activeCount ?? 0)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="text-4xl">📁</div>
                <div>
                  <CardTitle className="text-base">Secure Files</CardTitle>
                  <CardDescription>Protected files</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">
                  {statsLoading ? '…' : (stats?.secureFiles.activeCount ?? 0)}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => router.push('/emails')}>Create Ephemeral Email</Button>
              <Button onClick={() => router.push('/notes')}>Create Secure Note</Button>
              <Button onClick={() => router.push('/files')}>Upload Secure File</Button>
              <Button onClick={() => router.push('/sms')}>Get Temp Number</Button>
              <Button onClick={() => router.push('/esim')}>eSIM & Data</Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Free user dashboard - focused on inbox
  return (
    <Layout title="Dashboard">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-foreground">Welcome to Cocoinbox</h1>
        <p className="text-muted-foreground mb-6 mt-2 text-lg">Your secure temporary email inbox</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="text-2xl">📧</div>
                Inbox Access
              </CardTitle>
              <CardDescription>
                Check your temporary emails safely and securely
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => router.push('/inbox')} className="w-full">
                Go to Inbox
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="text-2xl">⭐</div>
                Upgrade to Pro
              </CardTitle>
              <CardDescription>
                Unlock all features: secure notes, file sharing, SMS, eSIM & more
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => router.push('/upgrade')} variant="default" className="w-full">
                Devenir Pro
              </Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Available with Free Plan</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ Temporary email inbox access</li>
              <li>✓ Send emails from platform</li>
              <li>✓ Basic email management</li>
              <li className="text-gray-500">⭐ Ephemeral emails (Pro only)</li>
              <li className="text-gray-500">⭐ Secure notes (Pro only)</li>
              <li className="text-gray-500">⭐ File sharing (Pro only)</li>
              <li className="text-gray-500">⭐ SMS numbers (Pro only)</li>
              <li className="text-gray-500">⭐ eSIM & Data (Pro only)</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
