"use client"

import React from "react"
import { Check, Crown, Sparkles } from "lucide-react"
import { PricingPlan } from "@/types"

const plans: PricingPlan[] = [
  {
    name: "Coco Lite",
    price: "Free",
    tagline: "Instant disposable inboxes for quick signups.",
    features: [
      "Unlimited temporary inboxes",
      "Auto-expiring messages after 24 hours",
      "Attachment previews & downloads",
      "Browser notifications"
    ],
    buttonLabel: "Start for Free"
  },
  {
    name: "Tropical Pro",
    price: "$9 / mo",
    tagline: "Best for power users who live in their sandbox inbox.",
    features: [
      "Custom domains & aliases",
      "Forwarding to your real inbox",
      "Spam shielding with AI filtering",
      "Priority refresh every 15 seconds",
      "Access to secure notes & files"
    ],
    buttonLabel: "Upgrade to Pro",
    isPopular: true,
  },
  {
    name: "Island Teams",
    price: "$29 / mo",
    tagline: "Collaborate with your crew and keep every inbox tidy.",
    features: [
      "Shared team workspaces",
      "Role-based access controls",
      "Audit logs & retention policies",
      "API access & webhooks",
      "24/7 priority support"
    ],
    buttonLabel: "Talk to Sales"
  }
]

const getCardClasses = (plan: PricingPlan) => {
  if (plan.isPopular) {
    return "border-blue-200/60 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-[0_0_0_1px_rgba(59,130,246,0.1),0_8px_24px_rgba(59,130,246,0.15)] hover:shadow-[0_0_0_1px_rgba(59,130,246,0.2),0_20px_40px_rgba(59,130,246,0.2)] hover:border-blue-300/80 scale-105 -translate-y-2"
  }
  return "border-neutral-200/60 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_8px_16px_rgba(0,0,0,0.06)] hover:border-neutral-300/80"
}

export const PricingSection: React.FC = () => {
  return (
    <section
      id="pricing"
      className="relative bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute -top-40 -right-16 w-72 h-72 rounded-full blur-3xl bg-[var(--color-primary)]/40" />
        <div className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full blur-3xl bg-[var(--color-accent)]/40" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          {/* <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 ring-1 ring-blue-200/50">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">Simple Pricing</span>
          </div> */}
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-4">
            Pricing that feels like a vacation
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Scale from quick trials to full-on privacy suites without the stress. Every plan
            comes with the same island-grade privacy guarantees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => {
            const cardClasses = getCardClasses(plan)
            return (
              <div
                key={plan.name}
                className={`group relative flex flex-col rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 min-h-[580px] ${cardClasses}`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-1.5 text-xs font-semibold text-white shadow-lg ring-2 ring-blue-100">
                    <Sparkles className="h-3.5 w-3.5" />
                    Most Popular
                  </div>
                )}

                <div className="mb-8">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-2xl font-bold tracking-tight text-neutral-900">
                      {plan.name}
                    </h3>
                    {plan.isPopular && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-blue-100/50 ring-1 ring-blue-200/50">
                        <Crown className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-4 flex items-baseline gap-2">
                    <span className="text-5xl font-bold tracking-tight text-neutral-900">
                      {plan.price.split(' ')[0]}
                    </span>
                    {plan.price !== "Free" && (
                      <span className="text-sm font-medium text-neutral-500">/ month</span>
                    )}
                  </div>
                  
                  <p className="text-[14px] leading-relaxed text-neutral-600">{plan.tagline}</p>
                </div>

                <ul className="mb-8 flex-grow space-y-3.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-neutral-700">
                      <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-200/50">
                        <Check className="h-3 w-3 text-emerald-600" />
                      </div>
                      <span className="text-[14px] leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`group/btn relative w-full overflow-hidden rounded-xl px-6 py-3.5 text-sm font-semibold shadow-sm transition-all ${
                    plan.isPopular
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-[0_2px_8px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_16px_rgba(59,130,246,0.4)] hover:scale-[1.02]"
                      : "border border-neutral-200/60 bg-white text-neutral-900 hover:border-neutral-300 hover:bg-neutral-50"
                  }`}
                >
                  <span className="relative z-10">{plan.buttonLabel}</span>
                  {plan.isPopular && (
                    <div className="absolute inset-0 -z-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 transition-opacity group-hover/btn:opacity-20" />
                  )}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

