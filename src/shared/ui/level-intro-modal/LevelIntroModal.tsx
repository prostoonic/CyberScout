'use client'

import { useEffect, ReactNode } from 'react'
import styles from './level-intro-modal.module.scss'
import { Button } from '../button/Button'
import { useBodyScrollLock, useFocusTrap } from '@/shared/lib/useBodyScrollLock'

interface IProps {
  levelNumber: number
  levelTitle: string
  onStart: () => void
  children: ReactNode
}

export function LevelIntroModal({ levelNumber, levelTitle, onStart, children }: IProps) {
  useBodyScrollLock()
  const modalRef = useFocusTrap<HTMLDivElement>()

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onStart()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onStart])

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="intro-modal-title">
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.topRow}>
          <span className={styles.levelBadge}>Уровень {levelNumber}</span>
        </div>

        <div className={styles.iconWrapper} aria-hidden="true">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="32" fill="url(#introGradient)" />
            <path
              d="M32 18V34M32 42V44"
              stroke="white"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="introGradient" x1="0" y1="0" x2="64" y2="64">
                <stop offset="0%" stopColor="#0057bd" />
                <stop offset="100%" stopColor="#6e9fff" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <h2 id="intro-modal-title" className={styles.title}>{levelTitle}</h2>

        <div className={styles.content}>{children}</div>

        <Button variant="primary" onClick={onStart} isDisable={false}>
          Начать уровень
        </Button>
      </div>
    </div>
  )
}
