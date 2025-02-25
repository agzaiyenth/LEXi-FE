"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { UserCircle } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
        <div className="mr-8">
          <Link href="/" className="flex items-center space-x-2">
            <UserCircle className="h-6 w-6" />
            <span className="font-bold">TherapistHub</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-6 text-sm font-medium flex-1">
          <Link
            href="/"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/" ? "text-foreground" : "text-foreground/60"
            )}
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname?.startsWith("/dashboard")
                ? "text-foreground"
                : "text-foreground/60"
            )}
          >
            Dashboard
          </Link>
          <Link
            href="/appointments"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname?.startsWith("/appointments")
                ? "text-foreground"
                : "text-foreground/60"
            )}
          >
            Appointments
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Button>Sign In</Button>
        </div>
      </div>
    </div>
  )
}