'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import styles from './header.module.scss'
import { useUserStore } from '@/entities/user'
import { AVATARS } from '@/entities/avatar/model/avatars'

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const username = useUserStore(s => s.username)
  const progress = useUserStore(s => s.progress)
  const selectedAvatarId = useUserStore(s => s.selectedAvatarId)

  const showBackToLevels = pathname?.startsWith('/levels/') ?? false

  const avatarSrc =
    AVATARS.find(a => a.id === selectedAvatarId)?.image ??
    '/avatars/Avatar1.svg'

  return (
    <header className={styles.header}>
      <div className={styles.leading}>
       
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
        {showBackToLevels && (
          <button
            type="button"
            className={styles.back}
            onClick={() => router.replace('/levels')}
            aria-label="Вернуться к списку уровней"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}
      </div>

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
