'use client'

import styles from './game-over-modal.module.scss'
import { useBodyScrollLock, useFocusTrap } from '@/shared/lib/useBodyScrollLock'

interface IProps {
  onRetry: () => void
}

const CONSEQUENCES = [
  { icon: '💸', text: 'Со счёта списались деньги' },
  { icon: '📨', text: 'Друзьям отправлены странные сообщения' },
  { icon: '🔒', text: 'Потерян доступ к аккаунту' },
]

const MISTAKES = [
  'Ты передал код подтверждения',
  'Ты перешёл по подозрительной ссылке',
  'Ты доверился незнакомому отправителю',
]

export function GameOverModal({ onRetry }: IProps) {
  useBodyScrollLock()
  const modalRef = useFocusTrap<HTMLDivElement>()

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="gameover-title"
    >
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.iconWrapper} aria-hidden="true">
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
            <circle cx="36" cy="36" r="36" fill="#FFF0F0" />
            <path
              d="M36 18V38M36 48V52"
              stroke="#E53935"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h2 id="gameover-title" className={styles.title}>
          Ты был взломан!
        </h2>

        <div className={styles.storyBlock} aria-label="Что произошло">
          <p className={styles.storyText}>
            Твой аккаунт{' '}
            <span className={styles.highlight}>&quot;взломан&quot;</span>.
            Ты допустил несколько ошибок, и злоумышленники получили доступ к
            твоим данным.
          </p>

          <ul className={styles.consequences} role="list" aria-label="Последствия">
            {CONSEQUENCES.map((c) => (
              <li key={c.text} className={styles.consequenceItem}>
                <span aria-hidden="true">{c.icon}</span>
                <span>{c.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.mistakesBlock}>
          <p className={styles.mistakesTitle}>
            Разбор ошибок
          </p>
          <ul className={styles.mistakesList} role="list">
            {MISTAKES.map((m) => (
              <li key={m} className={styles.mistakeItem}>
                <span className={styles.mistakeIcon} aria-hidden="true">✗</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>

        <button className={styles.retryButton} onClick={onRetry} type="button">
          Попробовать ещё
        </button>
      </div>
    </div>
  )
}
