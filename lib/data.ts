// Mock data for the application

// Existing business type
export type Business = {
  id: string
  name: string
  description: string
  demands: string
  industry: string
  investmentNeeded: number
  equity: number
  location: string
  founderName: string
  founderImage: string
  // Additional fields for chat functionality
  logo?: string
  founded?: number
  funding?: string
}

// Existing contact type
export type Contact = {
  id: string
  name: string
  avatar: string
  lastMessage?: {
    text: string
    time: string
    timestamp: number
    isRead: boolean
    sender: "user" | "contact"
  }
  timestamp?: string
  unread?: number
  businessId?: string
  // Additional fields for chat display
  role?: string
  email?: string
}

export type Message = {
  id: string
  senderId: string
  text: string
  timestamp: string
  isUser: boolean
}

// Preserve the existing businesses array but enhance it with needed fields
export const businesses: Business[] = [
  {
    id: "b1",
    name: "EcoPackage",
    description:
      "Biodegradable packaging solutions for e-commerce businesses that reduce environmental impact while maintaining durability and protection.",
    demands: "Looking for $250,000 for 15% equity to scale production and expand distribution channels.",
    industry: "Sustainability",
    investmentNeeded: 250000,
    equity: 15,
    location: "Portland, OR",
    founderName: "Sarah Johnson",
    founderImage: "/placeholder.svg?height=100&width=100",
    logo: "/logos/ecopackage.svg",
    founded: 2020,
    funding: "$50K"
  },
  {
    id: "b2",
    name: "HealthTrack AI",
    description:
      "AI-powered health monitoring platform that predicts potential health issues before they become serious using wearable data.",
    demands: "Seeking $500,000 for 10% equity to enhance AI algorithms and obtain medical certifications.",
    industry: "Healthcare",
    investmentNeeded: 500000,
    equity: 10,
    location: "Boston, MA",
    founderName: "Michael Chen",
    founderImage: "/placeholder.svg?height=100&width=100",
    logo: "/logos/healthtrack.svg",
    founded: 2021,
    funding: "$120K"
  },
  {
    id: "b3",
    name: "UrbanFarm",
    description:
      "Vertical farming technology for urban environments that uses 95% less water and produces 40% more yield than traditional farming.",
    demands: "Need $750,000 for 12% equity to build demonstration farms in major cities.",
    industry: "Agriculture",
    investmentNeeded: 750000,
    equity: 12,
    location: "Chicago, IL",
    founderName: "Jessica Rodriguez",
    founderImage: "/placeholder.svg?height=100&width=100",
    logo: "/logos/urbanfarm.svg",
    founded: 2019,
    funding: "$200K"
  },
  {
    id: "b4",
    name: "CyberShield",
    description:
      "Next-generation cybersecurity platform that uses behavioral analysis to detect and prevent attacks before they happen.",
    demands: "Looking for $1M for 8% equity to expand engineering team and accelerate product development.",
    industry: "Technology",
    investmentNeeded: 1000000,
    equity: 8,
    location: "Austin, TX",
    founderName: "David Park",
    founderImage: "/placeholder.svg?height=100&width=100",
    logo: "/logos/cybershield.svg",
    founded: 2020,
    funding: "$300K"
  },
  {
    id: "b5",
    name: "EduVR",
    description: "Virtual reality educational platform that makes learning immersive and engaging for K-12 students.",
    demands: "Seeking $350,000 for 15% equity to develop more educational content and partner with schools.",
    industry: "Education",
    investmentNeeded: 350000,
    equity: 15,
    location: "San Francisco, CA",
    founderName: "Aisha Williams",
    founderImage: "/placeholder.svg?height=100&width=100",
    logo: "/logos/eduvr.svg",
    founded: 2021,
    funding: "$80K"
  },
  {
    id: "b6",
    name: "DeliveryBot",
    description:
      "Autonomous delivery robots for last-mile delivery in urban areas, reducing costs and carbon emissions.",
    demands: "Need $1.2M for 10% equity to finalize robot design and conduct city pilots.",
    industry: "Robotics",
    investmentNeeded: 1200000,
    equity: 10,
    location: "Seattle, WA",
    founderName: "Robert Garcia",
    founderImage: "/placeholder.svg?height=100&width=100",
    logo: "/logos/deliverybot.svg",
    founded: 2020,
    funding: "$400K"
  },
  {
    id: "b7",
    name: "SolarRoof",
    description:
      "Affordable solar roof tiles that look like traditional roofing materials but generate electricity for homes.",
    demands: "Looking for $800,000 for 12% equity to optimize manufacturing process and reduce costs.",
    industry: "Energy",
    investmentNeeded: 800000,
    equity: 12,
    location: "Denver, CO",
    founderName: "Emma Thompson",
    founderImage: "/placeholder.svg?height=100&width=100",
    logo: "/logos/solarroof.svg",
    founded: 2018,
    funding: "$250K"
  },
  {
    id: "b8",
    name: "FoodConnect",
    description:
      "Platform connecting local farmers directly with restaurants and consumers, eliminating middlemen and reducing food waste.",
    demands: "Seeking $300,000 for 15% equity to expand to more cities and improve logistics.",
    industry: "Food",
    investmentNeeded: 300000,
    equity: 15,
    location: "Nashville, TN",
    founderName: "Marcus Johnson",
    founderImage: "/placeholder.svg?height=100&width=100",
    logo: "/logos/foodconnect.svg",
    founded: 2019,
    funding: "$100K"
  },
]

