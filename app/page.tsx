"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Anchor, DollarSign, Search, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="py-20">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="flex justify-center mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <div className="p-4 rounded-full bg-primary/10">
              <Anchor className="h-12 w-12 text-primary" />
            </div>
          </motion.div>
          
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-violet-400 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            DealsDive
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Elite startup investment platform where visionary founders meet strategic capital.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <Button asChild size="lg" className="group bg-primary hover:bg-primary/90">
              <Link href="/search">
                Browse Startups <Search className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="group border-primary/20 hover:border-primary/50">
              <Link href="/search">
                Pitch to Investors <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-primary">The DealsDive Advantage</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform removes the friction from startup funding, creating a direct pipeline between elite founders and strategic investors
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            className="bg-card p-6 rounded-lg shadow-sm border border-border"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(129, 44, 255, 0.2)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Vetted Startups</h3>
            <p className="text-muted-foreground">
              Every startup on DealsDive passes our rigorous due diligence process to ensure quality investment opportunities.
            </p>
          </motion.div>

          <motion.div
            className="bg-card p-6 rounded-lg shadow-sm border border-border"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(129, 44, 255, 0.2)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Term Sheets</h3>
            <p className="text-muted-foreground">
              Our automated term sheet generation streamlines negotiations and gets deals done faster with less friction.
            </p>
          </motion.div>

          <motion.div
            className="bg-card p-6 rounded-lg shadow-sm border border-border"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(129, 44, 255, 0.2)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Advanced Matching</h3>
            <p className="text-muted-foreground">
              Our proprietary algorithm matches startups with investors based on industry expertise and investment thesis.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 text-center">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-primary">Ready to Make Waves?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join the elite network of founders and investors shaping the future of innovation.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/search">Explore Opportunities</Link>
          </Button>
        </motion.div>
      </section>
    </div>
  )
}

