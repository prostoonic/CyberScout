'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import confetti from 'canvas-confetti'
import { useUserStore } from '@/entities/user'
import { AVATARS } from '@/entities/avatar/model/avatars'
import styles from './victory-page.module.scss'

const ACHIEVEMENTS = [
  { icon: '🔐', title: 'Мастер паролей', desc: 'Умеет создавать надёжные пароли' },
  { icon: '🎣', title: 'Антифишинг', desc: 'Распознаёт мошеннические письма' },
  { icon: '🌐', title: 'Детектив доменов', desc: 'Выявляет поддельные сайты' },
  { icon: '💬', title: 'Щит мессенджера', desc: 'Не ведётся на скам-сообщения' },
  { icon: '🛡️', title: 'Страж разрешений', desc: 'Контролирует доступ приложений' },
  { icon: '🏆', title: 'Кибер Герой', desc: 'Прошёл финальное испытание' },
]

function getCurrentDate(): string {
  return new Date().toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function VictoryPage() {
  const username = useUserStore((s) => s.username)
  const selectedAvatarId = useUserStore((s) => s.selectedAvatarId)
  const hasLaunched = useRef(false)

  const avatarSrc =
    AVATARS.find((a) => a.id === selectedAvatarId)?.image ?? '/avatars/Avatar1.svg'

  useEffect(() => {
    if (hasLaunched.current) return
    hasLaunched.current = true

    const duration = 6000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 8,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.4 },
        colors: ['#6e9fff', '#0057bd', '#48ac34', '#ffcc00', '#ff6b6b', '#9c27b0'],
        gravity: 0.85,
        scalar: 1.1,
      })
      confetti({
        particleCount: 8,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.4 },
        colors: ['#6e9fff', '#0057bd', '#48ac34', '#ffcc00', '#ff6b6b', '#9c27b0'],
        gravity: 0.85,
        scalar: 1.1,
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    }

    requestAnimationFrame(frame)
  }, [])

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.badge} aria-hidden="true">
          <span className={styles.badgeText}>Финал пройден</span>
        </div>

        <h1 className={styles.heading}>
          Поздравляем,{' '}
          <span className={styles.username}>{username || 'Герой'}</span>!
        </h1>
        <p className={styles.subtitle}>
          Ты прошёл все уровни CyberScout и доказал, что умеешь защищать себя в цифровом мире.
        </p>

        <article className={styles.passport} aria-label="Паспорт кибер-героя">
          <div className={styles.passportHeader}>
            <div className={styles.passportStripe} aria-hidden="true" />
            <div className={styles.passportTitleRow}>
              <div className={styles.passportIconWrapper} aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="14" fill="white" fillOpacity="0.2" />
                  <path
                    d="M14 6L17 11H22L18 14.5L19.5 20L14 17L8.5 20L10 14.5L6 11H11L14 6Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div>
                <p className={styles.passportPreTitle}>CyberScout</p>
                <h2 className={styles.passportTitle}>Паспорт Кибер-Героя</h2>
              </div>
            </div>
          </div>

          <div className={styles.passportBody}>
            <div className={styles.holderSection}>
              <div className={styles.avatarWrapper}>
                <Image
                  src={avatarSrc}
                  alt={`Аватар игрока ${username || 'Герой'}`}
                  width={80}
                  height={80}
                  className={styles.avatar}
                />
                <div className={styles.avatarBadge} aria-hidden="true">🏆</div>
              </div>
              <div className={styles.holderInfo}>
                <dl className={styles.infoList}>
                  <div className={styles.infoRow}>
                    <dt className={styles.infoLabel}>Имя героя</dt>
                    <dd className={styles.infoValue}>{username || 'Безымянный Герой'}</dd>
                  </div>
                  <div className={styles.infoRow}>
                    <dt className={styles.infoLabel}>Статус</dt>
                    <dd className={styles.infoValueGreen}>Кибер-Разведчик ✓</dd>
                  </div>
                  <div className={styles.infoRow}>
                    <dt className={styles.infoLabel}>Уровней пройдено</dt>
                    <dd className={styles.infoValue}>6 / 6</dd>
                  </div>
                  <div className={styles.infoRow}>
                    <dt className={styles.infoLabel}>Дата выдачи</dt>
                    <dd className={styles.infoValue}>{getCurrentDate()}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className={styles.achievementsSection} aria-labelledby="achievements-heading">
              <h3 id="achievements-heading" className={styles.achievementsTitle}>
                Полученные навыки
              </h3>
              <ul className={styles.achievementsList} role="list">
                {ACHIEVEMENTS.map((a) => (
                  <li key={a.title} className={styles.achievementItem}>
                    <span className={styles.achievementIcon} aria-hidden="true">{a.icon}</span>
                    <div className={styles.achievementText}>
                      <span className={styles.achievementName}>{a.title}</span>
                      <span className={styles.achievementDesc}>{a.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.passportFooter} aria-hidden="true">
              <div className={styles.passportStripes}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className={styles.passportStripe2} />
                ))}
              </div>
              <span className={styles.passportCode}>
                CS-{new Date().getFullYear()}-HERO
              </span>
            </div>
          </div>
        </article>

        <div className={styles.actions}>
          <Link href="/levels" className={styles.secondaryButton}>
            Вернуться к уровням
          </Link>
        </div>
      </div>
    </main>
  )
}
