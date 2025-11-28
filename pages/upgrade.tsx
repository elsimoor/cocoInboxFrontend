import React, { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/router'
import { useBilling } from '@/hooks/useBilling'

export default function UpgradePage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const { stripeConfigured, createCheckout, openPortal } = useBilling()
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  // If user isn’t authenticated, send to login
  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login?next=/upgrade')
    }
  }, [loading, user, router])

  if (loading) return <div>Loading...</div>

  return (
    <Layout title="Upgrade to Pro">
      <div className="page">
        <h1>Passer à Pro</h1>
        <p className="subtitle">Débloquez toutes les fonctionnalités: eSIM & Data, SMS, Notes Sécurisées, Fichiers Sécurisés, Emails éphémères…</p>
        {stripeConfigured === false && (
          <div className="warning">Le paiement n'est pas encore configuré (Stripe). Contactez le support pour être activé manuellement.</div>
        )}
        {err && <div className="error">{err}</div>}
        <div className="card">
          <h3>Pro</h3>
          <ul className="features">
            <li>✓ Accès à tous les services</li>
            <li>✓ Support prioritaire</li>
            <li>✓ Sécurité avancée</li>
          </ul>
          {!user?.is_pro ? (
            <button
              className="btn"
              disabled={!stripeConfigured || busy}
              onClick={async () => {
                setErr(null)
                setBusy(true)
                try {
                  const { url } = await createCheckout()
                  if (!url) throw new Error("Aucune URL de paiement retournée")
                  window.location.href = url
                } catch (e: any) {
                  setErr(e?.message || 'Échec de la redirection vers Stripe')
                } finally {
                  setBusy(false)
                }
              }}
            >{busy ? 'Redirection…' : 'Devenir Pro'}</button>
          ) : (
            <button
              className="btn"
              onClick={async () => {
                setErr(null)
                setBusy(true)
                try {
                  const { url } = await openPortal()
                  if (!url) throw new Error('Aucune URL du portail retournée')
                  window.location.href = url
                } catch (e: any) {
                  setErr(e?.message || 'Impossible d’ouvrir le portail de facturation')
                } finally { setBusy(false) }
              }}
            >Gérer mon abonnement</button>
          )}
        </div>
      </div>
      <style jsx>{`
        .page { max-width: 900px; margin: 0 auto; }
        h1 { font-size: 32px; color: #1e293b; margin: 8px 0; }
        .subtitle { color: #64748b; margin-bottom: 16px; }
        .warning { background: #fff7ed; color: #9a3412; padding: 12px 16px; border-radius: 8px; margin-bottom: 12px; }
        .error { background: #fee2e2; color: #b91c1c; padding: 12px 16px; border-radius: 8px; margin-bottom: 12px; }
        .card { background: #fff; border-radius: 12px; padding: 16px; border: 1px solid #e2e8f0; }
        .features { list-style: none; padding: 0; margin: 12px 0 16px; color: #0f172a; }
        .btn { background: #0891B2; color: white; border: none; padding: 10px 16px; border-radius: 6px; cursor: pointer; }
      `}</style>
    </Layout>
  )
}
