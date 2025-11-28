"use client"

import Head from "next/head"
import { Card, CardContent } from "@/components/ui/card"
import NavBarLandingPage from "@/components/NavBarLandingPage"
import { HelpCircle, Mail, Shield, Gift, Clock, Users, Lock, ArrowRight } from "lucide-react"
import { useState } from "react"

const faqs = [
  {
    q: "What is a temporary email?",
    a: "A disposable email address you can use to receive emails without exposing your real inbox. Perfect for signing up for services you don't fully trust.",
    icon: Mail,
    category: "Basics"
  },
  {
    q: "Are files encrypted?",
    a: "Yes, files are encrypted client-side with modern Web Crypto before upload. Only you and the recipient have access to the encryption key.",
    icon: Lock,
    category: "Security"
  },
  {
    q: "Is there a free plan?",
    a: "Yes. You can start on Free and upgrade anytime. No credit card required to get started.",
    icon: Gift,
    category: "Pricing"
  },
  {
    q: "How long do temporary emails last?",
    a: "Temporary emails are active for 24 hours by default. You can extend them if needed, or create new ones anytime.",
    icon: Clock,
    category: "Basics"
  },
  {
    q: "Can I use Cocoinbox for business?",
    a: "Our Team plan is designed for small teams and businesses that need advanced privacy features and team collaboration.",
    icon: Users,
    category: "Business"
  },
  {
    q: "Do you store my data?",
    a: "We store minimal data and never access your encrypted files or notes. Everything is encrypted end-to-end, and we have no way to read your content.",
    icon: Shield,
    category: "Security"
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <>
      <Head>
        <title>FAQ • Cocoinbox</title>
        <meta name="description" content="Find answers to common questions about Cocoinbox's privacy-first tools and services." />
      </Head>

      <div className="min-h-screen bg-[var(--bg-light)] font-sans selection:bg-[var(--color-primary)] selection:text-white">
        <NavBarLandingPage />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-30"
            style={{ background: 'var(--gradient-hero)' }}></div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-bold tracking-wide mb-6">
              HELP CENTER
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 text-gray-900 leading-tight">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">Questions</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed text-gray-600 font-medium">
              Everything you need to know about Cocoinbox and our privacy-first services.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx
                const Icon = faq.icon

                return (
                  <Card
                    key={idx}
                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                  >
                    <CardContent className="p-0">
                      <div className="p-6 flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${isOpen
                            ? 'bg-[var(--color-primary)] text-white'
                            : 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                          }`}>
                          <Icon className="w-6 h-6" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wide">
                              {faq.category}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {faq.q}
                          </h3>
                        </div>

                        <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                          }`}>
                          <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>

                      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                        <div className="px-6 pb-6 pl-[88px]">
                          <p className="text-gray-600 leading-relaxed text-lg">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-16 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]"></div>
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                  <HelpCircle className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-6 text-white tracking-tight">
                  Still have questions?
                </h2>
                <p className="text-xl text-white/90 mb-8 font-medium max-w-2xl mx-auto">
                  Can't find the answer you're looking for? Our support team is here to help you.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-[var(--color-primary)] px-10 py-5 rounded-full font-bold text-lg hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)] transform hover:-translate-y-1 transition-all duration-300"
                >
                  Contact Support
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
