'use client'

import type { ErrorDetail } from '../model/usePermissionProtector'
import { ALL_PERMISSIONS } from '../model/apps'
import styles from './permission-error-modal.module.scss'
import { useBodyScrollLock } from '@/shared/lib/useBodyScrollLock'

interface IProps {
  errorDetail: ErrorDetail
  onClose: () => void
}

export function PermissionErrorModal({ errorDetail, onClose }: IProps) {
  useBodyScrollLock()
  const { app, extraPermissions, missingPermissions } = errorDetail

  const getPermission = (id: string) => ALL_PERMISSIONS.find((p) => p.id === id)

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="perm-error-title"
    >
      <div className={styles.modal}>
        <div className={styles.iconWrapper} aria-hidden="true">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="32" fill="#FFF0F0" />
            <path d="M32 20V36M32 44V46" stroke="#E53935" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        </div>

        <h2 id="perm-error-title" className={styles.title}>Неверные разрешения!</h2>

        <div className={styles.appBadge}>
          <span className={styles.appEmoji} aria-hidden="true">{app.emoji}</span>
          <span className={styles.appName}>{app.name}</span>
        </div>

        {extraPermissions.length > 0 && (
          <div className={styles.block}>
            <p className={styles.blockTitle}>
              <span aria-hidden="true">🚫</span> Лишние разрешения, которые ты дал:
            </p>
            <ul className={styles.permList}>
              {extraPermissions.map((id) => {
                const perm = getPermission(id)
                const hint = app.hints[id]
                return (
                  <li key={id} className={styles.permItem}>
                    <span className={styles.permIcon} aria-hidden="true">{perm?.icon}</span>
                    <div>
                      <span className={styles.permLabel}>{perm?.label}</span>
                      {hint && <p className={styles.permHint}>{hint}</p>}
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {missingPermissions.length > 0 && (
          <div className={styles.block}>
            <p className={styles.blockTitle}>
              <span aria-hidden="true">✅</span> Необходимые разрешения, которые ты не дал:
            </p>
            <ul className={styles.permList}>
              {missingPermissions.map((id) => {
                const perm = getPermission(id)
                return (
                  <li key={id} className={styles.permItem}>
                    <span className={styles.permIcon} aria-hidden="true">{perm?.icon}</span>
                    <span className={styles.permLabel}>{perm?.label}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        <button className={styles.button} onClick={onClose} type="button">
          Попробовать снова
        </button>
      </div>
    </div>
  )
}
