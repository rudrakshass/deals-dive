"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { businesses, contacts } from "@/lib/data"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { Check, ChevronLeft, CreditCard } from "lucide-react"

export default function PaymentPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const id = params?.id as string || ""
  const amountString = searchParams?.get("amount") || "100,000"
  const amount = parseFloat(amountString.replace(/,/g, ""))

  const [name, setName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Find the contact and business based on the ID
  const contact = contacts.find((c) => c.id === id || c.businessId === id)
  const business = businesses.find((b) => b.id === id || b.id === contact?.businessId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Redirect to search page after a short delay
      setTimeout(() => {
        router.push("/search")
      }, 3000)
    }, 2000)
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }

    return v
  }

  const validateCard = () => {
    const cardRegex = /^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/
    const cvvRegex = /^[0-9]{3}$/
    
    return cardRegex.test(cardNumber) && expiryRegex.test(expiryDate) && cvvRegex.test(cvv) && name.trim().length > 0
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
    <div className="container mx-auto px-4 py-8 max-w-md">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Button variant="ghost" size="sm" className="mb-6" onClick={() => router.back()}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="bg-card border rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-2">Payment</h1>
          <p className="text-muted-foreground mb-6">Complete your investment in {business.name}</p>

          <div className="mb-6 p-4 bg-primary/10 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Investment Amount</p>
            <p className="text-3xl font-bold text-primary">${amount.toLocaleString()}</p>
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
              <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
              <p className="text-muted-foreground mb-4">Your investment has been processed.</p>
              <p className="text-sm text-muted-foreground">Redirecting to search page...</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Cardholder Name</Label>
                  <Input
                    id="name"
                    placeholder="John Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="cardNumber"
                      placeholder="4242 4242 4242 4242"
                      className="pl-10"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      maxLength={19}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                      maxLength={5}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ""))}
                      maxLength={3}
                      required
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting || !validateCard()}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      `Pay $${amount.toLocaleString()}`
                    )}
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

