import { useEffect } from "react"
import { usePortfolioStore } from "../lib/store"

export default function ThemeProvider({ children }) {
  const { theme } = usePortfolioStore()

  useEffect(() => {
    const root = document.documentElement
    root.className = `theme-${theme}`
  }, [theme])

  return <>{children}</>
}