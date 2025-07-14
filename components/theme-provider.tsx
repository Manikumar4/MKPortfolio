"use client"

import type React from "react"

import { useEffect } from "react"
import { usePortfolioStore } from "@/lib/store"

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = usePortfolioStore()

  useEffect(() => {
    const root = document.documentElement
    root.className = `theme-${theme}`
  }, [theme])

  return <>{children}</>
}
