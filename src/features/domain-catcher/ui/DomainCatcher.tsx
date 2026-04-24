'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  SuccessModal,
  LevelIntroModal,
  GameOverModal,
  HeartsDisplay,
} from '@/shared/ui'
import { useUserStore, MAX_LIVES } from '@/entities/user'
import { useDomainCatcher } from '../model/useDomainCatcher'
import { DomainCard } from './DomainCard'
import { DomainErrorModal } from './DomainErrorModal'
import styles from './domain-catcher.module.scss'
import introStyles from './intro-content.module.scss'

const LEVEL_ID = 3

function Level3IntroContent() {
  return (
    <div className={introStyles.content}>
      <p className={introStyles.lead}>
        Домен — это адрес сайта в интернете. Мошенники создают поддельные сайты
        с адресами, очень похожими на настоящие, чтобы украсть твои данные.
      </p>

      <h3 className={introStyles.listTitle}>
        Как мошенники подделывают домены:
      </h3>
      <ul className={introStyles.list}>
        <li>Заменяют буквы на похожие цифры (o→0, l→1, i→1)</li>
        <li>Добавляют лишние слова: secure, login, verify, free, official</li>
        <li>Используют неправильную доменную зону (.com вместо .ru)</li>
        <li>Добавляют дополнительные слова перед или после настоящего имени</li>
      </ul>

      <div className={introStyles.tip}>
        <p className={introStyles.tipText}>
          Всегда проверяй адрес сайта в строке браузера перед тем, как вводить
          пароль или личные данные!
        </p>
      </div>
    </div>
  )
}

export function DomainCatcher() {
  const router = useRouter()
  const completeLevel = useUserStore(s => s.completeLevel)
  const addMistake = useUserStore(s => s.addMistake)
  const clearMistakes = useUserStore(s => s.clearMistakes)
  const [lives, setLives] = useState(MAX_LIVES)
  const [showLevelFailed, setShowLevelFailed] = useState(false)
  const [showIntro, setShowIntro] = useState(true)

  const {
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
  } = useDomainCatcher()

  function handleErrorDismiss() {
    if (errorInfo) {
      const phishingDomain = errorInfo.round.domains.find(d => d.isPhishing)
      addMistake(`Пропустил фишинговый домен: ${phishingDomain?.value ?? ''}`)
    }
    dismissError()
    const newLives = lives - 1
    setLives(Math.max(0, newLives))
    if (newLives <= 0) {
      setShowLevelFailed(true)
    }
  }

  function handleRetry() {
    clearMistakes()
    router.replace('/levels')
  }

  function handleSuccessClose() {
    completeLevel(LEVEL_ID)
    setShowSuccess(false)
    router.replace('/levels')
  }

  return (
    <>
      {showLevelFailed && <GameOverModal onRetry={handleRetry} />}

      {showIntro && (
        <LevelIntroModal
          levelNumber={3}
          levelTitle="Охота на фальшивые домены"
          onStart={() => setShowIntro(false)}
        >
          <Level3IntroContent />
        </LevelIntroModal>
      )}

      <main className={styles.main}>
        <div className={styles.container}>
          <header className={styles.pageHeader}>
            <div className={styles.levelBadge} aria-label="Уровень 3">
              03
            </div>
            <div>
              <h1 className={styles.levelTitle}>Охота на фальшивые домены</h1>
              <p className={styles.levelSubtitle}>
                Найди фишинговый сайт среди четырёх адресов
              </p>
            </div>
            <HeartsDisplay lives={lives} maxLives={MAX_LIVES} />
          </header>

          <div
            className={styles.roundProgress}
            role="status"
            aria-live="polite"
          >
            {Array.from({ length: totalRounds }).map((_, i) => (
              <div
                key={i}
                className={
                  i < roundIndex
                    ? styles.roundDotDone
                    : i === roundIndex
                      ? styles.roundDotActive
                      : styles.roundDotEmpty
                }
                aria-label={
                  i < roundIndex
                    ? `Раунд ${i + 1} пройден`
                    : i === roundIndex
                      ? `Раунд ${i + 1} текущий`
                      : `Раунд ${i + 1} заблокирован`
                }
              />
            ))}
            <span className={styles.roundLabel}>
              Раунд {roundIndex + 1} из {totalRounds}
            </span>
          </div>

          <section className={styles.card} aria-labelledby="round-question">
            <h2 id="round-question" className={styles.question}>
              {currentRound.question}
            </h2>

            <ul
              className={styles.domainGrid}
              role="list"
              aria-label="Выбери фишинговый домен"
            >
              {currentRound.domains.map(domain => (
                <li key={domain.id} role="listitem">
                  <DomainCard
                    value={domain.value}
                    isSelected={selectedDomainId === domain.id}
                    isCorrect={
                      roundResult === 'correct' &&
                      selectedDomainId === domain.id
                        ? true
                        : undefined
                    }
                    onSelect={() => setSelectedDomainId(domain.id)}
                    disabled={roundResult !== null}
                  />
                </li>
              ))}
            </ul>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.checkButton}
                onClick={checkAnswer}
                disabled={!canCheck}
                aria-label="Проверить выбранный домен"
              >
                Проверить
              </button>
            </div>
          </section>
        </div>
      </main>

      {showError && errorInfo && (
        <DomainErrorModal errorInfo={errorInfo} onClose={handleErrorDismiss} />
      )}

      {showSuccess && (
        <SuccessModal
          onClose={handleSuccessClose}
          description="Невероятно! Ты распознал все поддельные домены и теперь умеешь защититься от фишинговых сайтов. Продолжай своё кибер-приключение!"
        />
      )}
    </>
  )
}
