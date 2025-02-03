import { MainNav } from "@/components/main-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { UpcomingAppointments } from "@/components/dashboard/upcoming-appointments"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { Overview } from "@/components/dashboard/overview"
import { SessionDistribution } from "@/components/dashboard/session-distribution"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <DashboardShell>
        <DashboardHeader
          heading="Dashboard"
          text="Manage your practice and monitor key metrics."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Overview />
          <QuickActions />
          <RevenueChart />
          <SessionDistribution />
          <UpcomingAppointments />
          <RecentActivity />
        </div>
      </DashboardShell>
    </div>
  )
}