"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Filter, Search, MessageSquare } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { industries, mockBusinesses } from "@/data/mockData"

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("")
  const [investmentRange, setInvestmentRange] = useState([0, 5000000])
  const [filteredBusinesses, setFilteredBusinesses] = useState(mockBusinesses)

  // Filter businesses based on search term, industry, and investment range
  useEffect(() => {
    const filtered = mockBusinesses.filter((business) => {
      const matchesSearch =
        business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesIndustry = selectedIndustry === "" || business.industry === selectedIndustry
      const matchesInvestment =
        business.investmentNeeded >= investmentRange[0] && business.investmentNeeded <= investmentRange[1]

      return matchesSearch && matchesIndustry && matchesInvestment
    })

    setFilteredBusinesses(filtered)
  }, [searchTerm, selectedIndustry, investmentRange])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Your Next Big Investment</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Browse through innovative business ideas looking for investors like you.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="Search for business ideas..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Options</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Industry</h3>
                  <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Industries</SelectItem>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Investment Amount</h3>
                  <div className="pt-6 px-2">
                    <Slider defaultValue={[0, 5000000]} max={5000000} step={50000} onValueChange={setInvestmentRange} />
                    <div className="flex justify-between mt-2 text-sm text-slate-500">
                      <span>${(investmentRange[0] / 1000).toFixed(0)}K</span>
                      <span>${(investmentRange[1] / 1000).toFixed(0)}K+</span>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {filteredBusinesses.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredBusinesses.map((business) => (
            <motion.div key={business.id} variants={item}>
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-start space-x-4 pb-2">
                  <img
                    src={business.logo || "/placeholder.svg"}
                    alt={business.name}
                    className="rounded-full w-12 h-12 object-cover"
                  />
                  <div>
                    <CardTitle>{business.name}</CardTitle>
                    <CardDescription>
                      {business.industry} • {business.founder}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{business.description}</p>
                  <div className="mt-4 inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                    Seeking: {business.demands}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link to={`/chat/${business.id}`}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Chat with Founder
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h3 className="text-xl font-semibold mb-2">No results found</h3>
            <p className="text-slate-600 dark:text-slate-400">Try adjusting your search or filter criteria</p>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default SearchPage

