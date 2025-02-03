import { ReactNode } from "react"

interface DashboardShellProps {
  children: ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex-1 space-y-4">
        {children}
      </div>
    </div>
  )
}