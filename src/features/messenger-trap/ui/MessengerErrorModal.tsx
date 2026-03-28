'use client'

import type { Chat } from '../model/chats'
import styles from './messenger-error-modal.module.scss'
import { useBodyScrollLock } from '@/shared/lib/useBodyScrollLock'

interface IProps {
  chat: Chat
  onClose: () => void
}

export function MessengerErrorModal({ chat, onClose }: IProps) {
  useBodyScrollLock()
  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="msg-error-title">
      <div className={styles.modal}>
        <div className={styles.iconWrapper} aria-hidden="true">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="32" fill="#FFF0F0" />
            <path d="M32 20V36M32 44V46" stroke="#E53935" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        </div>

        <h2 id="msg-error-title" className={styles.title}>Осторожно, мошенник!</h2>

        <p className={styles.subtitle}>
          Ты поделился кодом из СМС. Настоящие службы безопасности и техподдержка никогда не просят
          коды подтверждения — это всегда признак мошенничества!
        </p>

        <div className={styles.scammerCard}>
          <span className={styles.scammerEmoji} aria-hidden="true">{chat.contactEmoji}</span>
          <div>
            <p className={styles.scammerName}>{chat.contactName}</p>
            <p className={styles.scammerTag}>Мошенник</p>
          </div>
        </div>

        <div className={styles.tipsBlock}>
          <p className={styles.tipsTitle}>Запомни главное правило:</p>
          <ul className={styles.tipsList}>
            <li>Никогда не сообщай коды из СМС никому</li>
            <li>Настоящая поддержка не просит пароли и коды</li>
            <li>Угрозы и срочность — главные признаки мошенника</li>
          </ul>
        </div>

        <button className={styles.button} onClick={onClose} type="button">
          Понятно, буду осторожнее
        </button>
      </div>
    </div>
  )
}
