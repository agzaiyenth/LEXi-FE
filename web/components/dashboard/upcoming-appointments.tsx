import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const appointments = [
  {
    id: 1,
    client: "Sarah Johnson",
    time: "10:00 AM",
    date: "Today",
    type: "Video Call",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
  },
  {
    id: 2,
    client: "Michael Chen",
    time: "2:30 PM",
    date: "Today",
    type: "In Person",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop"
  },
  {
    id: 3,
    client: "Emma Wilson",
    time: "11:00 AM",
    date: "Tomorrow",
    type: "Video Call",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
  }
]

export function UpcomingAppointments() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={appointment.image} alt={appointment.client} />
                <AvatarFallback>{appointment.client[0]}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{appointment.client}</p>
                <p className="text-sm text-muted-foreground">
                  {appointment.date} at {appointment.time}
                </p>
              </div>
              <div className="ml-auto font-medium">{appointment.type}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}