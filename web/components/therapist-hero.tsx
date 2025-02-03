import { Button } from "@/components/ui/button"
import { Calendar, MessageSquare, Video } from "lucide-react"

export function TherapistHero() {
  return (
    <div className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Empower Your Practice
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Join our platform designed specifically for therapists. Manage appointments, connect with clients, and grow your practice with our comprehensive suite of tools.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg">Get Started</Button>
            <Button variant="outline" size="lg">Learn More</Button>
          </div>
        </div>
        <div className="mt-16 flow-root sm:mt-24">
          <div className="relative rounded-xl bg-card p-8 ring-1 ring-border sm:p-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="flex flex-col items-center">
                <Calendar className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-lg font-semibold">Smart Scheduling</h3>
                <p className="text-center text-muted-foreground mt-2">
                  Manage your availability and appointments with ease
                </p>
              </div>
              <div className="flex flex-col items-center">
                <MessageSquare className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-lg font-semibold">Secure Messaging</h3>
                <p className="text-center text-muted-foreground mt-2">
                  Connect with clients through encrypted chat
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Video className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-lg font-semibold">Video Sessions</h3>
                <p className="text-center text-muted-foreground mt-2">
                  Conduct remote therapy sessions seamlessly
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}