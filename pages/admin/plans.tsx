import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, Edit, Copy, Archive, MoreHorizontal, Plus } from "lucide-react";

// 1. TYPE DEFINITION
type Plan = {
  id: string;
  name: string;
  price: string;
  cadence: "Monthly" | "Annual";
  conversion: string;
  features: string[];
  seatsIncluded?: string;
  usageLimits?: string;
  active: boolean;
};

// 2. MOCK DATA
const initialPlans: Plan[] = [
  {
    id: "plan-free",
    name: "Starter",
    price: "$0",
    cadence: "Monthly",
    conversion: "Top of funnel, high activation",
    features: ["Inbox monitoring", "Firewall filtering", "7-day retention"],
    seatsIncluded: "1 seat",
    usageLimits: "50 emails / mo",
    active: true,
  },
  {
    id: "plan-pro",
    name: "Pro",
    price: "$18",
    cadence: "Monthly",
    conversion: "Core revenue driver (38% attach)",
    features: ["Ephemeral aliases", "Secure notes", "Encrypted file vault (10 GB)", "SMS bridge", "Priority support"],
    seatsIncluded: "1 seat",
    usageLimits: "Unlimited emails",
    active: true,
  },
  {
    id: "plan-team",
    name: "Team",
    price: "$39",
    cadence: "Monthly",
    conversion: "Collaborative workspaces",
    features: ["Shared inboxes", "DLP policies", "SAML SSO", "Audit trails", "Dedicated CS manager"],
    seatsIncluded: "Up to 10 seats",
    usageLimits: "Unlimited emails",
    active: true,
  },
  {
    id: "plan-enterprise",
    name: "Enterprise",
    price: "Custom",
    cadence: "Annual",
    conversion: "Strategic accounts",
    features: ["Private regions", "Unlimited retention", "Advanced security packs", "SOC 2 + HIPAA", "24/7 desk"],
    seatsIncluded: "Unlimited seats",
    usageLimits: "Custom agreements",
    active: false,
  },
];

// 3. CHILD COMPONENTS

type PlanHeaderProps = {
  onCreatePlan: () => void;
};

function PlanHeader({ onCreatePlan }: PlanHeaderProps) {
  return (
    <CardHeader className="border-b border-neutral-200/60 bg-neutral-50/40 px-6 py-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-base font-semibold tracking-tight text-neutral-900">
            Plan Catalog
          </CardTitle>
          <CardDescription className="mt-1 text-[13px] text-neutral-500">
            Manage all available subscription plans and their features.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={onCreatePlan}
            className="h-8 rounded-md bg-neutral-900 px-3 text-[13px] font-medium text-white shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-all hover:bg-neutral-800"
          >
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Create Plan
          </Button>
        </div>
      </div>
    </CardHeader>
  );
}

type PlanRowProps = {
  plan: Plan;
  onToggleActive: (id: string) => void;
};

