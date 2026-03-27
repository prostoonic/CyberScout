'use client'

import { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'
import styles from './success-modal.module.scss'
import { Button } from '@/shared/ui'

interface IProps {
  onClose: () => void
  headerHeight?: number
}

export function SuccessModal({ onClose, headerHeight = 64 }: IProps) {
  const hasLaunched = useRef(false)

  useEffect(() => {
    if (hasLaunched.current) return
    hasLaunched.current = true

    const originY = headerHeight / window.innerHeight

    const duration = 4000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: originY },
        colors: ['#6e9fff', '#3d57a7', '#48ac34', '#ffcc00', '#ff6b6b'],
        gravity: 0.9,
        scalar: 0.9,
      })
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: originY },
        colors: ['#6e9fff', '#3d57a7', '#48ac34', '#ffcc00', '#ff6b6b'],
        gravity: 0.9,
        scalar: 0.9,
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    requestAnimationFrame(frame)
  }, [headerHeight])

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className={styles.modal}>
        <div className={styles.iconWrapper} aria-hidden="true">
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
            <circle cx="36" cy="36" r="36" fill="url(#gradient)" />
            <path
              d="M22 36L31 45L50 27"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="72" y2="72">
                <stop offset="0%" stopColor="#0057bd" />
                <stop offset="100%" stopColor="#6e9fff" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <h2 id="modal-title" className={styles.title}>
          Уровень пройден!
        </h2>
        <p className={styles.description}>
          Отличная работа! Ты создал надёжный пароль и знаешь, как защитить свой аккаунт.
          Продолжай своё кибер-приключение!
        </p>

        <div className={styles.badge} aria-label="Три звезды">
          {'★'.repeat(3)}
        </div>

        <Button variant="primary" onClick={onClose} isDisable={false}>
          Продолжить путешествие
        </Button>
      </div>
    </div>
  )
}
