import { AdminLayout } from "@/components/admin/AdminLayout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreHorizontal, Search, Filter, Download, TrendingUp, DollarSign, Users, Calendar } from "lucide-react"

type Subscription = {
  id: string
  customer: string
  email: string
  plan: string
  status: "active" | "trialing" | "past_due" | "canceled"
  renewal: string
  revenue: string
  mrr: string
}

const subscriptions: Subscription[] = [
  {
    id: "SUB-7421",
    customer: "Chronicle Labs",
    email: "finance@chroniclelabs.io",
    plan: "Enterprise Annual",
    status: "active",
    renewal: "Nov 30, 2026",
    revenue: "$48,900",
    mrr: "$4,075",
  },
  {
    id: "SUB-5388",
    customer: "Pixelcraft Studio",
    email: "ops@pixelcraft.studio",
    plan: "Team Monthly",
    status: "past_due",
    renewal: "Nov 10, 2025",
    revenue: "$3,560",
    mrr: "$297",
  },
  {
    id: "SUB-1115",
    customer: "Nimbus UX",
    email: "billing@nimbusux.com",
    plan: "Pro Monthly",
    status: "active",
    renewal: "Nov 25, 2025",
    revenue: "$2,960",
    mrr: "$247",
  },
  {
    id: "SUB-2288",
    customer: "Velocity Finance",
    email: "admin@velocityfinance.com",
    plan: "Enterprise Quarterly",
    status: "trialing",
    renewal: "Dec 12, 2025",
    revenue: "$7,120",
    mrr: "$593",
  },
  {
    id: "SUB-6642",
    customer: "Orbit Collective",
    email: "hello@orbitcollective.app",
    plan: "Team Monthly",
    status: "canceled",
    renewal: "Ended Sep 30, 2025",
    revenue: "$0",
    mrr: "$0",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-emerald-50 text-emerald-700 border border-emerald-200"
    case "trialing":
      return "bg-blue-50 text-blue-700 border border-blue-200"
    case "past_due":
      return "bg-amber-50 text-amber-700 border border-amber-200"
    case "canceled":
      return "bg-red-50 text-red-700 border border-red-200"
    default:
      return "bg-[#F5F5F5] text-[#737373] border border-[#E5E5E5]"
  }
}

const getPlanBadgeColor = (plan: string) => {
  if (plan.includes("Enterprise")) {
    return "bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 border border-purple-200"
  }
  if (plan.includes("Team")) {
    return "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200"
  }
  if (plan.includes("Pro")) {
    return "bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 border border-emerald-200"
  }
  return "bg-[#F5F5F5] text-[#737373] border border-[#E5E5E5]"
}

