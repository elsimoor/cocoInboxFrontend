import { useEffect, useMemo, useState } from "react"

import { AdminLayout } from "@/components/admin/AdminLayout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAdminUsers } from "@/hooks/useAdminUsers"
import { formatDistanceToNow } from "date-fns"
import {
  Activity,
  Armchair,
  ArrowUp,
  Download,
  Filter,
  Loader2,
  Mail,
  RefreshCcw,
  Search,
  ShieldCheck,
  Users as UsersIcon,
} from "lucide-react"

const ROLE_OPTIONS = [
  {
    value: "user",
    label: "User",
    description: "Standard access to personal workspace areas.",
  },
  {
    value: "pro",
    label: "Pro",
    description: "Unlocks premium features like secure files and SMS.",
  },
  {
    value: "admin",
    label: "Admin",
    description: "Full administrative access to Cocoinbox Studio.",
  },
] as const

export default function AdminUsersPage() {
  const {
    users,
    loading,
    error,
    refetch,
    updateUserRoles,
    toggleProStatus,
    updatingUserId,
    updatingProId,
  } = useAdminUsers()
  const [rolesDialogOpen, setRolesDialogOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  const [rolesError, setRolesError] = useState<string | null>(null)
  const [rolesSaving, setRolesSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const selectedUser = useMemo(
    () => users.find((user) => user.id === selectedUserId) || null,
    [users, selectedUserId]
  )

  useEffect(() => {
    if (!selectedUser) return
    setSelectedRoles(selectedUser.roles.length ? [...selectedUser.roles] : ["user"])
  }, [selectedUser])

  useEffect(() => {
    if (!rolesDialogOpen) {
      setSelectedUserId(null)
      setSelectedRoles([])
      setRolesError(null)
      setRolesSaving(false)
      setShowSuccess(false)
    }
  }, [rolesDialogOpen])

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(users.length / pageSize))
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [users, currentPage, pageSize])

  const totalUsers = users.length
  const proUsers = users.filter((user) => user.is_pro).length
  const adminUsers = users.filter((user) => user.roles.includes("admin")).length
  const pendingInvites = users.filter((user) => user.roles.length === 0).length

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return users.slice(startIndex, startIndex + pageSize)
  }, [users, currentPage, pageSize])

  const totalPages = Math.max(1, Math.ceil(users.length / pageSize))
  const showingStart = users.length === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const showingEnd = Math.min(currentPage * pageSize, users.length)

  const handleOpenRoleManager = (userId: string) => {
    setSelectedUserId(userId)
    setRolesDialogOpen(true)
  }

  const toggleRole = (role: string, checked: boolean) => {
    setShowSuccess(false)
    setRolesError(null)
    setSelectedRoles((prev) => {
      if (checked) {
        return prev.includes(role) ? prev : [...prev, role]
      }
      return prev.filter((item) => item !== role)
    })
  }

  const handleSaveRoles = async () => {
    if (!selectedUserId || !selectedUser) return

    if (selectedRoles.length === 0) {
      setRolesError("Assign at least one role before saving.")
      return
    }

    setRolesSaving(true)
    const result = await updateUserRoles(selectedUserId, selectedRoles)
    setRolesSaving(false)

    if (result.error) {
      setRolesError(result.error)
      setShowSuccess(false)
      return
    }

    setShowSuccess(true)
    setTimeout(() => {
      setRolesDialogOpen(false)
    }, 600)
  }

  const isSaving = rolesSaving || updatingUserId === selectedUserId

  return (
    <AdminLayout
      title="Workspace Users"
      description="Manage user permissions, seat usage, and access status"
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="group relative overflow-hidden border border-neutral-200/60 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-200 hover:border-neutral-300/80 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_8px_16px_rgba(0,0,0,0.06)]">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-blue-100/50 text-blue-600 ring-1 ring-blue-200/50 transition-transform group-hover:scale-110">
                      <UsersIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-500">
                        Total Users
                      </p>
                      <p className="text-[12px] text-neutral-400">Registered accounts</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-end justify-between">
                    <p className="text-3xl font-bold tracking-tight text-neutral-900 tabular-nums">
                      {loading ? "…" : totalUsers}
                    </p>
                    <Badge className="flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700 shadow-sm ring-1 ring-emerald-200/50">
                      <ArrowUp className="h-3 w-3" />
                      —
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border border-neutral-200/60 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-200 hover:border-neutral-300/80 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_8px_16px_rgba(0,0,0,0.06)]">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-50 to-emerald-100/50 text-emerald-600 ring-1 ring-emerald-200/50 transition-transform group-hover:scale-110">
                      <Activity className="h-5 w-5" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-8 w-8 rounded-lg bg-emerald-400/20 animate-ping" />
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-500">
                        Pro Accounts
                      </p>
                      <p className="text-[12px] text-neutral-400">Users with Pro subscription</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-3xl font-bold tracking-tight text-neutral-900 tabular-nums">
                      {loading ? "…" : proUsers}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border border-neutral-200/60 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-200 hover:border-neutral-300/80 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_8px_16px_rgba(0,0,0,0.06)]">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-50 to-purple-100/50 text-purple-600 ring-1 ring-purple-200/50 transition-transform group-hover:scale-110">
                      <Armchair className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-500">
                        Admin Seats
                      </p>
                      <p className="text-[12px] text-neutral-400">Owners and administrators</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-3xl font-bold tracking-tight text-neutral-900 tabular-nums">
                      {loading ? "…" : adminUsers}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border border-neutral-200/60 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-200 hover:border-neutral-300/80 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_8px_16px_rgba(0,0,0,0.06)]">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-50 to-amber-100/50 text-amber-600 ring-1 ring-amber-200/50 transition-transform group-hover:scale-110">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-500">
                        Pending Invites
                      </p>
                      <p className="text-[12px] text-amber-600">Users awaiting activation</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-3xl font-bold tracking-tight text-neutral-900 tabular-nums">
                      {loading ? "…" : pendingInvites}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="group relative overflow-hidden border border-neutral-200/60 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.04)]">
          <CardHeader className="border-b border-neutral-200/60 bg-neutral-50/40 px-6 py-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-base font-semibold tracking-tight text-neutral-900">
                  User Directory
                </CardTitle>
                <CardDescription className="mt-1 text-[13px] text-neutral-500">
                  Manage all workspace members and their permissions
                </CardDescription>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 rounded-md border-neutral-200/60 bg-white px-3 text-[13px] font-medium text-neutral-600 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900"
                >
                  <Filter className="mr-1.5 h-3.5 w-3.5" />
                  Filter
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 rounded-md border-neutral-200/60 bg-white px-3 text-[13px] font-medium text-neutral-600 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900"
                >
                  <Download className="mr-1.5 h-3.5 w-3.5" />
                  Export
                </Button>

                <Button
                  onClick={() => refetch()}
                  size="sm"
                  variant="outline"
                  className="h-8 rounded-md px-3 text-[13px] font-medium text-neutral-600 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900"
                >
                  <RefreshCcw className={`mr-1.5 h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </div>
            </div>

            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input
                type="search"
                placeholder="Search users by name or email..."
                className="h-9 w-full rounded-md border-neutral-200/60 bg-white pl-9 text-[13px] text-neutral-900 placeholder:text-neutral-400 shadow-[0_1px_2px_rgba(0,0,0,0.04)] focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-200/50"
                disabled
              />
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-neutral-200/60">
                  <tr className="bg-neutral-50/40">
                    <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                      User
                    </th>
                    <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                      Plan
                    </th>
                    <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                      Usage
                    </th>
                    <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                      Roles
                    </th>
                    <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                      Joined
                    </th>
                    <th className="px-6 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-neutral-200/60">
                  {loading && (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-sm text-neutral-500">
                        Loading users…
                      </td>
                    </tr>
                  )}
                  {!loading && error && (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-sm text-red-500">
                        {error}
                      </td>
                    </tr>
                  )}
                  {!loading && !error && users.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-sm text-neutral-500">
                        No users found.
                      </td>
                    </tr>
                  )}
                  {!loading &&
                    !error &&
                paginatedUsers.map((user) => {
                      const totalContent = (user.emailCount || 0) + (user.noteCount || 0) + (user.fileCount || 0)
                      const usagePercent = Math.min(100, totalContent * 10)
                      const plan = user.is_pro ? "Pro" : "Free"
                      const joined = formatDistanceToNow(new Date(user.created_at), { addSuffix: true })

                      return (
                    <tr
                      key={user.id}
                      className="group transition-all duration-150 hover:bg-neutral-50/50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 text-xs font-semibold text-white ring-1 ring-neutral-200/50 shadow-sm">
                                {(user.name || user.email)
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .slice(0, 2)
                                  .toUpperCase()}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[13px] font-semibold text-neutral-900">
                                  {user.name || "—"}
                            </span>
                            <span className="text-[12px] text-neutral-500">
                                  {user.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                            <Button
                              type="button"
                              variant={user.is_pro ? "default" : "outline"}
                              size="sm"
                              className={`rounded-md px-3 text-[11px] font-semibold ${
                                user.is_pro
                                  ? "bg-emerald-500 text-white hover:bg-emerald-600"
                                  : "border-neutral-300 text-neutral-700 hover:bg-neutral-100"
                              }`}
                              onClick={() => toggleProStatus(user.id, !user.is_pro)}
                              disabled={updatingProId === user.id}
                            >
                              {updatingProId === user.id ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : user.is_pro ? (
                                "Pro Active"
                              ) : (
                                "Upgrade to Pro"
                              )}
                            </Button>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="h-2 w-20 overflow-hidden rounded-full bg-neutral-100 ring-1 ring-neutral-200/50">
                            <div
                              className={`h-full rounded-full transition-all duration-300 ${
                                    usagePercent > 80
                                      ? "bg-red-500"
                                      : usagePercent > 50
                                      ? "bg-amber-500"
                                      : "bg-emerald-500"
                              }`}
                                  style={{ width: `${usagePercent}%` }}
                            />
                          </div>
                          <span className="text-[12px] font-semibold text-neutral-600 tabular-nums">
                                {usagePercent}%
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1.5">
                              {user.roles.length === 0 && (
                                <Badge className="rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] text-neutral-500">
                                  pending
                                </Badge>
                              )}
                              {user.roles.map((role) => (
                                <Badge
                                  key={role}
                                  className="rounded-md bg-neutral-900/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white"
                                >
                                  {role}
                                </Badge>
                              ))}
                            </div>
                      </td>

                      <td className="px-6 py-4">
                            <span className="text-[12px] text-neutral-500">
                              {joined}
                            </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenRoleManager(user.id)}
                          className="h-8 rounded-md px-3 text-[12px] font-medium text-neutral-700 shadow-sm transition-all hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900"
                          disabled={isSaving && selectedUserId === user.id}
                        >
                          {updatingUserId === user.id && (
                            <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                          )}
                          Manage Roles
                        </Button>
                      </td>
                    </tr>
                  )
                    })}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t border-neutral-200/60 bg-neutral-50/40 px-6 py-4">
              <p className="text-[13px] text-neutral-600">
                Showing{" "}
                <span className="font-semibold text-neutral-900">
                  {users.length === 0 ? 0 : `${showingStart}-${showingEnd}`}
                </span>{" "}
                of <span className="font-semibold text-neutral-900">{users.length}</span> users
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 rounded-md border-neutral-200/60 bg-white px-3 text-[13px] font-medium text-neutral-600 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  disabled={currentPage === 1 || users.length === 0}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 rounded-md border-neutral-200/60 bg-white px-3 text-[13px] font-medium text-neutral-600 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                  disabled={currentPage >= totalPages || users.length === 0}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={rolesDialogOpen} onOpenChange={setRolesDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-neutral-900">
              <ShieldCheck className="h-5 w-5 text-neutral-600" />
              Update Roles
            </DialogTitle>
            <DialogDescription>
              Grant or revoke access levels. Changes apply immediately for the selected user.
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-6">
              <div className="rounded-lg border border-neutral-200/70 bg-neutral-50/70 p-4">
                <p className="text-sm font-semibold text-neutral-900">{selectedUser.name || "—"}</p>
                <p className="text-sm text-neutral-500">{selectedUser.email}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedUser.roles.map((role) => (
                    <Badge key={role} className="bg-neutral-900/80 text-[10px] uppercase tracking-wide text-white">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {ROLE_OPTIONS.map((role) => {
                  const checked = selectedRoles.includes(role.value)
                  return (
                    <label
                      key={role.value}
                      htmlFor={`role-${role.value}`}
                      className="flex cursor-pointer items-start gap-3 rounded-lg border border-neutral-200/60 bg-white p-3 transition-all hover:border-neutral-300 hover:bg-neutral-50"
                    >
                      <Checkbox
                        id={`role-${role.value}`}
                        checked={checked}
                        onCheckedChange={(value) => toggleRole(role.value, Boolean(value))}
                        disabled={isSaving}
                        className="mt-0.5"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <Label htmlFor={`role-${role.value}`} className="text-sm font-semibold text-neutral-900">
                            {role.label}
                          </Label>
                          {role.value === "admin" && (
                            <Badge className="bg-amber-100 text-[10px] uppercase tracking-wide text-amber-600">
                              elevated
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-neutral-500">{role.description}</p>
                      </div>
                    </label>
                  )
                })}
              </div>

              <p className="text-xs text-neutral-500">
                Removing the last admin from Cocoinbox Studio is blocked for safety. At least one admin must remain.
              </p>

              {rolesError && (
                <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                  {rolesError}
                </div>
              )}

              {showSuccess && (
                <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                  Roles updated successfully.
                </div>
              )}
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="ghost"
              className="text-sm text-neutral-500 hover:text-neutral-800"
              onClick={() => setRolesDialogOpen(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSaveRoles}
              disabled={isSaving || !selectedUser}
              className="gap-2"
            >
              {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}