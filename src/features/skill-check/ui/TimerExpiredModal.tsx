'use client'

import styles from './timer-expired-modal.module.scss'
import { useBodyScrollLock } from '@/shared/lib/useBodyScrollLock'

interface IProps {
  onRestart: () => void
}

export function TimerExpiredModal({ onRestart }: IProps) {
  useBodyScrollLock()

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="timer-expired-title"
    >
      <div className={styles.modal}>
        <div className={styles.iconWrapper} aria-hidden="true">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="32" fill="#FFF8E1" />
            <circle cx="32" cy="32" r="22" stroke="#F9A825" strokeWidth="3" fill="none" />
            <path
              d="M32 20V33L39 40"
              stroke="#F9A825"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h2 id="timer-expired-title" className={styles.title}>
          Время вышло!
        </h2>
        <p className={styles.description}>
          Ты не успел набрать 10 очков за 30 секунд. Не расстраивайся — попробуй ещё раз!
        </p>

        <button className={styles.button} onClick={onRestart} type="button">
          Попробовать снова
        </button>
      </div>
    </div>
  )
}
