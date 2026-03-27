import { useState } from 'react'
import { DOMAIN_ROUNDS, type DomainRound } from './domains'

export interface ErrorInfo {
  round: DomainRound
  selectedDomainValue: string
}

export function useDomainCatcher() {
  const [roundIndex, setRoundIndex] = useState(0)
  const [selectedDomainId, setSelectedDomainId] = useState<number | null>(null)
  const [showError, setShowError] = useState(false)
  const [errorInfo, setErrorInfo] = useState<ErrorInfo | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [roundResult, setRoundResult] = useState<'correct' | null>(null)

  const currentRound = DOMAIN_ROUNDS[roundIndex]
  const totalRounds = DOMAIN_ROUNDS.length
  const canCheck = selectedDomainId !== null && roundResult === null

  function checkAnswer() {
    if (selectedDomainId === null) return

    const selected = currentRound.domains.find((d) => d.id === selectedDomainId)
    if (!selected) return

    if (selected.isPhishing) {
      setRoundResult('correct')
      setTimeout(() => {
        setRoundResult(null)
        setSelectedDomainId(null)
        if (roundIndex + 1 >= totalRounds) {
          setShowSuccess(true)
        } else {
          setRoundIndex((i) => i + 1)
        }
      }, 900)
    } else {
      setErrorInfo({
        round: currentRound,
        selectedDomainValue: selected.value,
      })
      setShowError(true)
    }
  }

  function dismissError() {
    setShowError(false)
    setSelectedDomainId(null)
  }

  return {
    currentRound,
    roundIndex,
    totalRounds,
    selectedDomainId,
    setSelectedDomainId,
    canCheck,
    checkAnswer,
    roundResult,
    showError,
    errorInfo,
    dismissError,
    showSuccess,
    setShowSuccess,
  }
}
