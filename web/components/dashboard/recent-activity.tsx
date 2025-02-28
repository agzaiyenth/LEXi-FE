import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, FileText, Calendar, Video } from "lucide-react"

const activities = [
  {
    icon: MessageSquare,
    description: "New message from Sarah Johnson",
    time: "5 minutes ago"
  },
  {
    icon: FileText,
    description: "Session notes updated for Michael Chen",
    time: "2 hours ago"
  },
  {
    icon: Calendar,
    description: "Appointment rescheduled with Emma Wilson",
    time: "Yesterday"
  },
  {
    icon: Video,
    description: "Completed video session with David Brown",
    time: "Yesterday"
  }
]

export function RecentActivity() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center">
              <activity.icon className="h-4 w-4 text-muted-foreground" />
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.description}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}