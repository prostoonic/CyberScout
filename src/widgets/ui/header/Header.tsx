import Image from 'next/image'
import styles from './header.module.scss'

interface IProps {
  progress?: number
  lives?: number
  avatarSrc?: string
}

export function Header({
  progress = 20,
  lives = 3,
  avatarSrc = '/avatars/test.svg',
}: IProps) {
  const MAX_LIVES = 3

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src="/logo.svg" alt="CyberScout" width={115} height={28} />
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
        <ul className={styles.heartsList}>
          {Array.from({ length: MAX_LIVES }).map((_, i) => (
            <li key={i} className={styles.heartItem}>
              <Image
                src="/heart.svg"
                alt="Жизнь"
                width={20}
                height={19}
                className={i >= lives ? styles.heartLost : ''}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.avatar}>
        <span className={styles.avatarText}>Ванька</span>
        <Image src={avatarSrc} alt="Аватар" width={44} height={44} />
      </div>
    </header>
  )
}
