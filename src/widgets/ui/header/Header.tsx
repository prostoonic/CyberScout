'use client'

import Image from 'next/image'
import Link from 'next/link'
import styles from './header.module.scss'
import { useUserStore } from '@/entities/user'
import { AVATARS } from '@/entities/avatar/model/avatars'

export function Header() {
  const username = useUserStore(s => s.username)
  const progress = useUserStore(s => s.progress)
  const selectedAvatarId = useUserStore(s => s.selectedAvatarId)

  const avatarSrc =
    AVATARS.find(a => a.id === selectedAvatarId)?.image ??
    '/avatars/Avatar1.svg'

  return (
    <header className={styles.header}>
      <Link
        href="/levels"
        className={styles.logo}
        aria-label="CyberScout — на карту уровней"
      >
        <Image
          className={styles.logoImage}
          src="/logo.svg"
          alt="CyberScout"
          width={115}
          height={28}
        />
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
