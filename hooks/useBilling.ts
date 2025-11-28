import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export function useBilling() {
  const { token } = useAuth()
  const [stripeConfigured, setStripeConfigured] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)

  const headers = token ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } : { 'Content-Type': 'application/json' }

  const fetchConfig = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/config/public`)
      const data = res.ok ? await res.json() : {}
      setStripeConfigured(!!data.stripeConfigured)
    } catch {
      setStripeConfigured(null)
    }
  }

  useEffect(() => { fetchConfig() }, [token])

  const createCheckout = async () => {
    const res = await fetch(`${API_BASE_URL}/api/billing/checkout`, { method: 'POST', headers })
    if (!res.ok) {
      const d = await res.json().catch(() => ({}))
      throw new Error(d.error || 'Checkout failed')
    }
    return res.json()
  }

  const openPortal = async () => {
    const res = await fetch(`${API_BASE_URL}/api/billing/portal`, { method: 'POST', headers })
    if (!res.ok) {
      const d = await res.json().catch(() => ({}))
      throw new Error(d.error || 'Portal failed')
    }
    return res.json()
  }

  return { stripeConfigured, error, createCheckout, openPortal }
}
