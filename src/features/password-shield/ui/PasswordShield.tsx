'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input, Button, Icon } from '@/shared/ui'
import { useUserStore } from '@/entities/user'
import { usePasswordValidation } from '../model/usePasswordValidation'
import { ChecklistItem } from './ChecklistItem'
import { PasswordStrengthBar } from './PasswordStrengthBar'
import { SuccessModal } from './SuccessModal'
import styles from './password-shield.module.scss'

const LEVEL_ID = 1

export function PasswordShield() {
  const router = useRouter()
  const completeLevel = useUserStore((s) => s.completeLevel)
  const [showModal, setShowModal] = useState(false)

  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    setConfirmTouched,
    checklist,
    strengthLevel,
    strengthLabel,
    strengthPercent,
    confirmError,
    passwordMismatch,
    canSubmit,
  } = usePasswordValidation()

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value)
  }

  function handleConfirmChange(e: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value)
  }

  function handleConfirmBlur() {
    setConfirmTouched(true)
  }

  function handleSubmit() {
    if (!canSubmit) return
    completeLevel(LEVEL_ID)
    setShowModal(true)
  }

  function handleModalClose() {
    setShowModal(false)
    router.replace('/levels')
  }

  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <header className={styles.pageHeader}>
            <div className={styles.levelBadge} aria-label="Уровень 1">
              <span className={styles.levelNumber}>01</span>
            </div>
            <div>
              <h1 className={styles.title}>Надёжный пароль</h1>
              <p className={styles.subtitle}>
                Создай пароль, который не взломают хакеры!
              </p>
            </div>
          </header>

          <section className={styles.card} aria-labelledby="form-heading">
            <h2 id="form-heading" className={styles.sectionTitle}>
              Придумай пароль
            </h2>

            <form
              className={styles.form}
              onSubmit={(e) => { e.preventDefault(); handleSubmit() }}
              noValidate
            >
              <Input
                id="password"
                type="password"
                placeholder="Введи пароль..."
                label="Пароль"
                value={password}
                onChange={handlePasswordChange}
                hasError={passwordMismatch}
                showToggle
              />

              <Input
                id="confirm-password"
                type="password"
                placeholder="Повтори пароль..."
                label="Подтверди пароль"
                value={confirmPassword}
                onChange={handleConfirmChange}
                error={confirmError}
                onBlur={handleConfirmBlur}
                showToggle
              />

              <PasswordStrengthBar
                percent={strengthPercent}
                label={strengthLabel}
                level={strengthLevel}
              />

              <div className={styles.checklistBlock}>
                <h3 className={styles.checklistTitle}>Требования к паролю</h3>
                <ul className={styles.checklist} role="list">
                  {checklist.map((rule) => (
                    <ChecklistItem key={rule.id} label={rule.label} met={rule.met} />
                  ))}
                </ul>
                <p className={styles.checklistTip}>
                  Выполни все требования, чтобы активировать кнопку
                </p>
              </div>

              <Button
                variant="primary"
                onClick={handleSubmit}
                isDisable={!canSubmit}
              >
                <span>Завершить уровень</span>
                <Icon icon="RocketIcon" />
              </Button>
            </form>
          </section>
        </div>
      </main>

      {showModal && (
        <SuccessModal onClose={handleModalClose} />
      )}
    </>
  )
}
