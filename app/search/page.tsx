"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { businesses, industries, investmentRanges } from "@/lib/data"
import { Search, MessageSquare, TrendingUp, Award, Clock } from "lucide-react"
import Link from "next/link"

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries")
  const [selectedInvestmentRange, setSelectedInvestmentRange] = useState("Any Amount")
  const [filteredBusinesses, setFilteredBusinesses] = useState(businesses)

  useEffect(() => {
    const filtered = businesses.filter((business) => {
      // Filter by search term
      const matchesSearch =
        business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.description.toLowerCase().includes(searchTerm.toLowerCase())

      // Filter by industry
      const matchesIndustry = selectedIndustry === "All Industries" || business.industry === selectedIndustry

      // Filter by investment range
      const range = investmentRanges.find((r) => r.label === selectedInvestmentRange)
      const matchesInvestment =
        range && business.investmentNeeded >= range.min && business.investmentNeeded <= range.max

      return matchesSearch && matchesIndustry && matchesInvestment
    })

    setFilteredBusinesses(filtered)
  }, [searchTerm, selectedIndustry, selectedInvestmentRange])

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2 text-primary">Startup Dealflow</h1>
        <p className="text-muted-foreground mb-6">Discover and connect with high-potential startups ready for investment</p>

        <div className="grid gap-6 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by startup name or description..."
                className="pl-10 bg-secondary border-border"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger className="border-border bg-secondary">
                <SelectValue placeholder="Select Industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select value={selectedInvestmentRange} onValueChange={setSelectedInvestmentRange}>
              <SelectTrigger className="border-border bg-secondary">
                <SelectValue placeholder="Investment Amount" />
              </SelectTrigger>
              <SelectContent>
                {investmentRanges.map((range) => (
                  <SelectItem key={range.label} value={range.label}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filteredBusinesses.map((business, index) => (
            <motion.div
              key={business.id}
              className="bg-card rounded-lg border border-border shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(129, 44, 255, 0.15)" }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-secondary flex items-center justify-center">
                      <img
                        src={business.founderImage || "/placeholder.svg"}
                        alt={business.founderName}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{business.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {business.founderName} • {business.location}
                      </p>
                    </div>
                  </div>
                  {Math.random() > 0.5 ? (
                    <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" /> Hot
                    </span>
                  ) : Math.random() > 0.5 ? (
                    <span className="bg-secondary text-muted-foreground text-xs px-2 py-1 rounded-full flex items-center">
                      <Award className="h-3 w-3 mr-1" /> Featured
                    </span>
                  ) : (
                    <span className="bg-secondary text-muted-foreground text-xs px-2 py-1 rounded-full flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> New
                    </span>
                  )}
                </div>

                <div className="space-y-3 mb-4">
                  <p className="text-sm">{business.description}</p>

                  <div className="flex flex-wrap gap-2">
                    <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                      {business.industry}
                    </span>
                    <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
                      ${business.investmentNeeded.toLocaleString()}
                    </span>
                    <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
                      {business.equity}% Equity
                    </span>
                  </div>

                  <div className="bg-secondary p-3 rounded-md">
                    <Label className="text-xs font-medium">Seeking:</Label>
                    <p className="text-sm mt-1">{business.demands}</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button asChild variant="outline" size="sm" className="gap-2 border-primary/30 hover:border-primary/80">
                    <Link href={`/chat/${business.id}`}>
                      <MessageSquare className="h-4 w-4" />
                      Negotiate Deal
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredBusinesses.length === 0 && (
          <motion.div className="col-span-full text-center py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="text-xl font-medium mb-2">No matches found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

