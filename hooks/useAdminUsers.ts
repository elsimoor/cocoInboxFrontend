import { useCallback, useEffect, useMemo, useState } from "react"

import { useAuth } from "@/contexts/AuthContext"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

export type AdminUserWithUsage = {
  id: string
  email: string
  name?: string | null
  roles: string[]
  is_pro: boolean
  created_at: string
  emailCount?: number
  noteCount?: number
  fileCount?: number
}

type SortKey = "email" | "created_at" | "roles" | "is_pro"
type SortDirection = "asc" | "desc"

export function useAdminUsers() {
  const { token } = useAuth()
  const [users, setUsers] = useState<AdminUserWithUsage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sortKey, setSortKey] = useState<SortKey>("created_at")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null)
  const [updatingProId, setUpdatingProId] = useState<string | null>(null)

  const toggleSort = useCallback((key: SortKey) => {
    setSortKey((prevKey) => {
      if (prevKey !== key) {
        setSortDirection("asc")
        return key
      }
      setSortDirection((prevDir) => (prevDir === "asc" ? "desc" : "asc"))
      return key
    })
  }, [])

  const fetchUsers = useCallback(async () => {
    if (!token) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}))
        throw new Error(payload.error || "Unable to fetch users")
      }

      const payload = (await res.json()) as AdminUserWithUsage[]
      setUsers(payload)
    } catch (err: any) {
      setError(err.message || "Unable to fetch users")
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    if (token) {
      fetchUsers().catch(() => null)
    }
  }, [fetchUsers, token])

  const sortedUsers = useMemo(() => {
    const copy = [...users]
    copy.sort((a, b) => {
      switch (sortKey) {
        case "email":
          return sortDirection === "asc"
            ? a.email.localeCompare(b.email)
            : b.email.localeCompare(a.email)
        case "roles":
          return sortDirection === "asc"
            ? a.roles.length - b.roles.length
            : b.roles.length - a.roles.length
        case "is_pro":
          return sortDirection === "asc"
            ? Number(a.is_pro) - Number(b.is_pro)
            : Number(b.is_pro) - Number(a.is_pro)
        case "created_at":
        default: {
          const aDate = new Date(a.created_at).getTime()
          const bDate = new Date(b.created_at).getTime()
          return sortDirection === "asc" ? aDate - bDate : bDate - aDate
        }
      }
    })
    return copy
  }, [users, sortKey, sortDirection])

  return {
    users: sortedUsers,
    loading,
    error,
    sortKey,
    sortDirection,
    setSortKey,
    setSortDirection,
    toggleSort,
    refetch: fetchUsers,
    updatingUserId,
    updatingProId,
    updateUserRoles: useCallback(
      async (userId: string, roles: string[]) => {
        if (!token) {
          return { error: "You must be signed in" }
        }

        setUpdatingUserId(userId)
        setError(null)
        try {
          const res = await fetch(`${API_BASE_URL}/api/admin/users/${userId}/roles`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ roles }),
          })

          if (!res.ok) {
            const payload = await res.json().catch(() => ({}))
            const message = payload.error || "Failed to update roles"
            setError(message)
            return { error: message }
          }

          const updatedUser = (await res.json()) as AdminUserWithUsage
          setUsers((prev) =>
            prev.map((user) =>
              user.id === userId ? { ...user, ...updatedUser, roles: updatedUser.roles } : user
            )
          )
          return { error: null }
        } catch (err: any) {
          const message = err.message || "Failed to update roles"
          setError(message)
          return { error: message }
        } finally {
          setUpdatingUserId(null)
        }
      },
      [token]
    ),
    toggleProStatus: useCallback(
      async (userId: string, isPro: boolean) => {
        if (!token) {
          return { error: "You must be signed in" }
        }

        setUpdatingProId(userId)
        setError(null)
        try {
          const res = await fetch(`${API_BASE_URL}/api/admin/users/${userId}/pro-status`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ is_pro: isPro }),
          })

          if (!res.ok) {
            const payload = await res.json().catch(() => ({}))
            const message = payload.error || "Failed to update Pro status"
            setError(message)
            return { error: message }
          }

          const updatedUser = (await res.json()) as AdminUserWithUsage
          setUsers((prev) =>
            prev.map((user) =>
              user.id === userId ? { ...user, ...updatedUser, is_pro: updatedUser.is_pro, roles: updatedUser.roles } : user
            )
          )
          return { error: null }
        } catch (err: any) {
          const message = err.message || "Failed to update Pro status"
          setError(message)
          return { error: message }
        } finally {
          setUpdatingProId(null)
        }
      },
      [token]
    ),
  }
}

