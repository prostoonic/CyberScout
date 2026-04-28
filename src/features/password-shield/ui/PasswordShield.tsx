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
        Пароль — это защита твоего аккаунта. Если пароль простой, злоумышленники
        могут легко его подобрать и получить доступ к твоим данным, играм и
        личной информации. Сложный пароль делает твой аккаунт безопаснее и
        защищает от взлома.
    </p>

    <h3 className={introStyles.listTitle}>Чек-лист хорошего пароля:</h3>
    <ul className={introStyles.list}>
        <li>Минимум 8 символов</li>
        <li>Есть заглавная буква (A–Z)</li>
        <li>Есть строчная буква (a–z)</li>
        <li>Есть цифра (0–9)</li>
        <li>Есть специальный символ (! @#$%^&*)</li>
        <li>Не содержит личную информацию (имя, дата рождения)</li>
        <li>Уникальный, не используется на других сайтах</li>
    </ul>

    <div className={introStyles.example}>
        <span className={introStyles.exampleLabel}>
            Пример хорошего пароля:
        </span>
        <code className={introStyles.exampleCode}>bNuyA7!KDNigTr4</code>
    </div>
</div>
  )
}

function Part2IntroContent() {
  return (
    <div className={introStyles.content}>
    <p className={introStyles.lead}>
        Придумывать пароль вручную сложно. Но у твоего браузера есть встроенный
        генератор паролей — он создаёт длинные случайные пароли, которые почти
        невозможно взломать!
    </p>

    <h3 className={introStyles.listTitle}>Как использовать генератор:</h3>
    <ol className={introStyles.list} style={{ listStyle: 'decimal' }}>
        <li>Нажми на поле «Пароль» на следующем экране</li>
        <li>Браузер покажет иконку ключа 🔑 или всплывающее предложение</li>
        <li>
            Выбери «Предложить надёжный пароль» (или «Suggest Strong Password»)
        </li>
        <li>Прими сгенерированный пароль</li>
        <li>Введи его повторно в поле подтверждения</li>
    </ol>

    <div className={introStyles.example}>
        <span className={introStyles.exampleLabel}>
            Совет: сохрани пароль в менеджере паролей браузера
        </span>
    </div>
</div>
  )
}

export function PasswordShield() {
  const router = useRouter()
  const completeLevel = useUserStore(s => s.completeLevel)

  const [showIntro, setShowIntro] = useState(true)
  const [part, setPart] = useState<1 | 2>(1)
  const [showPart2Intro, setShowPart2Intro] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const part1 = usePasswordValidation()
  const part2 = usePasswordValidation()

  function handlePart1Submit() {
    if (!part1.canSubmit) return
    setShowPart2Intro(true)
  }

  function handlePart2IntroStart() {
    setShowPart2Intro(false)
    setPart(2)
  }

  function handlePart2Submit() {
    if (!part2.canSubmit) return
    completeLevel(LEVEL_ID)
    setShowModal(true)
  }

  function handleModalClose() {
    setShowModal(false)
    router.replace('/levels')
  }

  const isPartOne = part === 1
  const active = isPartOne ? part1 : part2

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

      {showPart2Intro && (
        <LevelIntroModal
          levelNumber={1}
          levelTitle="Генератор паролей"
          badgeLabel="Часть 2 из 2"
          buttonLabel="Начать часть 2"
          introIcon="KeyIcon"
          onStart={handlePart2IntroStart}
        >
          <Part2IntroContent />
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
                {isPartOne
                  ? 'Создай пароль, который не взломают хакеры!'
                  : 'Теперь используй генератор паролей браузера'}
              </p>
            </div>
          </header>

          <div className={styles.stepIndicator} aria-label="Прогресс уровня">
            <div
              className={`${styles.step} ${!isPartOne || true ? styles.stepActive : ''}`}
              aria-current={isPartOne ? 'step' : undefined}
            >
              <span className={styles.stepDot} />
              <span className={styles.stepLabel}>Придумай пароль</span>
            </div>
            <div className={styles.stepConnector} />
            <div
              className={`${styles.step} ${!isPartOne ? styles.stepActive : styles.stepPending}`}
              aria-current={!isPartOne ? 'step' : undefined}
            >
              <span className={styles.stepDot} />
              <span className={styles.stepLabel}>Сгенерируй пароль</span>
            </div>
          </div>

          <section className={styles.card} aria-labelledby="form-heading">
            <h2 id="form-heading" className={styles.sectionTitle}>
              {isPartOne ? 'Придумай пароль' : 'Сгенерируй пароль'}
            </h2>

            {!isPartOne && (
              <div className={styles.generatorHint} role="note">
                <p className={styles.generatorHintText}>
    Нажми на поле ниже — браузер предложит создать надёжный
    пароль. Выбери «Предложить надёжный пароль» и прими его.
</p>
              </div>
            )}

            <form
              key={part}
              className={styles.form}
              autoComplete={isPartOne ? 'off' : 'on'}
              onSubmit={e => {
                e.preventDefault()
                if (isPartOne) {
                  handlePart1Submit()
                } else {
                  handlePart2Submit()
                }
              }}
              noValidate
            >
              <Input
                id={isPartOne ? 'password' : 'gen-password'}
                name={isPartOne ? 'password' : 'new-password'}
                type="password"
                placeholder={
                  isPartOne
                    ? 'Введи пароль...'
                    : 'Нажми сюда и выбери предложение браузера'
                }
                label="Пароль"
                value={active.password}
                onChange={e => active.setPassword(e.target.value)}
                hasError={active.passwordMismatch}
                showToggle
                autoComplete={isPartOne ? 'off' : 'new-password'}
              />

              <Input
                id={isPartOne ? 'confirm-password' : 'gen-confirm-password'}
                name={isPartOne ? 'confirm-password' : 'confirm-new-password'}
                type="password"
                placeholder="Повтори пароль..."
                label="Подтверди пароль"
                value={active.confirmPassword}
                onChange={e => active.setConfirmPassword(e.target.value)}
                error={active.confirmError}
                onBlur={() => active.setConfirmTouched(true)}
                showToggle
                autoComplete={isPartOne ? 'off' : 'new-password'}
              />

              <PasswordStrengthBar
                percent={active.strengthPercent}
                label={active.strengthLabel}
                level={active.strengthLevel}
              />

              <div className={styles.checklistBlock}>
                <h3 className={styles.checklistTitle}>Требования к паролю</h3>
                <ul className={styles.checklist} role="list">
                  {active.checklist.map(rule => (
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
                onClick={isPartOne ? handlePart1Submit : handlePart2Submit}
                isDisable={!active.canSubmit}
              >
                <span>
                  {isPartOne ? 'Перейти к части 2' : 'Завершить уровень'}
                </span>
                <Icon icon={isPartOne ? 'ShieldIcon' : 'RocketIcon'} />
              </Button>
            </form>
          </section>
        </div>
      </main>

      {showModal && (
        <SuccessModal
          onClose={handleModalClose}
          description="Отличная работа! Ты создал надёжный пароль вручную и с помощью генератора. Теперь ты знаешь оба способа защитить свой аккаунт!"
        />
      )}
    </>
  )
}
