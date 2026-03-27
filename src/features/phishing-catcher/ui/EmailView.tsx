import clsx from 'clsx'
import type { Email } from '../model/emails'
import type { AnswerResult, EmailAnswer } from '../model/usePhishingCatcher'
import styles from './phishing-catcher.module.scss'

interface IProps {
  email: Email
  result?: AnswerResult
  onAnswer: (answer: EmailAnswer) => void
  onBack?: () => void
}

export function EmailView({ email, result, onAnswer, onBack }: IProps) {
  const isAnswered = !!result

  return (
    <article className={styles.emailView} aria-labelledby="email-subject">
      {onBack && (
        <button
          type="button"
          className={styles.backButton}
          onClick={onBack}
          aria-label="Вернуться к списку писем"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Назад</span>
        </button>
      )}

      <header className={styles.emailViewHeader}>
        <h2 id="email-subject" className={styles.emailViewSubject}>{email.subject}</h2>
        <div className={styles.emailMeta}>
          <div className={styles.emailMetaFrom}>
            <span className={styles.emailMetaLabel}>От:</span>
            <span className={styles.emailMetaValue}>
              {email.fromName}
              <span className={styles.emailMetaEmail}>&nbsp;&lt;{email.fromEmail}&gt;</span>
            </span>
          </div>
          <div className={styles.emailMetaDate}>
            <span className={styles.emailMetaLabel}>Дата:</span>
            <time className={styles.emailMetaValue}>{email.date}</time>
          </div>
        </div>
      </header>

      <div className={styles.emailBody}>
        {email.body.map((paragraph, i) => (
          <p key={i} className={styles.emailParagraph}>{paragraph}</p>
        ))}

        {email.suspiciousElement && (
          <div className={styles.suspiciousBlock} role="note" aria-label="Подозрительный элемент">
            <span className={styles.suspiciousIcon} aria-hidden="true">⚠️</span>
            <span className={styles.suspiciousText}>{email.suspiciousElement}</span>
          </div>
        )}
      </div>

      <footer className={styles.emailActions}>
        {isAnswered ? (
          <div
            className={clsx(styles.answeredBanner, {
              [styles.answeredBannerCorrect]: result.isCorrect,
              [styles.answeredBannerWrong]: !result.isCorrect,
            })}
            role="status"
          >
            <span className={styles.answeredIcon} aria-hidden="true">
              {result.isCorrect ? '✓' : '✗'}
            </span>
            <span>
              {result.isCorrect
                ? result.answer === 'phishing'
                  ? 'Верно! Это фишинговое письмо.'
                  : 'Верно! Это безопасное письмо.'
                : result.answer === 'phishing'
                  ? 'Ошибка — это было обычное письмо.'
                  : 'Ошибка — это было фишинговое письмо.'}
            </span>
          </div>
        ) : (
          <div className={styles.actionButtons}>
            <p className={styles.actionPrompt}>Как ты оцениваешь это письмо?</p>
            <div className={styles.actionButtonsRow}>
              <button
                type="button"
                className={styles.btnPhishing}
                onClick={() => onAnswer('phishing')}
              >
                <span aria-hidden="true">🚨</span>
                Фишинговое
              </button>
              <button
                type="button"
                className={styles.btnLegit}
                onClick={() => onAnswer('legit')}
              >
                <span aria-hidden="true">✅</span>
                Не фишинговое
              </button>
            </div>
          </div>
        )}
      </footer>
    </article>
  )
}
