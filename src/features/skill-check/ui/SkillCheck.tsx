'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import { LevelIntroModal, SuccessModal } from '@/shared/ui'
import { useUserStore } from '@/entities/user'
import { useSkillCheck } from '../model/useSkillCheck'
import { TimerExpiredModal } from './TimerExpiredModal'
import styles from './skill-check.module.scss'
import introStyles from './intro-content.module.scss'

const LEVEL_ID = 6
const TOTAL_TIME = 30

function SkillCheckIntroContent() {
  return (
    <div className={introStyles.content}>
      <p className={introStyles.lead}>
        Финальный уровень! Покажи всё, чему научился. Перед тобой будут появляться
        ситуации из прошлых уровней — определи, безопасна каждая из них или нет.
      </p>

      <div className={introStyles.statsRow}>
        <div className={introStyles.stat}>
          <span className={introStyles.statValue}>10</span>
          <span className={introStyles.statLabel}>Очков для победы</span>
        </div>
        <div className={introStyles.stat}>
          <span className={introStyles.statValue}>90</span>
          <span className={introStyles.statLabel}>Секунд на всё</span>
        </div>
        <div className={introStyles.stat}>
          <span className={introStyles.statValue}>+1</span>
          <span className={introStyles.statLabel}>Очко за верный ответ</span>
        </div>
      </div>

      <ul className={introStyles.rulesList}>
        <li className={introStyles.rulesItem}>Появляется ситуация — ты выбираешь «Безопасно» или «Опасно»</li>
        <li className={introStyles.rulesItem}>Темы: пароли, фишинг, домены, 2FA, мессенджеры, Wi-Fi, разрешения</li>
        <li className={introStyles.rulesItem}>Если таймер истечёт — уровень начнётся заново и спишется жизнь</li>
      </ul>

      <p className={introStyles.mainRule}>
        Главное правило: если есть сомнение — это, скорее всего, опасно.
      </p>
    </div>
  )
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

const TARGET_SCORE = 10

export function SkillCheck() {
  const router = useRouter()
  const completeLevel = useUserStore((s) => s.completeLevel)
  const loseLife = useUserStore((s) => s.loseLife)
  const addMistake = useUserStore((s) => s.addMistake)

  const { phase, score, timeLeft, current, lastVerdict, start, answer, restart } =
    useSkillCheck()

  const timePercent = (timeLeft / TOTAL_TIME) * 100
  const isTimeLow = timeLeft <= 10

  function handleAnswer(verdict: 'safe' | 'danger') {
    if (!current) return
    if (verdict !== current.verdict) {
      loseLife()
      addMistake(`${current.topic}: ${current.type}`)
    }
    answer(verdict)
  }

  function handleTimeoutRestart() {
    loseLife()
    start()
  }

  function handleWonClose() {
    router.replace('/victory')
  }

  useEffect(() => {
    if (phase === 'won') {
      completeLevel(LEVEL_ID)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  return (
    <>
      {phase === 'idle' && (
        <LevelIntroModal levelNumber={6} levelTitle="Финальное испытание" onStart={start}>
          <SkillCheckIntroContent />
        </LevelIntroModal>
      )}

      {phase === 'timeout' && <TimerExpiredModal onRestart={handleTimeoutRestart} />}

      {phase === 'won' && (
        <SuccessModal
          onClose={handleWonClose}
          title="Ты — Кибер Герой!"
          description="Великолепно! Ты успешно прошёл все испытания и доказал, что умеешь распознавать угрозы в сети."
          buttonLabel="Получить паспорт героя"
        />
      )}

      <main className={styles.main}>
        <div className={styles.container}>
          <header className={styles.pageHeader}>
            <div className={styles.levelBadge} aria-label="Уровень 6">
              <span className={styles.levelNumber}>06</span>
            </div>
            <div>
              <h1 className={styles.title}>Финальное испытание</h1>
              <p className={styles.subtitle}>Безопасно или Опасно?</p>
            </div>
          </header>

          <div className={styles.statsBar}>
            <div className={styles.scoreDisplay} aria-label={`Счёт: ${score} из ${TARGET_SCORE}`}>
              <span className={styles.scoreLabel}>Счёт</span>
              <span className={styles.scoreValue}>{score} / {TARGET_SCORE}</span>
              <div className={styles.scoreTrack} role="progressbar" aria-valuenow={score} aria-valuemax={TARGET_SCORE}>
                <div
                  className={styles.scoreFill}
                  style={{ width: `${(score / TARGET_SCORE) * 100}%` }}
                />
              </div>
            </div>

            <div
              className={clsx(styles.timer, { [styles.timerLow]: isTimeLow })}
              aria-label={`Оставшееся время: ${formatTime(timeLeft)}`}
              aria-live="off"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M9 5V9.5L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{formatTime(timeLeft)}</span>
              <div className={styles.timerTrack}>
                <div
                  className={styles.timerFill}
                  style={{ width: `${timePercent}%` }}
                />
              </div>
            </div>
          </div>

          {phase === 'playing' && current && (
            <section
              className={clsx(styles.situationCard, {
                [styles.cardCorrect]: lastVerdict === 'correct',
                [styles.cardWrong]: lastVerdict === 'wrong',
              })}
              aria-labelledby="situation-topic"
              aria-live="polite"
            >
              <div className={styles.topicRow}>
                <span className={styles.topicLabel} id="situation-topic">{current.topic}</span>
                <span className={styles.typeLabel}>{current.type}</span>
              </div>

              <div className={styles.contentBlock}>
                <p className={styles.contentText}>{current.content}</p>
              </div>

              {lastVerdict && (
                <div
                  className={clsx(styles.verdictFeedback, {
                    [styles.verdictCorrect]: lastVerdict === 'correct',
                    [styles.verdictWrong]: lastVerdict === 'wrong',
                  })}
                  aria-live="assertive"
                >
                  {lastVerdict === 'correct' ? '✓ Правильно!' : '✗ Неверно!'}
                </div>
              )}

              <div className={styles.choiceButtons}>
                <button
                  className={styles.safeButton}
                  onClick={() => handleAnswer('safe')}
                  type="button"
                  aria-label="Безопасная ситуация"
                  disabled={lastVerdict !== null}
                >
                  <span className={styles.buttonIcon} aria-hidden="true">✓</span>
                  Безопасно
                </button>
                <button
                  className={styles.dangerButton}
                  onClick={() => handleAnswer('danger')}
                  type="button"
                  aria-label="Опасная ситуация"
                  disabled={lastVerdict !== null}
                >
                  <span className={styles.buttonIcon} aria-hidden="true">⚠</span>
                  Опасно
                </button>
              </div>
            </section>
          )}

          {phase === 'idle' && (
            <div className={styles.waitingState} aria-hidden="true">
              <p className={styles.waitingText}>Прочитай инструкцию и начни испытание</p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
