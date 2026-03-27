'use client'

import Image from 'next/image'
import Link from 'next/link'
import styles from './header.module.scss'
import { useUserStore, MAX_LIVES } from '@/entities/user'
import { AVATARS } from '@/entities/avatar/model/avatars'

export function Header() {
  const username = useUserStore((s) => s.username)
  const progress = useUserStore((s) => s.progress)
  const selectedAvatarId = useUserStore((s) => s.selectedAvatarId)
  const lives = useUserStore((s) => s.lives)

  const avatarSrc =
    AVATARS.find((a) => a.id === selectedAvatarId)?.image ?? '/avatars/test.svg'

  return (
    <header className={styles.header}>
      <Link href="/levels" className={styles.logo} aria-label="CyberScout — на карту уровней">
        <Image src="/logo.svg" alt="CyberScout" width={115} height={28} />
      </Link>

      <div className={styles.center}>
        <div className={styles.progressWrapper}>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className={styles.progressLabel}>{progress}%</span>
        </div>
        <ul className={styles.heartsList}>
          {Array.from({ length: MAX_LIVES }).map((_, i) => {
            const isLost = i >= lives
            return (
              <li key={i} className={styles.heartItem}>
                <Image
                  src={isLost ? '/heart-broken.svg' : '/heart.svg'}
                  alt={isLost ? 'Потраченная жизнь' : 'Жизнь'}
                  width={20}
                  height={19}
                />
              </li>
            )
          })}
        </ul>
      </div>

      <div className={styles.avatar}>
        <span className={styles.avatarText}>{username || 'Гость'}</span>
        <div className={styles.avatarImage}>
          <Image src={avatarSrc} alt="Аватар" width={44} height={44} />
        </div>
      </div>
    </header>
  )
}
