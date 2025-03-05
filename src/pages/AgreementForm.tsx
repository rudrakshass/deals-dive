"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Check, ChevronLeft, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { mockBusinesses, mockAgreements } from "@/data/mockData"
import { useToast } from "@/components/ui/use-toast"

const AgreementForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const business = mockBusinesses.find((b) => b.id === id)

  // Check if there's an existing agreement for this business
  const existingAgreement = id && mockAgreements[id as keyof typeof mockAgreements]

  const [amount, setAmount] = useState(existingAgreement?.amount || 100000)
  const [time, setTime] = useState(existingAgreement?.time || 36)
  const [interest, setInterest] = useState(existingAgreement?.interest || 5.0)
  const [equity, setEquity] = useState(existingAgreement?.equity || 10)

  if (!business) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Business Not Found</h2>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Show success toast
    toast({
      title: "Agreement created!",
      description: "The agreement has been sent to the business owner for review.",
      action: (
        <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
          <Check className="h-5 w-5 text-white" />
        </div>
      ),
    })

    // Navigate to payment page
    navigate(`/payment/${id}`)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value)
  }

  const calculateMonthlyPayment = () => {
    const rate = interest / 100 / 12
    const monthlyPayment = (amount * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1)
    return formatCurrency(monthlyPayment)
  }

  const calculateTotalReturn = () => {
    const monthlyPayment =
      (amount * (interest / 100 / 12) * Math.pow(1 + interest / 100 / 12, time)) /
      (Math.pow(1 + interest / 100 / 12, time) - 1)
    const totalReturn = monthlyPayment * time
    return formatCurrency(totalReturn)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold mb-2">Create Investment Agreement</h1>
        <p className="text-slate-600 dark:text-slate-400">Define the terms of your investment in {business.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div className="md:col-span-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle>Investment Terms</CardTitle>
              <CardDescription>Customize the investment amount, terms, interest rate, and equity</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label htmlFor="amount">Investment Amount</Label>
                      <span className="text-sm font-semibold">{formatCurrency(amount)}</span>
                    </div>
                    <Slider
                      id="amount"
                      min={10000}
                      max={2000000}
                      step={10000}
                      value={[amount]}
                      onValueChange={(value) => setAmount(value[0])}
                      className="mb-6"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>$10K</span>
                      <span>$2M</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <Label htmlFor="time">Payback Period</Label>
                      <span className="text-sm font-semibold">{time} months</span>
                    </div>
                    <Slider
                      id="time"
                      min={12}
                      max={60}
                      step={6}
                      value={[time]}
                      onValueChange={(value) => setTime(value[0])}
                      className="mb-6"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>12 months</span>
                      <span>60 months</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <Label htmlFor="interest">Interest Rate</Label>
                      <span className="text-sm font-semibold">{interest.toFixed(1)}%</span>
                    </div>
                    <Slider
                      id="interest"
                      min={2.5}
                      max={15}
                      step={0.5}
                      value={[interest]}
                      onValueChange={(value) => setInterest(value[0])}
                      className="mb-6"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>2.5%</span>
                      <span>15%</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <Label htmlFor="equity" className="mr-1">
                          Equity Percentage
                        </Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-3.5 w-3.5 text-slate-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                Percentage of company ownership you receive in exchange for your investment
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <span className="text-sm font-semibold">{equity}%</span>
                    </div>
                    <Slider
                      id="equity"
                      min={1}
                      max={49}
                      step={1}
                      value={[equity]}
                      onValueChange={(value) => setEquity(value[0])}
                      className="mb-6"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>1%</span>
                      <span>49%</span>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader>
              <CardTitle>Investment Summary</CardTitle>
              <CardDescription>Review your investment details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-500">Business</span>
                    <span className="font-medium">{business.name}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-500">Industry</span>
                    <span>{business.industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">Founder</span>
                    <span>{business.founder}</span>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Investment Amount</span>
                    <span className="font-medium">{formatCurrency(amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Term Length</span>
                    <span>{time} months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Interest Rate</span>
                    <span>{interest.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Equity Stake</span>
                    <span>{equity}%</span>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Monthly Payment</span>
                    <span className="font-medium">{calculateMonthlyPayment()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Total Return</span>
                    <span className="font-medium">{calculateTotalReturn()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleSubmit}>
                Create Agreement & Proceed
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default AgreementForm

