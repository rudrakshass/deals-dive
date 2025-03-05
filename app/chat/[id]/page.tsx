"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { businesses, contacts, messages as messagesRecord } from "@/lib/data"
import { useParams, useRouter } from "next/navigation"
import { Send, Phone, VideoIcon, Info, ChevronLeft } from "lucide-react"
import Link from "next/link"

// Create a custom handshake icon since it doesn't exist in Lucide
const HandshakeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 11l3 3L8 20l-5-5 6-6" />
    <path d="M13 13l3-3" />
    <path d="M14 4l6 6-3 3-3-3-3 3-3-3 6-6" />
  </svg>
)

// Define interfaces for better type safety
interface Message {
  id: string;
  senderId: string;
  receiverId?: string;
  text: string;
  timestamp: Date | string;
  status: string;
}

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  email: string;
  phone: string;
  status?: string;
  businessId?: string;
  lastActive?: string;
}

interface Business {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  investmentNeeded: number;
  equity: number;
  demands: string;
  location: string;
}

export default function ChatPage() {
  const params = useParams() as { id: string }
  const router = useRouter()
  const id = params.id
  
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Find the contact and business based on the ID
  const contact = useMemo(() => contacts.find((c) => c?.id === id), [id]) as Contact | undefined
  const business = useMemo(() => 
    businesses.find((b) => b?.id === id || b?.id === contact?.businessId), 
    [id, contact]
  ) as Business | undefined

  useEffect(() => {
    // Filter messages for this conversation
    if (!id) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)
    
    try {
      // Safely access messagesRecord with type checking
      if (!messagesRecord || typeof messagesRecord !== 'object') {
        throw new Error("Messages data is not available")
      }

      // Convert to array safely if it's an object
      const messagesArray = Array.isArray(messagesRecord) 
        ? messagesRecord 
        : Object.values(messagesRecord).flat()
      
      if (!Array.isArray(messagesArray)) {
        throw new Error("Failed to process messages data")
      }

      // Type-safe filtering of messages
      const relevantMessages = messagesArray
        .filter((m: any): m is Message => {
          if (!m || typeof m !== 'object') return false
          
          const senderId = m.senderId
          const receiverId = m.receiverId
          
          // Ensure this message is between the current user and the selected contact
          return (
            (senderId === id && receiverId === "user") || 
            (senderId === "user" && receiverId === id)
          )
        })
        .map((m: Message) => ({
          ...m,
          // Ensure timestamp is always a Date object
          timestamp: m.timestamp instanceof Date ? m.timestamp : new Date(m.timestamp)
        }))
        .sort((a, b) => {
          const timeA = a.timestamp instanceof Date ? a.timestamp.getTime() : new Date(a.timestamp).getTime()
          const timeB = b.timestamp instanceof Date ? b.timestamp.getTime() : new Date(b.timestamp).getTime()
          return timeA - timeB
        })
      
      setMessages(relevantMessages)
    } catch (error) {
      console.error("Error loading messages:", error)
      setError("Failed to load messages. Please try again.")
      setMessages([])
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    // Scroll to bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newMessage.trim() || !id) return
    
    try {
      const newMessageObj: Message = {
        id: `msg-${Date.now()}`,
        senderId: "user",
        receiverId: id,
        text: newMessage.trim(),
        timestamp: new Date(),
        status: "sent"
      }
      
      setMessages((prev) => [...prev, newMessageObj])
      setNewMessage("")

      // Simulate response after a delay
      setTimeout(() => {
        const responses = [
          "That sounds interesting. Can you tell me more about the investment terms?",
          "I appreciate your interest in our startup. We're looking for strategic investors.",
          "We can discuss this further. Do you have experience in our industry?",
          "Let me think about your proposal and get back to you tomorrow.",
          "That's a compelling offer. Would you be open to a meeting next week?"
        ]
        
        const responseObj: Message = {
          id: `msg-${Date.now()}`,
          senderId: id,
          receiverId: "user",
          text: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date(),
          status: "received"
        }
        
        setMessages((prev) => [...prev, responseObj])
      }, 1500)
    } catch (error) {
      console.error("Error sending message:", error)
      // Could add UI feedback for send error
    }
  }

  // Handle loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-96">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Loading conversation...</p>
        </div>
      </div>
    )
  }

  // Handle error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="p-4 bg-destructive/10 text-destructive rounded-md">
          <p>{error}</p>
        </div>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/chat">Back to Messages</Link>
        </Button>
      </div>
    )
  }

  // Handle no contact/business found
  if (!contact && !business) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="p-4 bg-muted rounded-md">
          <p>Contact or business not found</p>
        </div>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/chat">Back to Messages</Link>
        </Button>
      </div>
    )
  }

  // Define the entity we're chatting with (contact or business)
  const displayEntity = contact || business
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <motion.div
        className="flex flex-col md:flex-row gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Business info sidebar */}
        <div className="w-full md:w-1/3">
          <div className="bg-card rounded-lg border shadow-sm p-6 sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => router.push("/chat")}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Back
              </Button>
              {business && (
                <Link href={`/agreement/${business.id}`} className="md:ml-auto">
                  <Button size="sm" className="gap-1">
                    <HandshakeIcon className="h-4 w-4" /> 
                    Make Deal
                  </Button>
                </Link>
              )}
            </div>
            
            <div className="flex flex-col items-center mb-6">
              <Avatar className="h-20 w-20 mb-4">
                <AvatarImage 
                  src={displayEntity?.avatar || "/placeholder.svg"} 
                  alt={displayEntity?.name || "Contact"} 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg"
                  }}
                />
                <AvatarFallback>{displayEntity?.name?.[0] || "?"}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{contact?.name || business?.name}</h2>
              {contact && business && <p className="text-sm text-muted-foreground">{business.name}</p>}
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                  <VideoIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                  <Info className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {business && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-primary">About</h3>
                  <p className="text-sm mt-1">{business.description}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-primary">Seeking</h3>
                  <p className="text-sm mt-1">${business.investmentNeeded?.toLocaleString() || 0} for {business.equity || 0}% equity</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-primary">Details</h3>
                  <p className="text-sm mt-1">{business.demands || "No details provided"}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-primary">Location</h3>
                  <p className="text-sm mt-1">{business.location || "Location not specified"}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Chat area */}
        <div className="w-full md:w-2/3 flex flex-col">
          <div className="bg-card rounded-t-lg border-x border-t shadow-sm p-4 flex items-center">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage 
                  src={displayEntity?.avatar || "/placeholder.svg"} 
                  alt={displayEntity?.name || "Contact"}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg"
                  }}
                />
                <AvatarFallback>{displayEntity?.name?.[0] || "?"}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">{displayEntity?.name || "Unnamed Contact"}</h2>
                {contact && (
                  <p className="text-xs text-muted-foreground">
                    {contact.status === "online" ? (
                      <span className="flex items-center">
                        <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span> Online
                      </span>
                    ) : (
                      `Last active ${contact.lastActive || "recently"}`
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-secondary/50 border-x overflow-y-auto flex-1" style={{ height: "400px" }}>
            {messages.length === 0 ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-muted-foreground text-center">
                  No messages yet. Start the conversation!
                </p>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {messages.map((message) => {
                  const isUser = message.senderId === "user"
                  
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          isUser
                            ? "bg-primary text-primary-foreground"
                            : "bg-card text-card-foreground"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-70 text-right mt-1">
                          {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </p>
                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
          
          <form onSubmit={handleSendMessage} className="bg-card rounded-b-lg border-x border-b shadow-sm p-3 flex items-center gap-2">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
              disabled={!id}
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={!newMessage.trim() || !id}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

