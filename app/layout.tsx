// The root layout wraps every page. It loads our fonts and the global stylesheet.
// We'll add the site header/footer here later in the video once we've built them.
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"

// Geist (sans) for text and Geist Mono for code. Exposed as CSS variables
// so Tailwind can reference them via font-sans / font-mono.
const fontSans = Geist({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

// Basic metadata shown in the browser tab and search results.
export const metadata: Metadata = {
  title: "Modern Portfolio — Starter",
  description: "Starter project for the modern portfolio build-along tutorial.",
}

type RootLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "font-sans antialiased",
        fontSans.variable,
        fontMono.variable
      )}
    >
      <body>
        
        <SiteHeader />
        {children}</body>
    </html>
  )
}
