"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { contacts, businesses } from "@/lib/data"
import { Search, MessageSquare, Clock, ArrowDownUp } from "lucide-react"
import Link from "next/link"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"
import { useDebounce } from "@/hooks/use-debounce"
import { Skeleton } from "@/components/ui/skeleton"

type SortOption = "recent" | "unread" | "alphabetical"

export default function ChatIndexPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [sortOption, setSortOption] = useState<SortOption>("recent")
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  
  // Simulate API loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    
    return () => clearTimeout(timer)
  }, [])
  
  const filteredAndSortedContacts = useMemo(() => {
    let result = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      businesses.find(b => b.id === contact.businessId)?.name
        .toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    )
    
    switch(sortOption) {
      case "recent":
        return result.sort((a, b) => {
          const dateA = a.lastMessage?.timestamp || 0
          const dateB = b.lastMessage?.timestamp || 0
          return dateB - dateA
        })
      case "unread":
        return result.sort((a, b) => (b.unread || 0) - (a.unread || 0))
      case "alphabetical":
        return result.sort((a, b) => a.name.localeCompare(b.name))
      default:
        return result
    }
  }, [debouncedSearchTerm, sortOption])

  const getSortLabel = (option: SortOption): string => {
    switch(option) {
      case "recent": return "Most Recent"
      case "unread": return "Unread First"
      case "alphabetical": return "Alphabetical"
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2 text-primary">Messages</h1>
        <p className="text-muted-foreground mb-6">Continue your deal negotiations with founders</p>
        
        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              className="pl-10 bg-secondary border-border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0">
                <ArrowDownUp className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Sort Conversations</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {(["recent", "unread", "alphabetical"] as SortOption[]).map((option) => (
                <DropdownMenuItem 
                  key={option}
                  className={sortOption === option ? "bg-secondary" : ""}
                  onClick={() => setSortOption(option)}
                >
                  {option === "recent" && <Clock className="h-4 w-4 mr-2" />}
                  {option === "unread" && <MessageSquare className="h-4 w-4 mr-2" />}
                  {option === "alphabetical" && <ArrowDownUp className="h-4 w-4 mr-2" />}
                  {getSortLabel(option)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>
      
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center p-4 bg-card rounded-lg border">
              <Skeleton className="h-12 w-12 rounded-full mr-4" />
              <div className="flex-1">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-3 w-12 mb-2" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4">
          <AnimatePresence>
            {filteredAndSortedContacts.length > 0 ? (
              filteredAndSortedContacts.map((contact, index) => {
                const business = businesses.find(b => b.id === contact.businessId)
                return (
                  <motion.div
                    key={contact.id}
                    className="bg-card rounded-lg border shadow-sm overflow-hidden hover:border-primary/50 transition-all"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                  >
                    <Link href={`/chat/${contact.id}`} className="flex items-center p-4">
                      <Avatar className="h-12 w-12 mr-4 border">
                        <AvatarImage src={contact.avatar} alt={contact.name} />
                        <AvatarFallback className="bg-primary/10 text-primary">{contact.name[0]}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium truncate">{contact.name}</h3>
                          <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                            {contact.lastMessage?.time || "Recently"}
                          </span>
                        </div>
                        {business && (
                          <p className="text-xs text-primary font-medium mb-1">{business.name}</p>
                        )}
                        <p className="text-sm text-muted-foreground truncate">
                          {contact.lastMessage?.text || "Start a conversation"}
                        </p>
                      </div>
                      
                      {contact.unread && contact.unread > 0 && (
                        <span className="bg-primary rounded-full h-5 w-5 flex items-center justify-center text-xs text-primary-foreground ml-3">
                          {contact.unread > 9 ? '9+' : contact.unread}
                        </span>
                      )}
                    </Link>
                  </motion.div>
                )
              })
            ) : (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-secondary/30 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium mb-2">No conversations found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm ? "Try a different search term" : "Browse startups to begin a conversation"}
                </p>
                <Button asChild>
                  <Link href="/search">Browse Startups</Link>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