export default function AdminSubscriptionsPage() {
  return (
    <AdminLayout
      title="Subscriptions"
      description="Monitor customer lifecycles, track renewals, and optimize retention"
    >
      <div className="space-y-6">
        <div className="grid gap-3 md:grid-cols-4">
          <Card className="group relative overflow-hidden border border-neutral-200/60 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-200 hover:border-neutral-300/80 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_8px_16px_rgba(0,0,0,0.06)]">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-500">Total ARR</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900">$487K</p>
                  <p className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-emerald-600">
                    <span className="inline-flex items-center">↗</span>
                    <span>+23% from last quarter</span>
                  </p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-emerald-50 to-emerald-100/50 ring-1 ring-emerald-200/50">
                  <TrendingUp className="h-4.5 w-4.5 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border border-neutral-200/60 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-200 hover:border-neutral-300/80 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_8px_16px_rgba(0,0,0,0.06)]">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-500">Monthly MRR</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900">$40.6K</p>
                  <p className="mt-3 text-[11px] font-medium text-neutral-500">Steady growth trend</p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-blue-50 to-blue-100/50 ring-1 ring-blue-200/50">
                  <DollarSign className="h-4.5 w-4.5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border border-neutral-200/60 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-200 hover:border-neutral-300/80 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_8px_16px_rgba(0,0,0,0.06)]">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-500">Active Subs</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900">142</p>
                  <p className="mt-3 text-[11px] font-medium text-neutral-500">97% retention rate</p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-purple-50 to-purple-100/50 ring-1 ring-purple-200/50">
                  <Users className="h-4.5 w-4.5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border border-neutral-200/60 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-200 hover:border-neutral-300/80 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_8px_16px_rgba(0,0,0,0.06)]">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-500">Renewals</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900">18</p>
                  <p className="mt-3 text-[11px] font-medium text-amber-600">Due in next 30 days</p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-amber-50 to-amber-100/50 ring-1 ring-amber-200/50">
                  <Calendar className="h-4.5 w-4.5 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subscriptions Table */}
        <Card className="group relative overflow-hidden border border-neutral-200/60 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.04)]">
          <CardHeader className="border-b border-neutral-200/60 bg-neutral-50/40 px-6 py-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-base font-semibold tracking-tight text-neutral-900">
                  Subscription Ledger
                </CardTitle>
                <CardDescription className="mt-1 text-[13px] text-neutral-500">
                  Track renewals, manage past-due accounts, and analyze revenue trends
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
                  size="sm"
                  className="h-8 rounded-md bg-neutral-900 px-3 text-[13px] font-medium text-white shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-all hover:bg-neutral-800"
                >
                  Sync Billing
                </Button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search by customer name, email, or subscription ID..."
                className="h-9 w-full rounded-md border border-neutral-200/60 bg-white px-3 pl-9 text-[13px] text-neutral-900 placeholder:text-neutral-400 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-200/50"
              />
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-neutral-200/60">
                  <tr className="bg-neutral-50/40">
                    <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                      Customer
                    </th>
                    <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                      Plan
                    </th>
                    <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                      Status
                    </th>
                    <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                      Renewal Date
                    </th>
                    <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                      MRR
                    </th>
                    <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                      ARR
                    </th>
                    <th className="px-6 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-neutral-200/60">
                  {subscriptions.map((subscription) => (
                    <tr
                      key={subscription.id}
                      className="group transition-all duration-150 hover:bg-neutral-50/50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-neutral-800 to-neutral-900 text-xs font-semibold text-white ring-1 ring-neutral-200/50 shadow-sm">
                            {subscription.customer.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[13px] font-semibold text-neutral-900">
                              {subscription.customer}
                            </span>
                            <span className="text-[12px] text-neutral-500">
                              {subscription.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <Badge className={`rounded-md px-2.5 py-1 text-[11px] font-medium shadow-sm ${getPlanBadgeColor(subscription.plan)}`}>
                          {subscription.plan}
                        </Badge>
                      </td>

                      <td className="px-6 py-4">
                        <Badge className={`rounded-md px-2.5 py-1 text-[11px] font-medium capitalize shadow-sm ${getStatusColor(subscription.status)}`}>
                          {subscription.status === "active" && "● "}
                          {subscription.status.replace("_", " ")}
                        </Badge>
                      </td>

                      <td className="px-6 py-4">
                        <span className={`text-[12px] ${subscription.status === "past_due" ? "font-semibold text-amber-600" : "text-neutral-500"}`}>
                          {subscription.renewal}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-[13px] font-semibold tabular-nums text-neutral-900">
                          {subscription.mrr}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-[13px] font-bold tabular-nums text-neutral-900">
                          {subscription.revenue}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 rounded-md px-2.5 text-[12px] font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                          >
                            Timeline
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 rounded-md px-2.5 text-[12px] font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                          >
                            Manage
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 rounded-md p-0 text-neutral-400 shadow-sm hover:bg-neutral-100 hover:text-neutral-900"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary Footer */}
            <div className="flex items-center justify-between border-t border-neutral-200/60 bg-neutral-50/40 px-6 py-4">
              <div className="flex items-center gap-6">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] font-medium uppercase tracking-wide text-neutral-500">Total Subscriptions</span>
                  <span className="text-[13px] font-semibold text-neutral-900">5 active</span>
                </div>
                <div className="h-8 w-px bg-neutral-200/60" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] font-medium uppercase tracking-wide text-neutral-500">Combined ARR</span>
                  <span className="text-[13px] font-semibold tabular-nums text-neutral-900">$62,540</span>
                </div>
                <div className="h-8 w-px bg-neutral-200/60" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] font-medium uppercase tracking-wide text-neutral-500">At Risk</span>
                  <span className="text-[13px] font-semibold text-amber-600">1 past due</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 rounded-md border-neutral-200/60 bg-white px-3 text-[13px] font-medium text-neutral-600 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 rounded-md border-neutral-200/60 bg-white px-3 text-[13px] font-medium text-neutral-600 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900"
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}