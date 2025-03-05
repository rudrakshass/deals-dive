"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Send, Mic, FileText, ChevronLeft, Search, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { mockChats, mockContacts, mockBusinesses } from "@/src/data/mockData"

interface Message {
  id: string
  sender: "investor" | "business"
  message: string
  timestamp: string
}

const ChatPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>([])
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [contacts, setContacts] = useState(mockContacts)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [recording, setRecording] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Filter contacts based on search query
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.business.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Load messages for selected contact
  useEffect(() => {
    if (id && mockChats[id as keyof typeof mockChats]) {
      setMessages(mockChats[id as keyof typeof mockChats] as Message[])
      setIsMobileOpen(true)
    } else {
      setMessages([])
    }
  }, [id])

  // Scroll to bottom of messages when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const handleSendMessage = () => {
    if (message.trim() === "") return

    const newMessage: Message = {
      id: `${messages.length + 1}`,
      sender: "investor",
      message: message,
      timestamp: new Date().toISOString(),
    }

    setMessages([...messages, newMessage])
    setMessage("")

    // Simulate response from business
    setTimeout(() => {
      const responseMessage: Message = {
        id: `${messages.length + 2}`,
        sender: "business",
        message: `Thank you for your message. I'll get back to you shortly regarding "${message.substring(0, 30)}${message.length > 30 ? "..." : ""}"`,
        timestamp: new Date().toISOString(),
      }

      setMessages((prevMessages) => [...prevMessages, responseMessage])
    }, 2000)
  }

  const handleCreateAgreement = () => {
    if (id) {
      navigate(`/agreement/${id}`)
    }
  }

  const toggleRecording = () => {
    setRecording(!recording)

    if (!recording) {
      // Simulate speech recognition
      setTimeout(() => {
        setMessage("I am interested in investing in your company. What are your current revenue numbers?")
        setRecording(false)
      }, 3000)
    } else {
      setMessage("")
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString()
  }

  const selectedContact = id ? contacts.find((contact) => contact.id === id) : null
  const selectedBusiness = id ? mockBusinesses.find((business) => business.id === id) : null

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-white dark:bg-slate-950 rounded-lg shadow overflow-hidden">
      {/* Contacts sidebar */}
      <motion.div
        className={cn(
          "w-full md:w-80 border-r border-slate-200 dark:border-slate-800 flex flex-col",
          isMobileOpen ? "hidden md:flex" : "flex",
        )}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold">Messages</h2>
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search contacts..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredContacts.length > 0 ? (
            <div>
              {filteredContacts.map((contact, index) => (
                <motion.div
                  key={contact.id}
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                  whileTap={{ backgroundColor: "rgba(0,0,0,0.1)" }}
                  className={cn(
                    "cursor-pointer p-4 transition-colors",
                    contact.id === id ? "bg-slate-100 dark:bg-slate-800" : "",
                  )}
                  onClick={() => navigate(`/chat/${contact.id}`)}
                >
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${contact.name.charAt(0)}`} />
                      <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium truncate">{contact.name}</h3>
                        <div className="flex items-center">
                          {contact.unread > 0 && (
                            <Badge className="ml-2" variant="destructive">
                              {contact.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{contact.business}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 truncate mt-1">{contact.lastMessage}</p>
                    </div>
                  </div>
                  {index < filteredContacts.length - 1 && <Separator className="mt-4" />}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-slate-500">No contacts found</div>
          )}
        </div>
      </motion.div>

      {/* Chat area */}
      <motion.div
        className={cn("flex-1 flex flex-col", !isMobileOpen ? "hidden md:flex" : "flex")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {id ? (
          <>
            <div className="border-b border-slate-200 dark:border-slate-800 p-4 flex items-center">
              <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={() => setIsMobileOpen(false)}>
                <ChevronLeft className="h-5 w-5" />
              </Button>

              {selectedContact && (
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${selectedContact.name.charAt(0)}`} />
                    <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedContact.name}</h3>
                    <p className="text-xs text-slate-500">{selectedContact.business}</p>
                  </div>
                </div>
              )}

              <div className="ml-auto">
                <Button variant="outline" size="sm" onClick={handleCreateAgreement}>
                  <FileText className="h-4 w-4 mr-2" />
                  Create Agreement
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {messages.length > 0 ? (
                <div className="space-y-4">
                  {messages.map((msg, index) => {
                    const isFirstMessageOfDay =
                      index === 0 || formatDate(msg.timestamp) !== formatDate(messages[index - 1].timestamp)

                    return (
                      <div key={msg.id}>
                        {isFirstMessageOfDay && (
                          <div className="flex justify-center my-4">
                            <div className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs text-slate-500">
                              {formatDate(msg.timestamp)}
                            </div>
                          </div>
                        )}

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={cn("flex", msg.sender === "investor" ? "justify-end" : "justify-start")}
                        >
                          <div className="flex items-end gap-2 max-w-[80%]">
                            {msg.sender === "business" && (
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={`/placeholder.svg?height=32&width=32&text=${selectedContact?.name.charAt(0) || "B"}`}
                                />
                                <AvatarFallback>{selectedContact?.name.charAt(0) || "B"}</AvatarFallback>
                              </Avatar>
                            )}

                            <div
                              className={cn(
                                "px-4 py-2 rounded-lg",
                                msg.sender === "investor"
                                  ? "bg-blue-500 text-white"
                                  : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100",
                              )}
                            >
                              <p>{msg.message}</p>
                              <div className="text-xs opacity-70 text-right mt-1">{formatTime(msg.timestamp)}</div>
                            </div>

                            {msg.sender === "investor" && (
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg?height=32&width=32&text=You" />
                                <AvatarFallback>
                                  <User className="h-4 w-4" />
                                </AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                        </motion.div>
                      </div>
                    )
                  })}
                  <div ref={messagesEndRef} />
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500">
                  {selectedBusiness ? (
                    <div className="text-center">
                      <h3 className="font-medium mb-2">Start a conversation with {selectedBusiness.founder}</h3>
                      <p className="text-sm">Discuss investment opportunities in {selectedBusiness.name}</p>
                    </div>
                  ) : (
                    <p>Select a contact to start chatting</p>
                  )}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    className={cn("pr-12", recording ? "bg-red-50 dark:bg-red-900/20" : "")}
                  />
                  {recording && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-red-500">
                      <span className="mr-2 animate-pulse">Recording...</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500"
                        onClick={() => setRecording(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <Button
                  variant={recording ? "destructive" : "outline"}
                  size="icon"
                  onClick={toggleRecording}
                  className="shrink-0"
                >
                  <Mic className="h-5 w-5" />
                </Button>
                <Button onClick={handleSendMessage} disabled={message.trim() === ""} className="shrink-0">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-center p-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Select a contact to start chatting</h3>
              <p className="text-slate-500 mb-4">Or browse business opportunities on the search page</p>
              <Button asChild>
                <Link to="/">Browse Businesses</Link>
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default ChatPage

