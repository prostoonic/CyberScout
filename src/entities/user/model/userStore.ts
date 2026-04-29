import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { LEVELS } from '@/entities/level'

export const MAX_LIVES = 3

interface UserState {
  username: string
  progress: number
  completedLevels: number[]
  selectedAvatarId: number | null
  mistakes: string[]

  setUsername: (name: string) => void
  setAvatarId: (id: number) => void
  completeLevel: (levelId: number) => void
  startGame: (username: string, avatarId: number) => void
  addMistake: (text: string) => void
  clearMistakes: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      username: '',
      progress: 0,
      completedLevels: [],
      selectedAvatarId: null,
      mistakes: [],

      setUsername: name => set({ username: name }),

      setAvatarId: id => set({ selectedAvatarId: id }),

      completeLevel: levelId =>
        set(state => {
          if (state.completedLevels.includes(levelId)) return state
          const completed = [...state.completedLevels, levelId]
          const progress = Math.round((completed.length / LEVELS.length) * 100)
          return { completedLevels: completed, progress }
        }),

      startGame: (username, avatarId) =>
        set({
          username,
          selectedAvatarId: avatarId,
          progress: 0,
          completedLevels: [],
          mistakes: [],
        }),

      addMistake: text =>
        set(state => ({
          mistakes: [...state.mistakes, text],
        })),

      clearMistakes: () => set({ mistakes: [] }),
    }),
    { name: 'cyberscout-user' }
  )
)
