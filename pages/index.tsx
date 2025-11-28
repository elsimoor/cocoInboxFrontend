"use client"

import React from "react"
import Island from "@/components/island"
import { HeroSection } from "@/components/hero"
import NavBarLandingPage from "@/components/NavBarLandingPage"
import { InboxSection } from "@/components/InboxSection"
import { WhyCocoInboxSection } from "@/components/WhyCocoInboxSection"
import { TestimonialsSection } from "@/components/TestimonialsSection"
import { PricingSection } from "@/components/PricingSection"
import { Footer } from "@/components/Footer"

const HomePage: React.FC = () => {
  return (
    <div className="tropical-page">
      {/* Navbar */}
      <NavBarLandingPage />

      {/* Hero Section with Tropical Island */}
      <div className="w-full relative">
        <Island>
          <HeroSection />
        </Island>
      </div>

      {/* Inbox Section */}
      <InboxSection />

      {/* Why CocoInbox Section */}
      <WhyCocoInboxSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* Loved by Users Section */}
      <TestimonialsSection />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default HomePage