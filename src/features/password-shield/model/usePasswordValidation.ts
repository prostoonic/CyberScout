import { useState, useMemo } from 'react'

export interface ChecklistRule {
  id: string
  label: string
  test: (password: string) => boolean
}

export const CHECKLIST_RULES: ChecklistRule[] = [
  {
    id: 'length',
    label: 'Минимум 8 символов',
    test: p => p.length >= 8,
  },
  {
    id: 'uppercase',
    label: 'Заглавная буква (A–Z)',
    test: p => /[A-Z]/.test(p),
  },
  {
    id: 'digit',
    label: 'Цифра (0–9)',
    test: p => /[0-9]/.test(p),
  },
  {
    id: 'special',
    label: 'Специальный символ (!@#$%^&*)',
    test: p => /[!@#$%^&*()\-_=+\[\]{};:'",.<>?/\\|`~]/.test(p),
  },
]

export type StrengthLevel = 'empty' | 'weak' | 'fair' | 'good' | 'strong'

const STRENGTH_LABELS: Record<StrengthLevel, string> = {
  empty: 'Введи пароль',
  weak: 'Слабый пароль',
  fair: 'Средний пароль',
  good: 'Хороший пароль',
  strong: 'Надёжный пароль!',
}

const STRENGTH_PERCENT: Record<StrengthLevel, number> = {
  empty: 0,
  weak: 25,
  fair: 50,
  good: 75,
  strong: 100,
}

function getStrengthLevel(metCount: number, password: string): StrengthLevel {
  if (password.length === 0) return 'empty'
  if (metCount === 1) return 'weak'
  if (metCount === 2) return 'fair'
  if (metCount === 3) return 'good'
  if (metCount === 4) return 'strong'
  return 'weak'
}

export function usePasswordValidation() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmTouched, setConfirmTouched] = useState(false)

  const checklist = useMemo(
    () =>
      CHECKLIST_RULES.map(rule => ({
        ...rule,
        met: rule.test(password),
      })),
    [password]
  )

  const metCount = checklist.filter(r => r.met).length
  const allMet = metCount === CHECKLIST_RULES.length

  const strengthLevel = getStrengthLevel(metCount, password)
  const strengthLabel = STRENGTH_LABELS[strengthLevel]
  const strengthPercent = STRENGTH_PERCENT[strengthLevel]

  const passwordsMatch = password === confirmPassword
  const showMismatch =
    confirmTouched && confirmPassword.length > 0 && !passwordsMatch

  const confirmError = showMismatch ? 'Пароли не совпадают' : ''
  const passwordMismatch = showMismatch

  const canSubmit = allMet && passwordsMatch && confirmPassword.length > 0

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    setConfirmTouched,
    checklist,
    allMet,
    strengthLevel,
    strengthLabel,
    strengthPercent,
    confirmError,
    passwordMismatch,
    canSubmit,
  }
}
