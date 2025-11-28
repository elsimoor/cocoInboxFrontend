"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface BreadcrumbProps {
  items: { label: string; href: string }[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const defaultItems = [
    { label: "Home", href: "/" },
    ...items,
  ]

  return (
    <nav className="flex items-center gap-2 text-sm w-full" aria-label="Breadcrumb">
      {defaultItems.map((item, index) => (
        <div key={item.href} className="flex items-center gap-2">
          {index > 0 && <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />}
          {index === defaultItems.length - 1 ? (
            <span className="text-[var(--color-primary)] font-medium">{item.label}</span>
          ) : (
            <Link
              href={item.href}
              className="text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}

