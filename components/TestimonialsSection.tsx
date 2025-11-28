"use client"

import React, { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Testimonial } from "@/types"

const testimonials: Testimonial[] = [
  {
    quote: "Great privacy and zero setup. I use a fresh inbox for every service and keep my personal address safe.",
    name: "Sam Patel",
    role: "Indie Hacker",
    initial: "S"
  },
  {
    quote: "Cocoinbox has been a game-changer for protecting my privacy online! 🌴",
    name: "Alex Johnson",
    role: "Developer",
    initial: "A"
  },
  {
    quote: "Fast, simple, and exactly what I needed. No more spam in my main inbox!",
    name: "Maria Garcia",
    role: "Designer",
    initial: "M"
  }
]

export const TestimonialsSection: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState<number>(0)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-secondary)] text-center mb-12">
          Loved by Users
        </h2>

        <div className="relative">
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <div className="bg-white rounded-3xl p-8 md:p-12" style={{ boxShadow: 'var(--shadow-testimonial)' }}>
            <div className="text-center">
              <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed mb-8">
                "{testimonials[currentTestimonial].quote}"
              </p>

              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-bold text-lg">
                    {testimonials[currentTestimonial].initial}
                  </div>
                  
                  <div className="font-bold text-[var(--text-secondary)]">
                    {testimonials[currentTestimonial].name}
                  </div>
                </div>
                
                <div className="text-sm text-[var(--text-muted)]">
                  {testimonials[currentTestimonial].role}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`rounded-full transition-all duration-300 ease-in-out ${
                index === currentTestimonial
                  ? "bg-[var(--color-primary)] w-10 h-3 shadow-[0_2px_8px_rgba(76,76,254,0.4)]"
                  : "bg-gray-300 hover:bg-gray-400 w-3 h-3 hover:scale-110"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}