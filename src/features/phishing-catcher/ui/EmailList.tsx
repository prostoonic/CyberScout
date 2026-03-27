import clsx from 'clsx'
import type { Email } from '../model/emails'
import type { AnswerResult } from '../model/usePhishingCatcher'
import styles from './phishing-catcher.module.scss'

interface IProps {
  emails: Email[]
  selectedId: number
  answers: Record<number, AnswerResult>
  onSelect: (id: number) => void
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

const AVATAR_COLORS = ['#0057bd', '#3d57a7', '#48ac34', '#f57c00', '#7b1fa2']

export function EmailList({ emails, selectedId, answers, onSelect }: IProps) {
  return (
    <nav className={styles.emailList} aria-label="Список писем">
      <div className={styles.emailListHeader}>
        <h2 className={styles.emailListTitle}>Входящие</h2>
        <span className={styles.emailListCount}>{emails.length}</span>
      </div>
      <ul className={styles.emailItems} role="list">
        {emails.map((email, idx) => {
          const result = answers[email.id]
          const isSelected = email.id === selectedId
          const isAnswered = !!result

          return (
            <li key={email.id} role="listitem">
              <button
                type="button"
                className={clsx(styles.emailItem, {
                  [styles.emailItemSelected]: isSelected,
                  [styles.emailItemAnswered]: isAnswered,
                })}
                onClick={() => onSelect(email.id)}
                aria-current={isSelected ? 'true' : undefined}
                aria-label={`${email.fromName}: ${email.subject}${isAnswered ? (result.isCorrect ? ', отвечено верно' : ', ошибка') : ', не отвечено'}`}
              >
                <div
                  className={styles.emailAvatar}
                  style={{ background: AVATAR_COLORS[idx % AVATAR_COLORS.length] }}
                  aria-hidden="true"
                >
                  {getInitials(email.fromName)}
                </div>

                <div className={styles.emailItemContent}>
                  <div className={styles.emailItemTop}>
                    <span className={clsx(styles.emailSender, { [styles.emailSenderUnread]: !isAnswered })}>
                      {email.fromName}
                    </span>
                    <span className={styles.emailDate}>{email.date.split(',')[0]}</span>
                  </div>
                  <p className={clsx(styles.emailSubjectLine, { [styles.emailSubjectUnread]: !isAnswered })}>
                    {email.subject}
                  </p>
                  <p className={styles.emailPreview}>{email.preview}</p>
                </div>

                {isAnswered && (
                  <span
                    className={clsx(styles.answerBadge, {
                      [styles.answerBadgeCorrect]: result.isCorrect,
                      [styles.answerBadgeWrong]: !result.isCorrect,
                    })}
                    aria-hidden="true"
                  >
                    {result.isCorrect ? '✓' : '✗'}
                  </span>
                )}

                {!isAnswered && (
                  <span className={styles.unreadDot} aria-hidden="true" />
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
