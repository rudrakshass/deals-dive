"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { businesses, contacts } from "@/lib/data"
import { useParams, useRouter } from "next/navigation"
import { Check, ChevronLeft } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export default function AgreementPage() {
  const params = useParams()
  const router = useRouter()
  const id = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : ''

  const [amount, setAmount] = useState("")
  const [time, setTime] = useState("6 months")
  const [interest, setInterest] = useState("5%")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Find the contact and business based on the ID
  const contact = contacts.find((c) => c.id === id || c.businessId === id)
  const business = businesses.find((b) => b.id === id || b.id === contact?.businessId)

  // Handle amount input change with validation
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow numbers and commas
    if (/^[0-9,]*$/.test(value) || value === '') {
      setAmount(value)
      setError(null)
    }
  }

  const validateForm = (): boolean => {
    if (!amount || amount === '0') {
      setError("Please enter a valid investment amount")
      return false
    }
    
    // Remove commas and convert to number
    const numericAmount = Number(amount.replace(/,/g, ''))
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError("Please enter a valid investment amount")
      return false
    }
    
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    setError(null)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Redirect to payment page after a short delay
      setTimeout(() => {
        const numericAmount = amount.replace(/,/g, '')
        router.push(`/payment/${id}?amount=${numericAmount}`)
      }, 1500)
    }, 1500)
  }

  if (!business || !contact) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Business or contact not found</p>
        <Button asChild variant="outline" className="mt-4">
          <a href="/search">Back to Search</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Button variant="ghost" size="sm" className="mb-6" onClick={() => router.back()}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="bg-card border rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-6">Investment Agreement</h1>

          <div className="mb-6 p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full overflow-hidden bg-background">
                <img
                  src={contact.avatar || "/placeholder.svg"}
                  alt={contact.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">{business.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {contact.name} • {business.location}
                </p>
              </div>
            </div>

            <p className="text-sm mb-2">{business.description}</p>
            <p className="text-sm font-medium">Original Ask: {business.demands}</p>
          </div>

          {isSuccess ? (
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Agreement Created!</h3>
              <p className="text-muted-foreground mb-4">Redirecting to payment...</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="amount">Investment Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="amount"
                      placeholder="100,000"
                      className="pl-8"
                      value={amount}
                      onChange={handleAmountChange}
                      required
                    />
                  </div>
                  {error && <p className="text-sm text-destructive">{error}</p>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="time">Investment Period</Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger id="time">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3 months">3 months</SelectItem>
                      <SelectItem value="6 months">6 months</SelectItem>
                      <SelectItem value="1 year">1 year</SelectItem>
                      <SelectItem value="2 years">2 years</SelectItem>
                      <SelectItem value="5 years">5 years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="interest">Interest Rate</Label>
                  <Select value={interest} onValueChange={setInterest}>
                    <SelectTrigger id="interest">
                      <SelectValue placeholder="Select interest rate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0%">0%</SelectItem>
                      <SelectItem value="2%">2%</SelectItem>
                      <SelectItem value="5%">5%</SelectItem>
                      <SelectItem value="7%">7%</SelectItem>
                      <SelectItem value="10%">10%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Creating Agreement..." : "Create Agreement"}
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  )
}

