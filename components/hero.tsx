"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Iridescence } from "@/components/backgrounds"

export function HeroSection() {
    const [copied, setCopied] = useState(false)
    const email = process.env.NEXT_PUBLIC_TEMP_EMAIL || "cocainbox@temmail.me"

    const handleCopy = async () => {
        await navigator.clipboard.writeText(email)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const scrollToInbox = () => {
        const inboxSection = document.getElementById('inbox')
        if (inboxSection) {
            inboxSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            })
        }
    }

    return (
        <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background effects */}
            <Iridescence
                color={[1, 1, 1]}
                mouseReact={false}
                amplitude={0.1}
                speed={1.0}
                className="opacity-90"
            />
            <div className="absolute inset-0 [background:var(--gradient-hero)] opacity-90 z-[1]" />

            <div className="relative max-w-4xl mx-auto z-10">
                <div className="text-center mb-6">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2 leading-tight">
                        <span className="text-[#4A6CF7]">Your Private Email</span>
                    </h1>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-700 leading-tight">
                        No Strings Attached
                    </h2>
                </div>

                {/* Subtitle */}
                <p className="text-lg sm:text-xl text-[var(--text-secondary)] text-center mb-12 max-w-2xl mx-auto leading-relaxed">
                    Temporary email addresses that keep your inbox clean
                </p>

                {/* Email Section */}
                <div className="mb-8">
                    <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)] text-center mb-3 font-medium">
                        YOUR TEMPORARY EMAIL
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-stretch max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg shadow-md overflow-hidden">
                        <input
                            type="email"
                            value={email}
                            readOnly
                            className="flex-1 px-6 py-4 bg-white/10 border-0 font-medium text-xl sm:text-2xl text-black text-center focus:outline-none focus:ring-2 focus:ring-[#4A6CF7]"
                        />
                        <button
                            onClick={handleCopy}
                            className="flex items-center justify-center gap-2 self-stretch h-12 m-2 w-[100px] px-3 md:px-5 bg-[var(--btn-secondary)] text-white font-semibold text-xs md:text-sm hover:bg-[#3d5dd9] transition whitespace-nowrap border-0 rounded-full"
                        >
                            {copied ? (
                                <>
                                    <Check size={12} />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <Copy size={12} />
                                    Copy
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={scrollToInbox}
                        className="px-8 py-4 bg-[#4A6CF7] text-white rounded-lg font-semibold hover:bg-[var(--btn-accent)] transition whitespace-nowrap w-full sm:w-auto shadow-lg hover:shadow-xl hover:scale-105 duration-200"
                    >
                        View Inbox
                    </button>
                    <button
                        onClick={() => window.location.href = '/about'}
                        className="px-8 py-4 bg-white text-[var(--text-primary)] border-2 border-slate-300 rounded-lg font-semibold hover:bg-slate-50 transition whitespace-nowrap w-full sm:w-auto"
                    >
                        Learn More
                    </button>
                </div>
            </div>
        </section>
    )
}
