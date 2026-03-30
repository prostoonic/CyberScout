'use client'

import type { ErrorInfo } from '../model/usePhishingCatcher'
import styles from './phishing-error-modal.module.scss'
import { useBodyScrollLock } from '@/shared/lib/useBodyScrollLock'

interface IProps {
  errorInfo: ErrorInfo
  onClose: () => void
}

export function PhishingErrorModal({ errorInfo, onClose }: IProps) {
  useBodyScrollLock()
  const { email, userAnswer } = errorInfo
  const calledPhishing = userAnswer === 'phishing'

  const title = calledPhishing ? 'Это обычное письмо!' : 'Ты пропустил фишинг!'

  const subtitle = calledPhishing
    ? 'Ты принял настоящее письмо за фишинговое. Давай разберёмся почему оно безопасно.'
    : 'Осторожно! Это было фишинговое письмо. Посмотри, на что нужно было обратить внимание.'

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="error-modal-title"
    >
      <div className={styles.modal}>
        <div className={styles.iconWrapper} aria-hidden="true">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="32" fill="#FFF0F0" />
            <path
              d="M32 20V36M32 44V46"
              stroke="#E53935"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h2 id="error-modal-title" className={styles.title}>
          {title}
        </h2>
        <p className={styles.subtitle}>{subtitle}</p>

        <div className={styles.emailCard}>
          <p className={styles.emailSubject}>{email.subject}</p>
          <p className={styles.emailFrom}>
            От: {email.fromName} &lt;{email.fromEmail}&gt;
          </p>
        </div>

        {!calledPhishing && email.phishingHints.length > 0 && (
          <div className={styles.hintsBlock}>
            <p className={styles.hintsTitle}>
              На что нужно было обратить внимание:
            </p>
            <ul className={styles.hintsList}>
              {email.phishingHints.map((hint, i) => (
                <li key={i} className={styles.hintsItem}>
                  <span className={styles.hintsIcon} aria-hidden="true">
                    ⚠️
                  </span>
                  {hint}
                </li>
              ))}
            </ul>
          </div>
        )}

        {calledPhishing && (
          <div className={styles.hintsBlock}>
            <p className={styles.hintsTitle}>Признаки безопасного письма:</p>
            <ul className={styles.hintsList}>
              <li className={styles.hintsItem}>
                <span className={styles.hintsIcon} aria-hidden="true">
                  ✅
                </span>
                Отправитель использует официальный домен (
                {email.fromEmail.split('@')[1]})
              </li>
              <li className={styles.hintsItem}>
                <span className={styles.hintsIcon} aria-hidden="true">
                  ✅
                </span>
                Письмо не требует вводить пароль или переходить по
                подозрительным ссылкам
              </li>
              <li className={styles.hintsItem}>
                <span className={styles.hintsIcon} aria-hidden="true">
                  ✅
                </span>
                Нет угроз и искусственной срочности
              </li>
            </ul>
          </div>
        )}

        <button className={styles.button} onClick={onClose} type="button">
          Понятно, продолжить
        </button>
      </div>
    </div>
  )
}
