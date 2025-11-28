"use client"

import Head from "next/head"
import { Card, CardContent } from "@/components/ui/card"
import NavBarLandingPage from "@/components/NavBarLandingPage"
import Image from "next/image"
import { Shield, Lock, Zap, ArrowRight, Users, Globe } from "lucide-react"

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us • Cocoinbox</title>
        <meta name="description" content="We're on a mission to make privacy protection simple, accessible, and enjoyable for everyone." />
      </Head>

      <div className="min-h-screen bg-[var(--bg-light)] font-sans selection:bg-[var(--color-primary)] selection:text-white">
        <NavBarLandingPage />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-30"
            style={{ background: 'var(--gradient-hero)' }}></div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-bold tracking-wide mb-6">
              OUR MISSION
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 text-gray-900 leading-tight">
              Privacy made <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">simple.</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed text-gray-600 font-medium">
              We're building the future of digital privacy. Secure, accessible, and designed for everyone.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-32 bg-white relative overflow-hidden">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[var(--color-primary)]/5 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-white group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none"></div>
                  <Image
                    src="/capture.png"
                    alt="Cocoinbox Interface"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                    priority
                  />

                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-white/20 shadow-lg flex items-center gap-4 z-30">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] shrink-0">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 leading-tight">Bank-grade Encryption</p>
                      <p className="text-sm text-gray-500 mt-1">Your data never leaves your device unencrypted</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-10 -left-10 w-40 h-40 bg-[url('/grid.svg')] opacity-30 -z-10"></div>
                <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-[var(--color-accent)]/10 rounded-full blur-3xl -z-10"></div>
              </div>

              <div className="space-y-10 order-1 lg:order-2">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold tracking-wider uppercase">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse"></span>
                    Our Vision
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.1]">
                    Taking back control of your <span className="relative inline-block">
                      <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">digital identity</span>
                      <span className="absolute bottom-2 left-0 w-full h-3 bg-[var(--color-primary)]/10 -rotate-1 z-0"></span>
                    </span>
                  </h2>
                  <p className="text-xl text-gray-600 leading-relaxed font-medium">
                    In a digital landscape where data is the new currency, your privacy shouldn't be the price you pay for connectivity.
                  </p>
                  <p className="text-gray-500 leading-relaxed text-lg">
                    Cocoinbox was born from a simple belief: you deserve to choose what you share. We provide privacy-first tools like temporary email, encrypted file sharing, and secure notes—all wrapped in a beautiful, intuitive interface.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section - Dark */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[var(--bg-card-dark)] z-0"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--color-primary)]/5 blur-3xl"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                Why choose Cocoinbox?
              </h2>
              <p className="text-xl text-gray-300">
                Built on the principles of Zero Knowledge privacy. We can't read your data, and neither can anyone else.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Privacy First",
                  desc: "No sign-up, no tracking, no cookies. We don't collect what we don't need.",
                  color: "text-emerald-400"
                },
                {
                  icon: Lock,
                  title: "End-to-End Encrypted",
                  desc: "Your data is encrypted on your device before it ever reaches our servers.",
                  color: "text-[var(--color-primary)]"
                },
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  desc: "Security shouldn't slow you down. Experience blazing fast performance.",
                  color: "text-amber-400"
                }
              ].map((feature, idx) => (
                <Card key={idx} className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${feature.color}`}>
                      <feature.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-20 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]"></div>
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>

              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-black mb-8 text-white tracking-tight">
                  Ready to go invisible?
                </h2>
                <p className="text-xl text-white/90 mb-10 font-medium">
                  Join the privacy revolution today. It's free, secure, and takes less than a second.
                </p>
                <a
                  href="/register"
                  className="inline-flex items-center gap-2 bg-white text-[var(--color-primary)] px-10 py-5 rounded-full font-bold text-lg hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)] transform hover:-translate-y-1 transition-all duration-300"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
