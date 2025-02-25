"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { CalendarIcon, Loader2 } from "lucide-react"

const formSchema = z.object({
  clientName: z.string().min(2, {
    message: "Client name must be at least 2 characters.",
  }),
  date: z.date({
    required_error: "A date is required.",
  }),
  time: z.string({
    required_error: "Please select an appointment time.",
  }),
  type: z.enum(["video", "in-person"], {
    required_error: "Please select an appointment type.",
  }),
  notes: z.string().optional(),
})

const steps = [
  { id: "client", title: "Client Details" },
  { id: "datetime", title: "Date & Time" },
  { id: "type", title: "Session Type" },
  { id: "confirm", title: "Confirm Details" },
]

export function NewAppointmentDialog() {
  const [open, setOpen] = React.useState(false)
  const [currentStep, setCurrentStep] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: "",
      notes: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log(values)
    setIsLoading(false)
    setOpen(false)
    form.reset()
    setCurrentStep(0)
  }

  const nextStep = () => {
    const fields = ["clientName", "date", "time", "type"]
    const currentFields = fields.slice(
      currentStep * 1,
      currentStep * 1 + 1
    )

    form.trigger(currentFields as any).then((isValid) => {
      if (isValid) setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))
    })
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full justify-start">
          <CalendarIcon className="mr-2 h-4 w-4" />
          New Appointment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Appointment</DialogTitle>
          <DialogDescription>
            {steps[currentStep].title}
          </DialogDescription>
        </DialogHeader>
        <div className="flex space-x-2 mb-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                "h-2 w-full rounded-full",
                index <= currentStep ? "bg-primary" : "bg-secondary"
              )}
            />
          ))}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {currentStep === 0 && (
              <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter client name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {currentStep === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => i + 9).map((hour) => (
                            <SelectItem key={hour} value={`${hour}:00`}>
                              {hour}:00 {hour < 12 ? "AM" : "PM"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {currentStep === 2 && (
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Session Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select session type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="video">Video Call</SelectItem>
                        <SelectItem value="in-person">In Person</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-muted-foreground">Client:</div>
                  <div>{form.getValues("clientName")}</div>
                  <div className="text-muted-foreground">Date:</div>
                  <div>{form.getValues("date") ? format(form.getValues("date"), "PPP") : "-"}</div>
                  <div className="text-muted-foreground">Time:</div>
                  <div>{form.getValues("time")}</div>
                  <div className="text-muted-foreground">Type:</div>
                  <div>{form.getValues("type") === "video" ? "Video Call" : "In Person"}</div>
                </div>
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl>
                        <Input placeholder="Add any notes (optional)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <DialogFooter>
              {currentStep > 0 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Previous
                </Button>
              )}
              {currentStep < steps.length - 1 ? (
                <Button type="button" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Appointment
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}