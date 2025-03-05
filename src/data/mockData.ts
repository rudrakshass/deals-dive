export const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Real Estate",
  "Food & Beverage",
  "Entertainment",
  "Retail",
  "Travel",
  "Manufacturing",
]

export const investmentRanges = [
  { min: 10000, max: 50000, label: "$10K - $50K" },
  { min: 50000, max: 100000, label: "$50K - $100K" },
  { min: 100000, max: 500000, label: "$100K - $500K" },
  { min: 500000, max: 1000000, label: "$500K - $1M" },
  { min: 1000000, max: 5000000, label: "$1M - $5M" },
  { min: 5000000, max: Number.POSITIVE_INFINITY, label: "$5M+" },
]

export const mockBusinesses = [
  {
    id: "1",
    name: "EcoClean Solutions",
    description: "Biodegradable cleaning products that are tough on dirt but gentle on the planet.",
    demands: "$250,000 for 15% equity",
    industry: "Manufacturing",
    investmentNeeded: 250000,
    founder: "Sarah Johnson",
    logo: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "2",
    name: "FitTrack",
    description: "AI-powered fitness app that creates personalized workout and nutrition plans.",
    demands: "$500,000 for 10% equity",
    industry: "Technology",
    investmentNeeded: 500000,
    founder: "Mike Chen",
    logo: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "3",
    name: "MindfulMeals",
    description: "Subscription meal service for busy professionals with dietary restrictions.",
    demands: "$150,000 for 20% equity",
    industry: "Food & Beverage",
    investmentNeeded: 150000,
    founder: "Emma Brown",
    logo: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "4",
    name: "TravelBuddy",
    description: "Platform connecting solo travelers with compatible travel companions.",
    demands: "$350,000 for 15% equity",
    industry: "Travel",
    investmentNeeded: 350000,
    founder: "Daniel Smith",
    logo: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "5",
    name: "MediConnect",
    description: "Telemedicine platform specializing in mental health services.",
    demands: "$750,000 for 8% equity",
    industry: "Healthcare",
    investmentNeeded: 750000,
    founder: "Dr. Jessica Lee",
    logo: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "6",
    name: "EdTech Innovators",
    description: "Interactive educational platform using VR for immersive learning experiences.",
    demands: "$1,200,000 for 12% equity",
    industry: "Education",
    investmentNeeded: 1200000,
    founder: "Professor Robert Taylor",
    logo: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "7",
    name: "FinWise",
    description: "Personal finance app with AI-driven investment recommendations.",
    demands: "$600,000 for 7% equity",
    industry: "Finance",
    investmentNeeded: 600000,
    founder: "Alex Morgan",
    logo: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "8",
    name: "PropertyPulse",
    description: "Smart home management system for landlords and property managers.",
    demands: "$800,000 for 10% equity",
    industry: "Real Estate",
    investmentNeeded: 800000,
    founder: "Rachel Green",
    logo: "/placeholder.svg?height=80&width=80",
  },
]

export const mockChats = {
  "1": [
    {
      id: "1",
      sender: "investor",
      message:
        "Hello, I'm interested in your EcoClean Solutions. Can you tell me more about your manufacturing process?",
      timestamp: "2023-04-10T14:22:30Z",
    },
    {
      id: "2",
      sender: "business",
      message:
        "Hi there! Our manufacturing process uses 100% renewable energy and our ingredients are all naturally derived.",
      timestamp: "2023-04-10T14:25:12Z",
    },
    {
      id: "3",
      sender: "investor",
      message: "That sounds promising. What's your current distribution like?",
      timestamp: "2023-04-10T14:28:45Z",
    },
    {
      id: "4",
      sender: "business",
      message: "We're currently in 50 stores across 3 states and have an e-commerce platform that ships nationwide.",
      timestamp: "2023-04-10T14:30:20Z",
    },
  ],
  "2": [
    {
      id: "1",
      sender: "investor",
      message: "Hi Mike, I'm impressed with FitTrack's growth. What sets your AI apart from competitors?",
      timestamp: "2023-04-11T09:15:30Z",
    },
    {
      id: "2",
      sender: "business",
      message:
        "Thanks for your interest! Our AI uses a proprietary algorithm that adapts in real-time based on user performance and feedback.",
      timestamp: "2023-04-11T09:18:22Z",
    },
    {
      id: "3",
      sender: "investor",
      message: "How many active users do you currently have?",
      timestamp: "2023-04-11T09:20:45Z",
    },
    {
      id: "4",
      sender: "business",
      message: "We have 75,000 active monthly users with a 85% retention rate after 3 months.",
      timestamp: "2023-04-11T09:23:10Z",
    },
  ],
}

export const mockContacts = [
  {
    id: "1",
    name: "Sarah Johnson",
    business: "EcoClean Solutions",
    lastMessage: "Our manufacturing process uses 100% renewable energy...",
    unread: 0,
  },
  {
    id: "2",
    name: "Mike Chen",
    business: "FitTrack",
    lastMessage: "We have 75,000 active monthly users with a 85% retention rate...",
    unread: 2,
  },
  {
    id: "3",
    name: "Emma Brown",
    business: "MindfulMeals",
    lastMessage: "Looking forward to discussing potential investment.",
    unread: 1,
  },
  {
    id: "4",
    name: "Daniel Smith",
    business: "TravelBuddy",
    lastMessage: "Thanks for your interest in our platform!",
    unread: 0,
  },
]

export const mockAgreements = {
  "1": {
    businessId: "1",
    businessName: "EcoClean Solutions",
    amount: 250000,
    time: 36, // months
    interest: 7.5, // percentage
    equity: 15,
    status: "pending",
  },
  "2": {
    businessId: "2",
    businessName: "FitTrack",
    amount: 500000,
    time: 48,
    interest: 6.5,
    equity: 10,
    status: "signed",
  },
}

