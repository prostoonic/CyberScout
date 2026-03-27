import clsx from 'clsx'
import type { Chat } from '../model/chats'
import type { ChatResult } from '../model/useMessengerTrap'
import styles from './messenger-trap.module.scss'

interface IProps {
  chats: Chat[]
  results: Record<number, ChatResult>
  completedCount: number
  onOpenChat: (id: number) => void
}

export function ChatList({ chats, results, completedCount, onOpenChat }: IProps) {
  return (
    <section className={styles.chatListSection} aria-labelledby="chat-list-heading">
      <header className={styles.messengerHeader}>
        <h1 className={styles.messengerTitle}>Сообщения</h1>
        <span className={styles.messengerProgress} aria-label={`Проверено ${completedCount} из ${chats.length} чатов`}>
          {completedCount}/{chats.length}
        </span>
      </header>

      <ul className={styles.chatList} role="list">
        {chats.map((chat) => {
          const result = results[chat.id]
          const isDone = !!result
          const isGood = result?.outcome === 'good'

          return (
            <li key={chat.id} role="listitem">
              <button
                type="button"
                className={clsx(styles.chatItem, {
                  [styles.chatItemDoneGood]: isDone && isGood,
                  [styles.chatItemDoneBad]: isDone && !isGood,
                })}
                onClick={() => onOpenChat(chat.id)}
                aria-label={`Открыть чат: ${chat.contactName}${isDone ? (isGood ? ', отвечено верно' : ', допущена ошибка') : ', не отвечено'}`}
              >
                <div className={styles.chatAvatar} aria-hidden="true">
                  <span className={styles.chatAvatarEmoji}>{chat.contactEmoji}</span>
                </div>

                <div className={styles.chatInfo}>
                  <div className={styles.chatTopRow}>
                    <span className={styles.chatName}>{chat.contactName}</span>
                    <span className={styles.chatTime}>{chat.time}</span>
                  </div>
                  <p className={styles.chatPreview}>
                    {isDone
                      ? result.outcome === 'good'
                        ? '✅ Правильный ответ'
                        : '❌ Ошибка'
                      : chat.preview}
                  </p>
                </div>

                {!isDone && (
                  <span className={styles.unreadBadge} aria-hidden="true">1</span>
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
