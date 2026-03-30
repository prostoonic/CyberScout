import clsx from 'clsx'
import { Icon } from '@/shared/ui'
import type { Level } from '../model/levels'
import styles from './level-node.module.scss'

interface IProps {
  level: Level
  onPlay?: (id: number) => void
}

const STATUS_LABEL: Record<string, string> = {
  completed: 'Пройден',
  current: 'Текущий уровень',
  locked: 'Заблокирован',
}

const BUTTON_LABEL: Record<string, string> = {
  completed: 'Повторить',
  current: 'Играть',
  locked: 'Заблокировано',
}

export function LevelNode({ level, onPlay }: IProps) {
  const { id, number, title, description, icon, status, isFinal } = level
  const isLocked = status === 'locked'
  const isCompleted = status === 'completed'
  const isCurrent = status === 'current'

  return (
    <article
      className={clsx(styles.node, {
        [styles.completed]: isCompleted,
        [styles.current]: isCurrent,
        [styles.locked]: isLocked,
        [styles.final]: isFinal,
      })}
      aria-label={`Уровень ${number}: ${title}. ${STATUS_LABEL[status]}`}
    >
      <div className={styles.circleWrapper}>
        <button
          type="button"
          className={styles.circle}
          onClick={() => !isLocked && onPlay?.(id)}
          disabled={isLocked}
          aria-label={`${BUTTON_LABEL[status]} уровень ${number}: ${title}`}
        >
          <span className={styles.circleIcon}>
            <Icon icon={isLocked ? 'LockIcon' : icon} />
          </span>
        </button>

        <span className={styles.numberBadge} aria-hidden="true">
          {number}
        </span>
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        <button
          type="button"
          className={clsx(styles.actionButton, {
            [styles.actionButtonCompleted]: isCompleted,
            [styles.actionButtonCurrent]: isCurrent,
            [styles.actionButtonLocked]: isLocked,
          })}
          onClick={() => !isLocked && onPlay?.(id)}
          disabled={isLocked}
          aria-label={`${BUTTON_LABEL[status]} — ${title}`}
        >
          {isLocked && <Icon icon="LockIcon" className={styles.buttonIcon} />}
          <span>{BUTTON_LABEL[status]}</span>
        </button>
      </div>
    </article>
  )
}
