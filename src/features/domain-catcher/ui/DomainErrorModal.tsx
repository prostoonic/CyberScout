'use client'

import type { ErrorInfo } from '../model/useDomainCatcher'
import styles from './domain-error-modal.module.scss'
import { useBodyScrollLock } from '@/shared/lib/useBodyScrollLock'

interface IProps {
  errorInfo: ErrorInfo
  onClose: () => void
}

export function DomainErrorModal({ errorInfo, onClose }: IProps) {
  useBodyScrollLock()
  const { round, selectedDomainValue } = errorInfo
  const phishingDomain = round.domains.find(d => d.isPhishing)

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="domain-error-title"
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

        <h2 id="domain-error-title" className={styles.title}>
          Не совсем верно!
        </h2>
        <p className={styles.subtitle}>
          Ты выбрал обычный сайт, а настоящий фишинговый пропустил. Давай
          разберёмся!
        </p>

        <div className={styles.compareBlock}>
          <div className={styles.compareItem}>
            <span className={styles.compareLabel}>Ты выбрал:</span>
            <div className={styles.domainPill + ' ' + styles.domainPillWrong}>
              {selectedDomainValue}
            </div>
          </div>
          {phishingDomain && (
            <div className={styles.compareItem}>
              <span className={styles.compareLabel}>Фишинговый сайт:</span>
              <div
                className={styles.domainPill + ' ' + styles.domainPillPhishing}
              >
                {phishingDomain.value}
              </div>
            </div>
          )}
        </div>

        <div className={styles.tacticBlock}>
          <p className={styles.tacticLabel}>Приём мошенников:</p>
          <p className={styles.tacticValue}>{round.phishingTactic}</p>
        </div>

        <div className={styles.explanationBlock}>
          <p className={styles.explanation}>{round.phishingExplanation}</p>
        </div>

        <button className={styles.button} onClick={onClose} type="button">
          Понятно, попробую снова
        </button>
      </div>
    </div>
  )
}
