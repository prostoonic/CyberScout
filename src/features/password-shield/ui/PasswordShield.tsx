'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input, Button, Icon, SuccessModal, LevelIntroModal } from '@/shared/ui'
import { useUserStore } from '@/entities/user'
import { usePasswordValidation } from '../model/usePasswordValidation'
import { ChecklistItem } from './ChecklistItem'
import { PasswordStrengthBar } from './PasswordStrengthBar'
import styles from './password-shield.module.scss'
import introStyles from './intro-content.module.scss'

const LEVEL_ID = 1

function Level1IntroContent() {
  return (
    <div className={introStyles.content}>
      <p className={introStyles.lead}>
        Пароль — это защита твоего аккаунта. Если пароль простой, злоумышленники
        могут легко его подобрать и получить доступ к твоим данным, играм и
        личной информации. Сложный пароль делает твой аккаунт безопаснее и
        защищает от взлома.
      </p>

      <h3 className={introStyles.listTitle}>Чек-лист хорошего пароля:</h3>
      <ul className={introStyles.list}>
        <li>Минимум 8 символов</li>
        <li>Есть заглавная буква (A–Z)</li>
        <li>Есть строчная буква (a–z)</li>
        <li>Есть цифра (0–9)</li>
        <li>Есть специальный символ (!@#$%^&*)</li>
        <li>Не содержит личную информацию (имя, дата рождения)</li>
        <li>Уникальный, не используется на других сайтах</li>
      </ul>

      <div className={introStyles.example}>
        <span className={introStyles.exampleLabel}>
          Пример хорошего пароля:
        </span>
        <code className={introStyles.exampleCode}>G4m3!Hero#2026</code>
      </div>
    </div>
  )
}

export function PasswordShield() {
  const router = useRouter()
  const completeLevel = useUserStore(s => s.completeLevel)
  const [showIntro, setShowIntro] = useState(true)
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
      {showIntro && (
        <LevelIntroModal
          levelNumber={1}
          levelTitle="Надёжный пароль"
          onStart={() => setShowIntro(false)}
        >
          <Level1IntroContent />
        </LevelIntroModal>
      )}

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
              onSubmit={e => {
                e.preventDefault()
                handleSubmit()
              }}
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
                  {checklist.map(rule => (
                    <ChecklistItem
                      key={rule.id}
                      label={rule.label}
                      met={rule.met}
                    />
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
        <SuccessModal
          onClose={handleModalClose}
          description="Отличная работа! Ты создал надёжный пароль и знаешь, как защитить свой аккаунт. Продолжай своё кибер-приключение!"
        />
      )}
    </>
  )
}
