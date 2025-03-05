import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DealsDive | The Startup Investment Platform",
  description: "Connect with promising startups and secure funding from elite investors",
  generator: 'DealsDive'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-foreground`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
          <div className="container mx-auto">
            &copy; {new Date().getFullYear()} DealsDive - Elite Startup Investment Platform
          </div>
        </footer>
      </body>
    </html>
  )
}