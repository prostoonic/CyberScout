import Image from 'next/image'
import styles from './hearts-display.module.scss'

interface IProps {
  lives: number
  maxLives: number
}

export function HeartsDisplay({ lives, maxLives }: IProps) {
  return (
    <ul
      className={styles.list}
      aria-label={`Жизни: ${lives} из ${maxLives}`}
      role="list"
    >
      {Array.from({ length: maxLives }).map((_, i) => {
        const isLost = i >= lives
        return (
          <li key={i} className={styles.item}>
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
  )
}
