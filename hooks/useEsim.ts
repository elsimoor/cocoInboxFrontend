import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export type EsimPlan = { id: string; name: string; dataGB: number; validityDays: number; priceUSD: number }
export type EsimProfile = { id: string; name: string; status: string; activationCode?: string }

export function useEsim() {
  const { token } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [esimConfigured, setEsimConfigured] = useState<boolean | null>(null)
  const [plans, setPlans] = useState<EsimPlan[]>([])
  const [profiles, setProfiles] = useState<EsimProfile[]>([])

  const baseHeaders: Record<string, string> = { 'Content-Type': 'application/json' }
  const authHeaders = token ? { ...baseHeaders, Authorization: `Bearer ${token}` } : baseHeaders

  const fetchConfig = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/config/public`)
      const data = res.ok ? await res.json() : {}
      setEsimConfigured(!!data.esimConfigured)
    } catch {
      setEsimConfigured(null)
    }
  }

  const fetchPlans = async (country?: string) => {
    try {
      const url = new URL(`${API_BASE_URL}/api/esim/plans`)
      if (country) url.searchParams.set('country', country)
      const res = await fetch(url.toString())
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error(d.error || 'Failed to load plans')
      }
      const data = await res.json()
      setPlans(data.plans || [])
    } catch (e: any) {
      setError(e.message)
    }
  }

  const fetchProfiles = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/esim/profiles`, { headers: authHeaders })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error(d.error || 'Failed to load profiles')
      }
      const data = await res.json()
      setProfiles(data.profiles || [])
    } catch (e: any) {
      setError(e.message)
    }
  }

  const purchasePlan = async (planId: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/esim/purchase`, { method: 'POST', headers: authHeaders, body: JSON.stringify({ planId }) })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error(d.error || 'Failed to purchase plan')
      }
      await fetchProfiles()
      return await res.json()
    } catch (e: any) {
      setError(e.message)
      throw e
    }
  }

  const activateProfile = async (profileId: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/esim/activate`, { method: 'POST', headers: authHeaders, body: JSON.stringify({ profileId }) })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error(d.error || 'Failed to activate profile')
      }
      await fetchProfiles()
      return await res.json()
    } catch (e: any) {
      setError(e.message)
      throw e
    }
  }

  const deleteProfile = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/esim/profiles/${id}`, { method: 'DELETE', headers: authHeaders })
      if (!res.ok) throw new Error('Failed to delete profile')
      await fetchProfiles()
    } catch (e: any) {
      setError(e.message)
    }
  }

  const refetch = async () => {
    setLoading(true)
    await Promise.all([fetchConfig(), fetchPlans(), token ? fetchProfiles() : Promise.resolve()])
    setLoading(false)
  }

  useEffect(() => { refetch() }, [token])

  return { loading, error, esimConfigured, plans, profiles, fetchPlans, fetchProfiles, purchasePlan, activateProfile, deleteProfile }
}
