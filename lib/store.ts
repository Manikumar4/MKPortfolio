import { create } from "zustand"
import { subscribeWithSelector, persist } from "zustand/middleware"

interface PortfolioState {
  currentSection: string
  isLoading: boolean
  theme: "light" | "dark"
  hasError: boolean
  mousePosition: { x: number; y: number }
  isInteracting: boolean
  setCurrentSection: (section: string) => void
  setLoading: (loading: boolean) => void
  toggleTheme: () => void
  setError: (error: boolean) => void
  setMousePosition: (position: { x: number; y: number }) => void
  setInteracting: (interacting: boolean) => void
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    subscribeWithSelector((set) => ({
      currentSection: "hero",
      isLoading: true,
      theme: "dark",
      hasError: false,
      mousePosition: { x: 0, y: 0 },
      isInteracting: false,
      setCurrentSection: (section) => set({ currentSection: section }),
      setLoading: (loading) => set({ isLoading: loading }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
      setError: (error) => set({ hasError: error }),
      setMousePosition: (position) => set({ mousePosition: position }),
      setInteracting: (interacting) => set({ isInteracting: interacting }),
    })),
    {
      name: "portfolio-storage",
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
)
