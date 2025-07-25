import { create } from 'zustand';
import { subscribeWithSelector, persist } from 'zustand/middleware';

export const usePortfolioStore = create()(
  persist(
    subscribeWithSelector((set) => ({
      currentSection: 'hero',
      isLoading: true,
      theme: 'dark',
      mousePosition: { x: 0, y: 0 },
      isInteracting: false,
      setCurrentSection: (section) => set({ currentSection: section }),
      setLoading: (loading) => set({ isLoading: loading }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
      setMousePosition: (position) => set({ mousePosition: position }),
      setInteracting: (interacting) => set({ isInteracting: interacting }),
    })),
    {
      name: 'portfolio-storage',
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
);