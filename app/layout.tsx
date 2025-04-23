import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pathfinding Visualizer - SAJAL SWAPNIL",
  description: "A visualization tool for pathfinding algorithms",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="bookmark" content="SAJAL SWAPNIL" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
