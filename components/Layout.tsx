"use client"

import type React from "react"
import { useState } from "react"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import { useAuth } from "@/contexts/AuthContext"

type Props = {
  children: React.ReactNode
  title?: string
}

export default function AppLayout({ children, title }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useAuth()
  const showBillingBar = (() => {
    if (!user || !(user as any).is_pro) return false
    const status = (user as any).subscriptionStatus as string | undefined
    const grace = (user as any).proGraceUntil ? new Date((user as any).proGraceUntil as any) : null
    const periodEnd = (user as any).subscriptionCurrentPeriodEnd ? new Date((user as any).subscriptionCurrentPeriodEnd as any) : null
    const now = new Date()
    const statusNeedsPay = status && ['past_due','unpaid','incomplete','incomplete_expired','canceled'].includes(status as any)
    const periodPassed = periodEnd ? periodEnd.getTime() <= now.getTime() : false
    const inGrace = grace ? grace.getTime() > now.getTime() : false
    return statusNeedsPay || (periodPassed && inGrace) || (!!grace && inGrace)
  })()

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - fixed on the left and starts from top */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        {/* Navbar starts from the right of the sidebar */}
        <Navbar
          title={title || "Cocoinbox"}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />

        {showBillingBar && (
          <div className="w-full bg-yellow-50 border-b border-yellow-200 text-yellow-800 text-sm px-4 py-2">
            Your subscription needs attention. Please update payment method. You may be downgraded after the grace period.
          </div>
        )}

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-muted/30">
          {children}
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
