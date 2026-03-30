import clsx from 'clsx'
import styles from './password-shield.module.scss'

interface IProps {
  label: string
  met: boolean
}

export function ChecklistItem({ label, met }: IProps) {
  return (
    <li
      className={clsx(styles.checklistItem, { [styles.checklistItemMet]: met })}
      aria-label={`${label}: ${met ? 'выполнено' : 'не выполнено'}`}
    >
      <span className={styles.checklistIcon} aria-hidden="true">
        {met ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="8"
              cy="8"
              r="8"
              fill="currentColor"
              fillOpacity="0.15"
            />
            <path
              d="M4.5 8L6.8 10.5L11.5 5.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="8"
              cy="8"
              r="7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeOpacity="0.5"
            />
          </svg>
        )}
      </span>
      <span className={styles.checklistLabel}>{label}</span>
    </li>
  )
}
