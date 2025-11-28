"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/AuthContext"
import {
  CircleDollarSign,
  LineChart,
  MenuSquare,
  Users,
  Sparkles,
  Bell,
  Search,
  LogOut,
  FileDown,
  Plus,
} from "lucide-react"

type AdminLayoutProps = {
  title: string
  description?: string
  children: ReactNode
}

const NAV_LINKS = [
  { href: "/admin", label: "Overview", icon: LineChart },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/subscriptions", label: "Subscriptions", icon: CircleDollarSign },
  { href: "/admin/plans", label: "Plans", icon: MenuSquare },
]

export function AdminLayout({ title, description, children }: AdminLayoutProps) {
  const router = useRouter()
  const { user, loading, signOut } = useAuth()
  const [collapsed, setCollapsed] = useState(true)
  const [isAuthorizing, setIsAuthorizing] = useState(true)
  const sidebarWidth = useMemo(() => (collapsed ? 80 : 280), [collapsed])
  const layoutVars = useMemo(
    () => ({ "--sidebar-width": `${sidebarWidth}px` }) as CSSProperties,
    [sidebarWidth]
  )

  useEffect(() => {
    if (loading) {
      return
    }

    const nextPath = router.asPath

    if (!user) {
      setIsAuthorizing(true)
      router.replace(`/login?next=${encodeURIComponent(nextPath)}`)
      return
    }

    if (!user.roles?.includes("admin")) {
      setIsAuthorizing(true)
      router.replace("/dashboard")
      return
    }

    setIsAuthorizing(false)
  }, [loading, user, router])

  const handleSignOut = async () => {
    await signOut()
    router.replace("/login")
  }

  if (loading || isAuthorizing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] text-[#171717]">
        <div className="text-sm text-[#737373]">Checking admin access…</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#171717] lg:flex" style={layoutVars}>
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 hidden flex-col border-r border-[#E5E5E5] bg-white pb-6 pt-6 transition-all duration-300 ease-out lg:flex",
          collapsed ? "px-3" : "px-4"
        )}
        style={{ width: sidebarWidth }}
        onMouseEnter={() => setCollapsed(false)}
        onMouseLeave={() => setCollapsed(true)}
      >
        <div className="flex flex-1 flex-col gap-6">
          {/* Logo Section */}
          <div className="flex items-center px-2">
            <div className="flex items-center gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg shadow-sm">
                <Image
                  src="/images/coco.gif"
                  alt="Cocoinbox Logo"
                  width={32}
                  height={32}
                  className="h-12 w-12 object-cover"
                  unoptimized
                />
              </div>

              {!collapsed && (
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-[#171717]">Cocoinbox</span>
                  <span className="text-[10px] text-[#737373]">Admin Studio</span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col gap-1 px-2">
            {NAV_LINKS.map((item) => {
              const isActive = router.pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-[#171717] text-white shadow-sm"
                      : "text-[#737373] hover:bg-[#FAFAFA] hover:text-[#171717]"
                  )}
                >
                  <Icon className={cn(
                    "h-4 w-4 flex-shrink-0 transition-transform duration-200",
                    isActive && "scale-110"
                  )} />

                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.label}</span>
                      {isActive && (
                        <div className="h-1.5 w-1.5 rounded-full bg-[#00FF88] shadow-[0_0_8px_rgba(0,255,136,0.5)]" />
                      )}
                    </>
                  )}

                  {isActive && (
                    <div className="absolute -right-3 h-8 w-0.5 rounded-full bg-[#171717]" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Bottom Actions */}
          {!collapsed && (
            <div className="space-y-2 px-2">
              <button className="flex w-full items-center gap-3 rounded-lg border border-[#E5E5E5] bg-white px-3 py-2.5 text-sm font-medium text-[#737373] transition-all hover:border-[#D4D4D4] hover:bg-[#FAFAFA] hover:text-[#171717]">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
                <Badge className="ml-auto rounded-full bg-[#FF0080] px-1.5 py-0 text-[10px] font-semibold text-white">
                  3
                </Badge>
              </button>

              <button className="flex w-full items-center gap-3 rounded-lg border border-[#E5E5E5] bg-white px-3 py-2.5 text-sm font-medium text-[#737373] transition-all hover:border-[#D4D4D4] hover:bg-[#FAFAFA] hover:text-[#171717]">
                <Search className="h-4 w-4" />
                <span>Quick Search</span>
                <kbd className="ml-auto rounded border border-[#E5E5E5] bg-[#FAFAFA] px-1.5 py-0.5 text-[10px] font-semibold text-[#737373]">
                  ⌘K
                </kbd>
              </button>

              <div className="h-px bg-[#E5E5E5]" />

              <button
                onClick={handleSignOut}
                className="flex w-full items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-medium text-red-600 transition-all hover:border-red-300 hover:bg-red-100 hover:text-red-700"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          )}

          {collapsed && (
            <div className="flex flex-col gap-2 px-2">
              <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E5E5] bg-white text-[#737373] transition-all hover:border-[#D4D4D4] hover:bg-[#FAFAFA] hover:text-[#171717]">
                <Bell className="h-4 w-4" />
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E5E5] bg-white text-[#737373] transition-all hover:border-[#D4D4D4] hover:bg-[#FAFAFA] hover:text-[#171717]">
                <Search className="h-4 w-4" />
              </button>

              <div className="h-px bg-[#E5E5E5]" />

              <button
                onClick={handleSignOut}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 transition-all hover:border-red-300 hover:bg-red-100 hover:text-red-700"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex min-h-screen flex-1 flex-col transition-[margin] duration-300 lg:ml-[var(--sidebar-width)]">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b border-slate-200/70 bg-slate-50/70 px-6 py-4 backdrop-blur-xl">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">{title}</h1>
              <p className="hidden text-sm text-slate-500 sm:block">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="h-9 gap-1.5 rounded-md border-slate-300/70 bg-white text-slate-700 shadow-sm hover:bg-slate-100"
              >
                <FileDown className="h-4 w-4" />
                Export
              </Button>
              <Button size="sm" className="h-9 gap-1.5 rounded-md shadow-sm">
                <Plus className="h-4 w-4" />
                Create Report
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 bg-[#FAFAFA] px-6 py-8 lg:px-8 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  )
}