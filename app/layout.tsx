import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import ThemeProvider from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Mani Kumar M K - Full Stack Developer & AI Engineer",
  description:
    "Portfolio of Mani Kumar M K - Computer Science Engineering student specializing in Full Stack Development, Machine Learning, and AI applications.",
  keywords: "Full Stack Developer, Machine Learning, AI, React, Node.js, Python, Portfolio",
  authors: [{ name: "Mani Kumar M K" }],
  openGraph: {
    title: "Mani Kumar M K - Full Stack Developer & AI Engineer",
    description: "Portfolio showcasing expertise in Full Stack Development, Machine Learning, and AI applications.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
