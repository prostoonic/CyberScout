import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { LEVELS } from '@/entities/level'

const MAX_LIVES = 3

interface UserState {
  username: string
  progress: number
  completedLevels: number[]
  selectedAvatarId: number | null
  lives: number
  mistakes: string[]

  setUsername: (name: string) => void
  setAvatarId: (id: number) => void
  completeLevel: (levelId: number) => void
  loseLife: () => void
  resetLives: () => void
  startGame: (username: string, avatarId: number) => void
  retryAfterGameOver: () => void
  addMistake: (text: string) => void
  clearMistakes: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      username: '',
      progress: 0,
      completedLevels: [],
      selectedAvatarId: null,
      lives: MAX_LIVES,
      mistakes: [],

      setUsername: (name) => set({ username: name }),

      setAvatarId: (id) => set({ selectedAvatarId: id }),

      completeLevel: (levelId) =>
        set((state) => {
          if (state.completedLevels.includes(levelId)) return state
          const completed = [...state.completedLevels, levelId]
          const progress = Math.round((completed.length / LEVELS.length) * 100)
          return { completedLevels: completed, progress }
        }),

      loseLife: () =>
        set((state) => ({
          lives: Math.max(0, state.lives - 1),
        })),

      resetLives: () => set({ lives: MAX_LIVES }),

      startGame: (username, avatarId) =>
        set({ username, selectedAvatarId: avatarId, lives: MAX_LIVES }),

      retryAfterGameOver: () =>
        set({ lives: MAX_LIVES, mistakes: [] }),

      addMistake: (text) =>
        set((state) => ({
          mistakes: [...state.mistakes, text],
        })),

      clearMistakes: () => set({ mistakes: [] }),
    }),
    { name: 'cyberscout-user' }
  )
)

export { MAX_LIVES }
