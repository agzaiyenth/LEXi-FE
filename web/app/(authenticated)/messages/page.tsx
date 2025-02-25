"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Phone, Video, Calendar, Mail, MapPin, Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Message {
  id: number
  content: string
  sender: "therapist" | "client"
  timestamp: string
}

interface Contact {
  id: number
  name: string
  image: string
  lastMessage: string
  lastMessageTime: string
  status: "online" | "offline" | "away"
  unreadCount?: number
}

const contacts: Contact[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    lastMessage: "I've been feeling anxious lately.",
    lastMessageTime: "10:30 AM",
    status: "online",
    unreadCount: 2
  },
  {
    id: 2,
    name: "Michael Chen",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
    lastMessage: "Thank you for the session today.",
    lastMessageTime: "Yesterday",
    status: "offline"
  },
  {
    id: 3,
    name: "Emma Wilson",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    lastMessage: "See you next week!",
    lastMessageTime: "2 days ago",
    status: "away"
  }
]

const messages: Message[] = [
  {
    id: 1,
    content: "Hi Dr. Smith, I've been feeling anxious lately.",
    sender: "client",
    timestamp: "10:30 AM"
  },
  {
    id: 2,
    content: "I understand. Let's discuss this in detail. Can you tell me more about when these feelings occur?",
    sender: "therapist",
    timestamp: "10:32 AM"
  },
  {
    id: 3,
    content: "Usually when I'm at work or in social situations.",
    sender: "client",
    timestamp: "10:33 AM"
  }
]

const clientDetails = {
  name: "Sarah Johnson",
  email: "sarah.j@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main St, Boston, MA",
  nextSession: "April 15, 2024 at 2:00 PM",
  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
}

export default function MessagesPage() {
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background ">
      
      <DashboardShell>
        <DashboardHeader
          heading="Messages"
          text="Chat with your clients securely."
        />
        <div className="grid grid-cols-12 gap-6">
          {/* Contacts Column */}
          <Card className="col-span-3">
            <CardHeader className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search contacts..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Tabs defaultValue="recent" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="recent" className="flex-1">Recent</TabsTrigger>
                  <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[700px]">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center space-x-4 p-4 hover:bg-muted/50 cursor-pointer border-b"
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={contact.image} alt={contact.name} />
                        <AvatarFallback>{contact.name[0]}</AvatarFallback>
                      </Avatar>
                      <span
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                          contact.status === "online"
                            ? "bg-green-500"
                            : contact.status === "away"
                            ? "bg-yellow-500"
                            : "bg-gray-500"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{contact.name}</p>
                        <span className="text-xs text-muted-foreground">
                          {contact.lastMessageTime}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {contact.lastMessage}
                      </p>
                    </div>
                    {contact.unreadCount && (
                      <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-primary rounded-full">
                        {contact.unreadCount}
                      </span>
                    )}
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Column */}
          <Card className="col-span-6">
            <CardHeader className="border-b">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={clientDetails.image} alt={clientDetails.name} />
                  <AvatarFallback>{clientDetails.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{clientDetails.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">Active now</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px] p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "therapist" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.sender === "therapist"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p>{message.content}</p>
                        <span className="text-xs opacity-70 mt-2 block">
                          {message.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-4 border-t">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (newMessage.trim()) {
                      setNewMessage("")
                    }
                  }}
                  className="flex space-x-2"
                >
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button type="submit">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>

          {/* Client Details Column */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Client Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-2">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={clientDetails.image} alt={clientDetails.name} />
                  <AvatarFallback>{clientDetails.name[0]}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold">{clientDetails.name}</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{clientDetails.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{clientDetails.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{clientDetails.address}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Next Session: {clientDetails.nextSession}</span>
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
                <Button className="flex-1" variant="outline" size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
                <Button className="flex-1" variant="outline" size="sm">
                  <Video className="h-4 w-4 mr-2" />
                  Video
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardShell>
    </div>
  )
}