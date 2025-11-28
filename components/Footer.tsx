import React from "react"

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--color-primary)] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-8">
          <div className="text-center md:text-left">
            <span className="text-2xl font-bold block mb-2">🥥 Cocoinbox</span>
            <p className="text-gray-200 text-sm">Your privacy, our priority</p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-6">
            <a href="#privacy" className="text-gray-200 hover:text-white transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#terms" className="text-gray-200 hover:text-white transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#contact" className="text-gray-200 hover:text-white transition-colors text-sm">
              Contact
            </a>
          </div>
        </div>
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-gray-200 text-sm">&copy; 2025 Cocoinbox. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}