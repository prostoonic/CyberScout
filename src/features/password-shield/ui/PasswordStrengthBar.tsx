import clsx from 'clsx'
import type { StrengthLevel } from '../model/usePasswordValidation'
import styles from './password-shield.module.scss'

interface IProps {
  percent: number
  label: string
  level: StrengthLevel
}

export function PasswordStrengthBar({ percent, label, level }: IProps) {
  return (
    <div className={styles.strengthWrapper}>
      <div className={styles.strengthHeader}>
        <span className={styles.strengthTitle}>Сложность пароля</span>
        <span
          className={clsx(styles.strengthLabel, styles[`strength_${level}`])}
          aria-live="polite"
          aria-atomic="true"
        >
          {label}
        </span>
      </div>
      <div
        className={styles.strengthTrack}
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Сложность пароля: ${label}`}
      >
        <div
          className={clsx(styles.strengthFill, styles[`strength_${level}`])}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
