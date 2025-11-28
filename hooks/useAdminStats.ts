import { useCallback, useEffect, useState } from "react"

import { useAuth } from "@/contexts/AuthContext"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

export type AdminStatsResponse = {
  users: {
    total: number
    pro: number
    admin: number
    free: number
  }
  content: {
    emails: number
    activeEmails: number
    notes: number
    files: number
  }
  recentUsers: Array<{
    id: string
    email: string
    name?: string | null
    created_at: string
  }>
}

export function useAdminStats() {
  const { token } = useAuth()
  const [stats, setStats] = useState<AdminStatsResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = useCallback(async () => {
    if (!token) {
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) {
        const payload = await res.json().catch(() => ({}))
        throw new Error(payload.error || "Unable to fetch admin stats")
      }
      const payload = (await res.json()) as AdminStatsResponse
      setStats(payload)
    } catch (err: any) {
      setError(err.message || "Unable to fetch admin stats")
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    if (token) {
      fetchStats().catch(() => null)
    }
  }, [fetchStats, token])

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  }
}

