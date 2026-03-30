import { useState, useCallback } from 'react'
import { CHATS, type Chat } from './chats'

export type ChatOutcome = 'good' | 'bad'

export interface ChatResult {
  chatId: number
  outcome: ChatOutcome
  selectedOptionId: 1 | 2
}

export interface ActiveChatState {
  chat: Chat
  selectedOptionId: 1 | 2 | null
  showResponse: boolean
  outcome: ChatOutcome | null
}

export function useMessengerTrap() {
  const [results, setResults] = useState<Record<number, ChatResult>>({})
  const [activeChatId, setActiveChatId] = useState<number | null>(null)
  const [activeState, setActiveState] = useState<ActiveChatState | null>(null)
  const [showError, setShowError] = useState(false)
  const [errorChat, setErrorChat] = useState<Chat | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const completedCount = Object.keys(results).length
  const allDone = completedCount === CHATS.length

  function openChat(chatId: number) {
    const chat = CHATS.find(c => c.id === chatId)
    if (!chat) return
    setActiveChatId(chatId)
    const existing = results[chatId]
    if (existing) {
      const outcome = existing.outcome
      setActiveState({
        chat,
        selectedOptionId: existing.selectedOptionId,
        showResponse: true,
        outcome,
      })
    } else {
      setActiveState({
        chat,
        selectedOptionId: null,
        showResponse: false,
        outcome: null,
      })
    }
  }

  function closeChat() {
    setActiveChatId(null)
    setActiveState(null)
  }

  const selectOption = useCallback(
    (optionId: 1 | 2) => {
      if (!activeState || activeState.selectedOptionId !== null) return
      const { chat } = activeState
      const outcome: ChatOutcome =
        optionId === chat.goodOptionId ? 'good' : 'bad'

      setActiveState(prev =>
        prev ? { ...prev, selectedOptionId: optionId } : prev
      )

      setTimeout(() => {
        setActiveState(prev =>
          prev ? { ...prev, showResponse: true, outcome } : prev
        )

        const result: ChatResult = {
          chatId: chat.id,
          outcome,
          selectedOptionId: optionId,
        }
        setResults(prev => ({ ...prev, [chat.id]: result }))

        if (outcome === 'bad') {
          setTimeout(() => {
            setErrorChat(chat)
            setShowError(true)
          }, 1000)
        } else {
          const newCount = Object.keys(results).length + 1
          if (newCount >= CHATS.length) {
            setTimeout(() => setShowSuccess(true), 800)
          }
        }
      }, 700)
    },
    [activeState, results]
  )

  function dismissError() {
    setShowError(false)
    setErrorChat(null)
    const newCount = Object.keys(results).length
    if (newCount >= CHATS.length) {
      setTimeout(() => setShowSuccess(true), 400)
    }
  }

  return {
    chats: CHATS,
    results,
    completedCount,
    allDone,
    activeChatId,
    activeState,
    openChat,
    closeChat,
    selectOption,
    showError,
    errorChat,
    dismissError,
    showSuccess,
    setShowSuccess,
  }
}