// Update contacts with enhanced data for chat functionality while preserving existing structure
export const contacts = [
  {
    id: "c1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "CEO & Founder",
    businessId: "b1",
    email: "sarah@ecopackage.com",
    unread: 3,
    lastMessage: {
      text: "I'm interested in discussing the terms further.",
      time: "10:30 AM",
      timestamp: Date.now() - 1800000, // 30 min ago
      isRead: false,
      sender: "contact"
    }
  },
  {
    id: "c2",
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "CEO & Co-founder",
    businessId: "b2",
    email: "michael@healthtrackai.com",
    unread: 0,
    lastMessage: {
      text: "Can we schedule a demo of your product?",
      time: "Yesterday",
      timestamp: Date.now() - 86400000, // 24 hours ago
      isRead: true,
      sender: "contact"
    }
  },
  {
    id: "c3",
    name: "Jessica Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "CEO",
    businessId: "b3",
    email: "jessica@urbanfarm.io",
    unread: 2,
    lastMessage: {
      text: "I've sent you the updated business plan.",
      time: "Yesterday",
      timestamp: Date.now() - 90000000, // ~25 hours ago
      isRead: false,
      sender: "contact"
    }
  },
  {
    id: "c4",
    name: "David Park",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "CTO & Co-founder",
    businessId: "b4",
    email: "david@cybershield.tech",
    unread: 0,
    lastMessage: {
      text: "Let's finalize the agreement next week.",
      time: "Monday",
      timestamp: Date.now() - 259200000, // 3 days ago
      isRead: true,
      sender: "user"
    }
  },
  {
    id: "c5",
    name: "Aisha Williams",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "CEO & Founder",
    businessId: "b5",
    email: "aisha@eduvr.edu",
    unread: 0,
    lastMessage: {
      text: "Thank you for your interest in EduVR.",
      time: "Sunday",
      timestamp: Date.now() - 345600000, // 4 days ago
      isRead: true,
      sender: "contact"
    }
  },
]

export const messages: Record<string, Message[]> = {
  c1: [
    {
      id: "m1",
      senderId: "c1",
      text: "Hello! I saw your interest in EcoPackage. Do you have any questions about our business?",
      timestamp: "10:00 AM",
      isUser: false,
    },
    {
      id: "m2",
      senderId: "user",
      text: "Hi Sarah, yes I'm very interested in your sustainable packaging solution. Could you tell me more about your production capacity?",
      timestamp: "10:15 AM",
      isUser: true,
    },
    {
      id: "m3",
      senderId: "c1",
      text: "Currently, we can produce 50,000 units per month, but with the investment we're seeking, we could scale to 200,000 units monthly within 6 months.",
      timestamp: "10:20 AM",
      isUser: false,
    },
    {
      id: "m4",
      senderId: "user",
      text: "That sounds promising. What about your current clients and revenue?",
      timestamp: "10:25 AM",
      isUser: true,
    },
    {
      id: "m5",
      senderId: "c1",
      text: "We have 15 e-commerce businesses as clients, generating $30,000 monthly revenue with 40% margins. We're growing at about 15% month-over-month.",
      timestamp: "10:30 AM",
      isUser: false,
    },
  ],
  c2: [
    {
      id: "m1",
      senderId: "c2",
      text: "Thanks for reaching out about HealthTrack AI. Would you like to see a demo of our platform?",
      timestamp: "Yesterday, 2:00 PM",
      isUser: false,
    },
    {
      id: "m2",
      senderId: "user",
      text: "I would love to see a demo. I'm particularly interested in how your AI predicts potential health issues.",
      timestamp: "Yesterday, 2:30 PM",
      isUser: true,
    },
    {
      id: "m3",
      senderId: "c2",
      text: "Great! I can schedule a virtual demo for tomorrow at 10 AM. Our AI analyzes patterns from wearable data and compares them to our database of health conditions to make predictions.",
      timestamp: "Yesterday, 3:00 PM",
      isUser: false,
    },
    {
      id: "m4",
      senderId: "user",
      text: "Tomorrow at 10 AM works for me. Also, can you share some information about your team's background?",
      timestamp: "Yesterday, 3:15 PM",
      isUser: true,
    },
    {
      id: "m5",
      senderId: "c2",
      text: "Perfect, I'll send a calendar invite. Our team includes two AI researchers from MIT, a medical doctor specializing in preventive medicine, and myself with a background in health tech startups.",
      timestamp: "Yesterday, 3:30 PM",
      isUser: false,
    },
  ],
}

export const industries = [
  "All Industries",
  "Technology",
  "Healthcare",
  "Education",
  "Finance",
  "Sustainability",
  "Food",
  "Energy",
  "Agriculture",
  "Robotics",
]

export const investmentRanges = [
  { label: "Any Amount", min: 0, max: Number.POSITIVE_INFINITY },
  { label: "Under $100K", min: 0, max: 100000 },
  { label: "$100K - $500K", min: 100000, max: 500000 },
  { label: "$500K - $1M", min: 500000, max: 1000000 },
  { label: "Over $1M", min: 1000000, max: Number.POSITIVE_INFINITY },
]

