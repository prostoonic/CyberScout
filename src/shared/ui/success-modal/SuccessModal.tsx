'use client'

import { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'
import styles from './success-modal.module.scss'
import { Button } from '../button/Button'

interface IProps {
  onClose: () => void
  title?: string
  description?: string
  buttonLabel?: string
  headerHeight?: number
}

export function SuccessModal({
  onClose,
  title = 'Уровень пройден!',
  description = 'Отличная работа! Продолжай своё кибер-приключение!',
  buttonLabel = 'Продолжить путешествие',
  headerHeight = 64,
}: IProps) {
  const hasLaunched = useRef(false)

  useEffect(() => {
    if (hasLaunched.current) return
    hasLaunched.current = true

    const originY = headerHeight / window.innerHeight
    const end = Date.now() + 4000

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
      if (Date.now() < end) requestAnimationFrame(frame)
    }

    requestAnimationFrame(frame)
  }, [headerHeight])

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="success-modal-title">
      <div className={styles.modal}>
        <div className={styles.iconWrapper} aria-hidden="true">
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
            <circle cx="36" cy="36" r="36" fill="url(#successGradient)" />
            <path
              d="M22 36L31 45L50 27"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="successGradient" x1="0" y1="0" x2="72" y2="72">
                <stop offset="0%" stopColor="#0057bd" />
                <stop offset="100%" stopColor="#6e9fff" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <h2 id="success-modal-title" className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>

        <Button variant="primary" onClick={onClose} isDisable={false}>
          {buttonLabel}
        </Button>
      </div>
    </div>
  )
}
