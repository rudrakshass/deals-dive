"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ModeToggle } from "./ui/mode-toggle"

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-600"
            >
              <path d="M22 12.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2v-1.5" />
              <path d="M22 7H9" />
              <path d="M8 7v7" />
              <path d="M18 15v6" />
              <path d="M18 9v4" />
              <path d="m15 12 3 3 3-3" />
            </svg>
            <span className="text-xl font-bold">Deals Dive</span>
          </Link>
        </motion.div>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex space-x-4">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Search
            </Link>
            <Link to="/chat" className="hover:text-blue-600 transition-colors">
              Messages
            </Link>
          </nav>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

export default Navbar

