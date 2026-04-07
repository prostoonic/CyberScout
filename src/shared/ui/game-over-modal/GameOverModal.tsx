'use client'

import styles from './game-over-modal.module.scss'
import { useBodyScrollLock, useFocusTrap } from '@/shared/lib/useBodyScrollLock'

interface IProps {
  onRetry: () => void
}

export function GameOverModal({ onRetry }: IProps) {
  useBodyScrollLock()
  const modalRef = useFocusTrap<HTMLDivElement>()

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="gameover-title"
      aria-describedby="gameover-description"
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
          Сессия прервана системой.
        </h2>

        <div className={styles.storyBlock}>
          <p id="gameover-description" className={styles.storyText}>
            Зафиксировано критическое количество ошибок. Соединение разорвано в
            целях безопасности.
          </p>
          <p className={styles.question}>Инициализировать новую сессию?</p>
        </div>

        <button className={styles.retryButton} onClick={onRetry} type="button">
          Инициализировать
        </button>
      </div>
    </div>
  )
}
