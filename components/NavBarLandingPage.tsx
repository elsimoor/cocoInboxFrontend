"use client"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { Sun, Moon } from "lucide-react"

const NavBarLandingPage = () => {
  const router = useRouter()
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("theme")) as "light" | "dark" | null
    const prefersDark = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    const initial = stored ?? (prefersDark ? "dark" : "light")
    setTheme(initial)
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", initial === "dark")
    }
  }, [])

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark"
    setTheme(next)
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", next === "dark")
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", next)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] m-1.5 rounded-full backdrop-blur-xl bg-white/10  border border-white/40  shadow-lg shadow-black/5 mx-auto max-w-7xl px-3 md:px-6 py-2 md:py-2.5 font-sans transition-colors duration-300">
      <div className="relative flex items-center justify-between gap-3 md:gap-6">

        <Link href="/" className="flex items-center cursor-pointer flex-shrink-0">
          <span className="text-[var(--text-primary)] font-bold text-lg md:text-xl tracking-tight">
            CocoInbox
          </span>
        </Link>

        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3 md:gap-6">
          <Link
            href="/about"
            className={`text-xs md:text-sm font-medium py-1 transition-colors duration-200 ${
              router.pathname === "/about"
                ? "text-[var(--color-primary)] font-semibold"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            About
          </Link>
          <Link
            href="/faq"
            className={`text-xs md:text-sm font-medium py-1 transition-colors duration-200 ${
              router.pathname === "/faq"
                ? "text-[var(--color-primary)] font-semibold"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            FAQ
          </Link>
          <Link
            href="/blog"
            className={`text-xs md:text-sm font-medium py-1 transition-colors duration-200 ${
              router.pathname === "/blog"
                ? "text-[var(--color-primary)] font-semibold"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Blog
          </Link>
        </div>

        
        <div className="flex items-center gap-3 md:gap-5 flex-wrap flex-shrink-0">
          <button
            onClick={toggleTheme}
            className="bg-black text-white border-none w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 p-0 hover:scale-105"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
            ) : (
              <Sun className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
            )}
          </button>
          <Link
            href="/login"
            className="text-xs md:text-sm font-medium py-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
          >
            Log In
          </Link>
          <Link
            href="/register"
            className="bg-[var(--btn-primary)] text-white py-1.5 md:py-2 px-3 md:px-5 rounded-full font-semibold text-xs md:text-sm transition-all duration-200 shadow-[var(--shadow-button)] hover:bg-[var(--color-primary-hover)] hover:shadow-[0_6px_20px_rgba(93,93,255,0.4)] hover:-translate-y-0.5"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default NavBarLandingPage