function PlanRow({ plan, onToggleActive }: PlanRowProps) {
  return (
    <TableRow className="group align-top transition-all duration-150 hover:bg-neutral-50/50">
      <TableCell className="py-5">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-semibold text-neutral-900">{plan.name}</span>
            {plan.name === "Pro" && (
              <Badge className="rounded-md bg-gradient-to-r from-blue-50 to-blue-100 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700 shadow-sm ring-1 ring-blue-200/50">
                Popular
              </Badge>
            )}
          </div>
          <span className="text-[12px] leading-relaxed text-neutral-500">{plan.conversion}</span>
        </div>
      </TableCell>
      <TableCell className="py-5">
        <div className="flex flex-col gap-1">
          <span className="text-[15px] font-bold tabular-nums text-neutral-900">{plan.price}</span>
          <span className="text-[11px] font-medium uppercase tracking-wide text-neutral-500">
            {plan.cadence}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <div className="space-y-2">
          {plan.features.slice(0, 3).map((feature) => (
            <div
              key={feature}
              className="group flex items-start gap-2.5 rounded-md px-2 py-1.5 transition-all hover:bg-neutral-50/80"
            >
              <div className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-200/50 transition-all group-hover:bg-emerald-100 group-hover:ring-emerald-300/50">
                <Check className="h-2.5 w-2.5 text-emerald-600" />
              </div>
              <span className="text-[12px] leading-relaxed text-neutral-700 group-hover:text-neutral-900">
                {feature}
              </span>
            </div>
          ))}
          {plan.features.length > 3 && (
            <button className="ml-6 mt-1 flex items-center gap-1 text-[11px] font-medium text-neutral-500 transition-colors hover:text-neutral-900">
              <span>+{plan.features.length - 3} more features</span>
              <svg
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>
      </TableCell>
      <TableCell className="py-5">
        <div className="flex items-center gap-3">
          <Switch
            id={`status-${plan.id}`}
            checked={plan.active}
            onCheckedChange={() => onToggleActive(plan.id)}
            aria-label={`Toggle ${plan.name} plan`}
          />
          <Badge
            variant={plan.active ? "default" : "outline"}
            className={`rounded-md px-2.5 py-1 text-[11px] font-medium shadow-sm ${
              plan.active
                ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/50"
                : "bg-neutral-50 text-neutral-600 ring-1 ring-neutral-200/50"
            }`}
          >
            {plan.active ? "● Active" : "Inactive"}
          </Badge>
        </div>
      </TableCell>
      <TableCell className="py-5 text-right">
        <div className="flex items-center justify-end gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-md border-neutral-200/60 bg-white shadow-sm transition-all hover:border-neutral-300 hover:bg-neutral-50"
          >
            <Edit className="h-3.5 w-3.5 text-neutral-600" />
            <span className="sr-only">Edit Plan</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-md text-neutral-400 transition-all hover:bg-neutral-100 hover:text-neutral-900"
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="cursor-pointer">
                <Copy className="mr-2 h-4 w-4" />
                <span>Duplicate Plan</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                <Archive className="mr-2 h-4 w-4" />
                <span>Archive Plan</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  );
}

type PlanTableProps = {
  plans: Plan[];
  onToggleActive: (id: string) => void;
};

function PlanTable({ plans, onToggleActive }: PlanTableProps) {
  return (
    <CardContent className="p-0">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-neutral-200/60 bg-neutral-50/40 hover:bg-neutral-50/40">
              <TableHead className="w-[20%] py-3.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                Plan
              </TableHead>
              <TableHead className="w-[15%] py-3.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                Price
              </TableHead>
              <TableHead className="w-[30%] py-3.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                Features
              </TableHead>
              <TableHead className="w-[15%] py-3.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                Status
              </TableHead>
              <TableHead className="w-[20%] py-3.5 text-right text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-neutral-200/60">
            {plans.map((plan) => (
              <PlanRow key={plan.id} plan={plan} onToggleActive={onToggleActive} />
            ))}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  );
}

// 4. MAIN PAGE COMPONENT
export default function AdminPlansPage() {
  const [planCatalog, setPlanCatalog] = useState<Plan[]>(initialPlans);

  const togglePlanActive = (id: string) => {
    setPlanCatalog((prev) => prev.map((plan) => (plan.id === id ? { ...plan, active: !plan.active } : plan)));
  };

  const handleCreatePlan = () => {
    console.log("Navigate to create plan page or open modal");
  };

  return (
    <AdminLayout
      title="Subscription Plans"
      description="Manage your product catalog, toggle plan visibility, and configure pricing tiers."
    >
      <Card className="overflow-hidden border border-neutral-200/60 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.04)]">
        <PlanHeader onCreatePlan={handleCreatePlan} />
        <PlanTable plans={planCatalog} onToggleActive={togglePlanActive} />
      </Card>
    </AdminLayout>
  );
}
