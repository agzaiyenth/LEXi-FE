import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Video, MessageSquare, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NewAppointmentDialog } from "@/components/appointments/new-appointment-dialog"
import Link from "next/link"

export function QuickActions() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <NewAppointmentDialog />
        <Button className="w-full justify-start" variant="outline">
          <Video className="mr-2 h-4 w-4" />
          Start Video Session
        </Button>
        <Button className="w-full justify-start" variant="outline" asChild>
          <Link href="/messages">
            <MessageSquare className="mr-2 h-4 w-4" />
            Send Message
          </Link>
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          Create Note
        </Button>
      </CardContent>
    </Card>
  )
}