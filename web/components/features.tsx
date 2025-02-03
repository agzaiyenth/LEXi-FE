import { Card } from "@/components/ui/card"
import {
  Calendar,
  FileText,
  LineChart,
  Lock,
  MessageSquare,
  Shield,
  Video,
} from "lucide-react"

const features = [
  {
    name: "Calendar Management",
    description: "Efficiently manage your schedule with our intuitive calendar system.",
    icon: Calendar,
  },
  {
    name: "Secure Messaging",
    description: "Communicate with clients through our encrypted messaging platform.",
    icon: MessageSquare,
  },
  {
    name: "Video Sessions",
    description: "Conduct remote therapy sessions with high-quality video calls.",
    icon: Video,
  },
  {
    name: "Document Management",
    description: "Securely store and manage client documents and session notes.",
    icon: FileText,
  },
  {
    name: "Analytics Dashboard",
    description: "Track your practice's performance with detailed analytics.",
    icon: LineChart,
  },
  {
    name: "Data Security",
    description: "Your data is protected with enterprise-grade security measures.",
    icon: Shield,
  },
]

export function Features() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to manage your practice
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our platform provides all the tools you need to run your therapy practice efficiently and securely.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-7xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.name} className="p-6">
                <feature.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold">{feature.name}</h3>
                <p className="mt-2 text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}