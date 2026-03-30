import { useState } from 'react'
import { EMAILS, type Email } from './emails'

export type EmailAnswer = 'phishing' | 'legit'

export interface AnswerResult {
  emailId: number
  answer: EmailAnswer
  isCorrect: boolean
}

export interface ErrorInfo {
  email: Email
  userAnswer: EmailAnswer
}

export function usePhishingCatcher() {
  const [selectedId, setSelectedId] = useState<number>(EMAILS[0].id)
  const [answers, setAnswers] = useState<Record<number, AnswerResult>>({})
  const [showError, setShowError] = useState(false)
  const [errorInfo, setErrorInfo] = useState<ErrorInfo | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const selectedEmail = EMAILS.find(e => e.id === selectedId) ?? EMAILS[0]
  const answeredCount = Object.keys(answers).length
  const isCurrentAnswered = selectedId in answers

  function submitAnswer(answer: EmailAnswer) {
    if (isCurrentAnswered) return

    const email = selectedEmail
    const isCorrect =
      (answer === 'phishing' && email.isPhishing) ||
      (answer === 'legit' && !email.isPhishing)

    const result: AnswerResult = { emailId: email.id, answer, isCorrect }
    const newAnswers = { ...answers, [email.id]: result }
    setAnswers(newAnswers)

    if (!isCorrect) {
      setErrorInfo({ email, userAnswer: answer })
      setShowError(true)
      return
    }

    advanceAfterAnswer(newAnswers)
  }

  function advanceAfterAnswer(currentAnswers: Record<number, AnswerResult>) {
    const totalAnswered = Object.keys(currentAnswers).length
    if (totalAnswered >= EMAILS.length) {
      setShowSuccess(true)
      return
    }
    const nextEmail = EMAILS.find(e => !(e.id in currentAnswers))
    if (nextEmail) setSelectedId(nextEmail.id)
  }

  function dismissError() {
    setShowError(false)
    advanceAfterAnswer(answers)
  }

  return {
    emails: EMAILS,
    selectedEmail,
    selectedId,
    setSelectedId,
    answers,
    answeredCount,
    isCurrentAnswered,
    submitAnswer,
    showError,
    errorInfo,
    dismissError,
    showSuccess,
    setShowSuccess,
  }
}
