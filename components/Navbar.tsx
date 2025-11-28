// import React from "react";
// import { useAuth } from "../contexts/AuthContext";
// import { useRouter } from "next/router";

// type Props = {
//   title?: string;
// };

// export default function Navbar({ title }: Props) {
//   const { user, signOut } = useAuth();
//   const router = useRouter();

//   const handleSignOut = async () => {
//     await signOut();
//     router.push('/');
//   };

//   return (
//     <header className="navbar">
//       <div className="left">
//         <button className="hamburger" aria-label="Open Menu">☰</button>
//         <div className="title">{title || "Cocoinbox"}</div>
//       </div>
//       <div className="right">
//         {user && (
//           <>
//             <span className="user-email">{user.email}</span>
//             <button onClick={handleSignOut} className="sign-out-btn">Sign Out</button>
//           </>
//         )}
//       </div>
//       <style jsx>{`
//         .navbar {
//           height: 64px;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 0 16px;
//           background: #fff;
//           border-bottom: 1px solid #e5e7eb;
//           position: sticky;
//           top: 0;
//           z-index: 40;
//         }
//         .left {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }
//         .title {
//           font-weight: 600;
//           font-size: 18px;
//         }
//         .right {
//           display: flex;
//           align-items: center;
//           gap: 16px;
//         }
//         .user-email {
//           color: #64748b;
//           font-size: 14px;
//         }
//         .sign-out-btn {
//           background: #ef4444;
//           color: white;
//           border: none;
//           padding: 8px 16px;
//           border-radius: 6px;
//           font-size: 14px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: background 0.2s;
//         }
//         .sign-out-btn:hover {
//           background: #dc2626;
//         }
//         .hamburger {
//           display: none;
//           background: transparent;
//           border: none;
//           font-size: 24px;
//           cursor: pointer;
//         }
//         @media (max-width: 900px) {
//           .hamburger { display: inline-block; }
//           .user-email { display: none; }
//         }
//       `}</style>
//     </header>
//   );
// }




"use client"
import { useEffect, useMemo, useState } from "react"
import { Menu, LogOut, User, Bell, Search, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/router"
import { useAuth } from "@/contexts/AuthContext"

type Props = {
  title?: string
  onMenuClick: () => void
}

export default function Navbar({ title, onMenuClick }: Props) {
  const router = useRouter()
  const { user, signOut } = useAuth()

  const initials = useMemo(() => {
    const e = user?.email || "user@example.com"
    const first = e.charAt(0).toUpperCase()
    return first
  }, [user?.email])

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  // Theme toggle
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
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between gap-3 px-3 md:px-6">
        <div className="flex items-center gap-2 md:gap-3">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick} aria-label="Toggle menu">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">C</div>
            <h1 className="text-lg md:text-xl font-semibold tracking-tight">{title || "Cocoinbox"}</h1>
          </div>
        </div>

        {/* Center: Search (hidden on small) */}
        <div className="hidden md:flex flex-1 max-w-xl items-center mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search… (coming soon)" aria-label="Search" />
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          {/* Theme toggle */}
          <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggleTheme}>
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>New message received</DropdownMenuItem>
              <DropdownMenuItem>System update available</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>See all</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {user && (
            <>
              {/* Desktop user info */}
              <span className="hidden lg:inline-block text-sm text-muted-foreground mr-1">{user.email}</span>

              {/* User dropdown menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary text-primary-foreground">{initials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">My Account</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/subscription')}>
                    Subscription
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
