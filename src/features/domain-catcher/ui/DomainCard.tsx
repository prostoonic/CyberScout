import clsx from 'clsx'
import styles from './domain-catcher.module.scss'

interface IProps {
  value: string
  isSelected: boolean
  isCorrect?: boolean
  onSelect: () => void
  disabled?: boolean
}

export function DomainCard({ value, isSelected, isCorrect, onSelect, disabled }: IProps) {
  return (
    <button
      type="button"
      className={clsx(styles.domainCard, {
        [styles.domainCardSelected]: isSelected && isCorrect === undefined,
        [styles.domainCardCorrect]: isCorrect === true,
      })}
      onClick={onSelect}
      disabled={disabled}
      aria-pressed={isSelected}
      aria-label={`Домен: ${value}`}
    >
      <span className={styles.domainCardBar} aria-hidden="true">
        <span className={styles.domainBarDots}>
          <span />
          <span />
          <span />
        </span>
        <span className={styles.domainBarUrl}>https://</span>
      </span>
      <span className={styles.domainCardValue}>{value}</span>
      {isCorrect && (
        <span className={styles.domainCardCheckmark} aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="11" fill="rgba(72,172,52,0.15)" />
            <path d="M6 11L9.5 14.5L16 8" stroke="#48ac34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </button>
  )
}
