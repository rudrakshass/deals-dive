"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/Navbar"
import SearchPage from "@/pages/SearchPage"
import ChatPage from "@/pages/ChatPage"
import AgreementForm from "@/pages/AgreementForm"
import PaymentPage from "@/pages/PaymentPage"
import { motion } from "framer-motion"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Navbar />
        </motion.div>
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/chat/:id?" element={<ChatPage />} />
            <Route path="/agreement/:id" element={<AgreementForm />} />
            <Route path="/payment/:id" element={<PaymentPage />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </Router>
  )
}

export default App

