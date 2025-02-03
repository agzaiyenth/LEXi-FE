"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Plus, Calendar as CalendarIcon, Filter } from "lucide-react"

const appointments = [
  {
    id: 1,
    client: "Sarah Johnson",
    time: "10:00 AM",
    date: "2024-04-10",
    type: "Video Call",
    status: "confirmed",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
  },
  {
    id: 2,
    client: "Michael Chen",
    time: "2:30 PM",
    date: "2024-04-10",
    type: "In Person",
    status: "pending",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop"
  },
  {
    id: 3,
    client: "Emma Wilson",
    time: "11:00 AM",
    date: "2024-04-11",
    type: "Video Call",
    status: "confirmed",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
  }
]

export default function AppointmentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <DashboardShell>
        <DashboardHeader
          heading="Appointments"
          text="Manage your upcoming appointments and schedule."
        >
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Appointment
          </Button>
        </DashboardHeader>

        <Tabs defaultValue="upcoming" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
            </TabsList>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <TabsContent value="upcoming" className="space-y-4">
            {appointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardContent className="flex items-center p-6">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={appointment.image} alt={appointment.client} />
                    <AvatarFallback>{appointment.client[0]}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium leading-none">{appointment.client}</p>
                      <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                        {appointment.status}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {appointment.date} at {appointment.time}
                    </div>
                  </div>
                  <Badge variant="outline">{appointment.type}</Badge>
                  <Button variant="ghost" size="sm" className="ml-4">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="past">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">No past appointments to display.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar">
            <Card>
              <CardHeader>
                <CardTitle>Schedule Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DashboardShell>
    </div>
  )
}