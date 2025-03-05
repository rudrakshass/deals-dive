"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Menu, X, Anchor } from "lucide-react"
import { useState } from "react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b border-border sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link href="/" className="flex items-center gap-2">
              <Anchor className="h-6 w-6 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-violet-400 bg-clip-text text-transparent">
                DealsDive
              </span>
            </Link>
          </motion.div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/search" className="text-sm font-medium hover:text-primary transition-colors">
              Startups
            </Link>
            <Link href="/chat" className="text-sm font-medium hover:text-primary transition-colors">
              Messages
            </Link>
            <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
              <Link href="/search">Find Deals</Link>
            </Button>
          </nav>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden py-4 px-4 border-t border-border"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/search"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Startups
            </Link>
            <Link
              href="/chat"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Messages
            </Link>
            <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
              <Link href="/search" onClick={() => setIsMenuOpen(false)}>
                Find Deals
              </Link>
            </Button>
          </nav>
        </motion.div>
      )}
    </header>
  )
}

