import React, { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/router'
import { useEsim } from '@/hooks/useEsim'

export default function EsimPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const { loading, error, esimConfigured, plans, profiles, fetchPlans, purchasePlan, activateProfile, deleteProfile } = useEsim()
  const [country, setCountry] = useState('FR')
  const [purchasing, setPurchasing] = useState<string | null>(null)
  const [activating, setActivating] = useState<string | null>(null)

  useEffect(() => { if (!authLoading && !user) router.push('/login') }, [authLoading, user, router])

  if (authLoading || !user) return <div>Loading...</div>

  return (
    <Layout title="eSIM et Data">
      <div className="page">
        <h1>eSIM et data</h1>
        <p className="subtitle">• Achat et activation de forfaits data locaux • Connexion sécurisée en voyage sans frais de roaming • Gestion des profils eSIM depuis l’application</p>

        {typeof esimConfigured === 'boolean' && !esimConfigured && (
          <div className="warning">
            eSIM n'est pas configuré. Ajoutez ESIM_PROVIDER et ESIM_API_KEY dans le backend pour activer ce service. Comme pour Mailchimp et autres intégrations, l'interface reste accessible mais les appels sont désactivés.
          </div>
        )}
        {error && (<div className="error">{error}</div>)}

        <div className="controls">
          <label>Country (ISO2):</label>
          <input className="input" value={country} onChange={(e) => setCountry(e.target.value.toUpperCase())} maxLength={2} />
          <button className="btn" onClick={() => fetchPlans(country)} disabled={loading}>Charger les forfaits</button>
        </div>

        <div className="grid">
          <div className="card">
            <h3>Forfaits disponibles</h3>
            {plans.length === 0 ? (
              <p className="muted">Aucun forfait chargé. Choisissez un pays puis cliquez sur "Charger les forfaits".</p>
            ) : (
              <ul className="list">
                {plans.map(p => (
                  <li key={p.id}>
                    <div className="row">
                      <div>
                        <div className="name">{p.name}</div>
                        <div className="muted">{p.dataGB} GB • {p.validityDays} jours</div>
                      </div>
                      <div className="row" style={{ gap: 12 }}>
                        <strong>${p.priceUSD.toFixed(2)}</strong>
                        <button className="btn" disabled={!!purchasing || !esimConfigured} onClick={async () => {
                          try { setPurchasing(p.id); await purchasePlan(p.id) } finally { setPurchasing(null) }
                        }}>{purchasing === p.id ? 'Achat...' : 'Acheter'}</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="card">
            <h3>Mes profils eSIM</h3>
            {profiles.length === 0 ? (
              <p className="muted">Aucun profil. Après l'achat, un profil sera listé ici avec un code d'activation (LPA:1$...).</p>
            ) : (
              <ul className="list">
                {profiles.map(pr => (
                  <li key={pr.id}>
                    <div className="row">
                      <div>
                        <div className="name">{pr.name}</div>
                        <div className="muted">Statut: {pr.status}</div>
                        {pr.activationCode && <div className="mono">{pr.activationCode}</div>}
                      </div>
                      <div className="row" style={{ gap: 12 }}>
                        <button className="link" disabled={!!activating || !esimConfigured} onClick={async () => { try { setActivating(pr.id); await activateProfile(pr.id) } finally { setActivating(null) } }}>{activating === pr.id ? 'Activation...' : 'Activer'}</button>
                        <button className="link danger" disabled={!esimConfigured} onClick={() => deleteProfile(pr.id)}>Supprimer</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

      </div>

      <style jsx>{`
        .page { max-width: 1200px; margin: 0 auto; }
        h1 { font-size: 32px; color: #1e293b; margin: 8px 0; }
        .subtitle { color: #64748b; margin-bottom: 12px; }
        .warning { background: #fff7ed; color: #9a3412; padding: 12px 16px; border-radius: 8px; margin-bottom: 12px; }
        .error { background: #fee2e2; color: #b91c1c; padding: 12px 16px; border-radius: 8px; margin-bottom: 12px; }
        .controls { display: flex; gap: 8px; align-items: center; margin-bottom: 16px; }
        .input { padding: 8px 10px; border: 1px solid #cbd5e1; border-radius: 6px; width: 70px; text-transform: uppercase; }
        .btn { background: #0891B2; color: #fff; border: none; padding: 10px 16px; border-radius: 6px; cursor: pointer; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .card { background: #fff; border-radius: 10px; padding: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .list { list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; }
        .row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
        .name { font-weight: 600; color: #0f172a; }
        .muted { color: #64748b; }
        .mono { font-family: monospace; color: #0f172a; }
        .link { background: transparent; border: none; color: #2563eb; cursor: pointer; padding: 0; }
        .link.danger { color: #ef4444; }
        @media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }
      `}</style>
    </Layout>
  )
}
