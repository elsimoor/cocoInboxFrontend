"use client"

import React from "react"
import { Shield, Zap, Check } from "lucide-react"
import { Plasma } from "@/components/backgrounds"

const features = [
  {
    title: "Privacy-first",
    description: "No sign-up, no tracking, no cookies needed. Your email, then gone.",
    icon: <Shield className="w-8 h-8 text-white" />,
    accent: "bg-[var(--color-accent)]",
  },
  {
    title: "Fast & Disposable",
    description: "Generate addresses instantly for signups and demos without clutter.",
    icon: <Zap className="w-8 h-8 text-white" />,
    accent: "bg-[var(--color-primary)]",
    featured: true,
  },
  {
    title: "Spam Protection",
    description: "Keep your real inbox clean and protected from leaks and spam.",
    icon: (
      <div className="flex flex-col gap-1">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
        <div className="flex gap-1 justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      </div>
    ),
    accent: "bg-[var(--color-accent)]",
  },
]

export const WhyCocoInboxSection: React.FC = () => {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[var(--bg-dark)] py-16 px-4 sm:px-6 lg:px-8 min-h-[700px]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <Plasma
          color="#4A6CF7"
          speed={0.5}
          direction="forward"
          scale={1.05}
          opacity={0.65}
          mouseInteractive={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#27294f]/60 to-[#0f172a]/80" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why CocoInbox?</h2>
          <p className="text-lg md:text-xl text-gray-300">
            Everything you need for temporary email, nothing you don&apos;t.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`relative bg-[var(--bg-card-dark)] rounded-2xl p-8 border border-[var(--border-card-dark)] transition-all duration-300 min-h-[320px] flex flex-col ${
                feature.featured
                  ? "-translate-y-4 scale-105 z-10 hover:scale-110"
                  : "hover:scale-105"
              }`}
              style={{
                boxShadow: feature.featured
                  ? "var(--shadow-card-featured)"
                  : "var(--shadow-card-dark)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = feature.featured
                  ? "var(--shadow-card-featured-hover)"
                  : "var(--shadow-card-dark-hover)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = feature.featured
                  ? "var(--shadow-card-featured)"
                  : "var(--shadow-card-dark)"
              }}
            >
              <div className="absolute top-4 right-4 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                <Check className="w-4 h-4 text-[var(--bg-dark)]" />
              </div>

              <div className="mb-6">
                <div className={`w-16 h-16 ${feature.accent} rounded-xl flex items-center justify-center shadow-lg`}>
                  {feature.icon}
                </div>
              </div>

              <div className="flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyCocoInboxSection

