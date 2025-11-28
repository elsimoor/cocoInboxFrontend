import React, { useMemo } from 'react'
import Layout from '@/components/Layout'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useBilling } from '@/hooks/useBilling'
import { useRouter } from 'next/router'

function fmt(d?: string | Date | null) {
  if (!d) return '—'
  const dt = typeof d === 'string' ? new Date(d) : d
  if (isNaN(dt as any)) return '—'
  return dt.toLocaleString()
}

export default function SubscriptionPage() {
  const { user } = useAuth()
  const { openPortal } = useBilling()
  const router = useRouter()

  const statusBadge = useMemo(() => {
    const s = (user as any)?.subscriptionStatus
    const base = 'inline-flex items-center rounded px-2 py-0.5 text-xs font-medium'
    switch (s) {
      case 'active':
      case 'trialing':
        return <span className={`${base} bg-green-100 text-green-800`}>{s}</span>
      case 'past_due':
      case 'unpaid':
        return <span className={`${base} bg-yellow-100 text-yellow-800`}>{s}</span>
      case 'canceled':
      case 'incomplete':
      case 'incomplete_expired':
      default:
        return <span className={`${base} bg-gray-100 text-gray-800`}>{s || 'unknown'}</span>
    }
  }, [user])

  return (
    <Layout title="Subscription">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>My Subscription</CardTitle>
            <CardDescription>Manage your Cocoinbox Pro membership</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Status</div>
                <div className="mt-1">{statusBadge}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Plan</div>
                <div className="mt-1 font-medium">Cocoinbox Pro</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border p-3">
                <div className="text-xs text-muted-foreground">Created</div>
                <div className="mt-1 text-sm">{fmt((user as any)?.subscriptionCreatedAt)}</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-xs text-muted-foreground">Current Period</div>
                <div className="mt-1 text-sm">{fmt((user as any)?.subscriptionCurrentPeriodStart)} → {fmt((user as any)?.subscriptionCurrentPeriodEnd)}</div>
              </div>
            </div>

            {(user as any)?.proGraceUntil && (
              <div className="rounded-md bg-yellow-50 border border-yellow-200 p-3 text-sm text-yellow-800">
                Your subscription is past due. Grace period ends on <b>{fmt((user as any)?.proGraceUntil)}</b>. Please update billing to avoid downgrade.
              </div>
            )}

            <div className="flex gap-3">
              <Button onClick={async () => {
                const { url } = await openPortal()
                if (url) window.location.href = url
              }}>Manage Billing</Button>
              <Button variant="secondary" onClick={() => router.push('/dashboard')}>Back to Dashboard</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
