"use client"

import { Link } from "react-router-dom"
import { Search, MessageSquare, User } from 'lucide-react';
import { motion } from "framer-motion"
import { ModeToggle } from "./ui/mode-toggle"
import { Button } from './ui/button';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="container mx-auto flex h-16 items-center gap-4 px-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="font-bold text-xl">
            DealsDive
          </Link>
        </div>
        
        <div className="ml-auto flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/chat">
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Navbar

