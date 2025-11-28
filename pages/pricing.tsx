"use client"

import Head from "next/head"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import NavBarLandingPage from "@/components/NavBarLandingPage"

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      desc: "Try features with limits",
      popular: false,
      features: ["Temp email", "Basic notes", "5 files / day", "Community support"],
      icon: "🎁",
    },
    {
      name: "Pro",
      price: "$9/mo",
      desc: "For privacy enthusiasts",
      popular: true,
      features: [
        "Unlimited temp email",
        "Secure notes",
        "Encrypted file share",
        "Priority support",
        "Advanced analytics",
      ],
      icon: "⭐",
    },
    {
      name: "Team",
      price: "$29/mo",
      desc: "For small teams",
      popular: false,
      features: ["All Pro features", "Team workspaces", "Usage analytics", "Admin controls", "Dedicated support"],
      icon: "👥",
    },
  ]

  return (
    <>
      <Head>
        <title>Cocoinbox • Pricing</title>
      </Head>
      <div className="tropical-page">
        <NavBarLandingPage />

        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-20">
            <h1
              className="text-6xl font-black tracking-tight mb-6 text-white"
              style={{ textShadow: "3px 3px 6px rgba(0,0,0,0.2)" }}
            >
              Simple, Transparent Pricing
            </h1>
            <p className="text-2xl text-white/95 max-w-2xl mx-auto font-semibold">
              Choose the plan that's right for you. Always flexible, always fair.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 lg:gap-6 mb-20">
            {plans.map((p) => (
              <Card
                key={p.name}
                className={`flex flex-col border-none rounded-3xl overflow-hidden transition-all ${
                  p.popular
                    ? "bg-white/98 shadow-2xl scale-105 md:scale-100 ring-4 ring-orange-400"
                    : "bg-white/95 shadow-xl hover:shadow-2xl"
                }`}
              >
                {p.popular && (
                  <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white text-center py-3 font-black text-lg">
                    🏆 Most Popular
                  </div>
                )}
                <CardHeader className={`${p.popular ? "pt-6" : "pt-8"} pb-4`}>
                  <div className="text-5xl mb-4">{p.icon}</div>
                  <CardTitle className="text-3xl font-black text-slate-800">{p.name}</CardTitle>
                  <CardDescription className="text-slate-600 text-lg font-semibold">{p.desc}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 flex-1 px-8">
                  <div>
                    <span className="text-5xl font-black text-slate-800">{p.price}</span>
                    {p.price !== "$0" && <span className="text-slate-600 ml-3 font-bold text-lg">/month</span>}
                  </div>
                  <ul className="space-y-4">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-3">
                        <span className="text-2xl">✓</span>
                        <span className="text-slate-700 font-semibold text-lg">{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="px-8 pb-8">
                  <Link href="/register" className="w-full">
                    <Button
                      className={`w-full py-4 text-lg font-bold rounded-xl transition-all transform hover:scale-105 ${
                        p.popular
                          ? "bg-gradient-to-r from-cyan-400 to-cyan-500 text-white hover:shadow-lg"
                          : "bg-gradient-to-r from-orange-300 to-orange-400 text-white hover:shadow-lg"
                      }`}
                    >
                      Get Started
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 text-center shadow-2xl border-none">
            <h2 className="text-4xl font-black mb-6 text-slate-800">Questions?</h2>
            <p className="text-xl text-slate-600 mb-8 font-semibold">
              Check out our{" "}
              <Link href="/faq" className="text-cyan-600 font-black hover:text-cyan-700 underline">
                FAQ
              </Link>{" "}
              or{" "}
              <Link href="/contact" className="text-cyan-600 font-black hover:text-cyan-700 underline">
                contact us
              </Link>
            </p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .tropical-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #38BDF8 0%, #22D3EE 50%, #06B6D4 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
      `}</style>
    </>
  )
}
