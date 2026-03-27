import clsx from 'clsx'
import type { ActiveChatState } from '../model/useMessengerTrap'
import styles from './messenger-trap.module.scss'

interface IProps {
  state: ActiveChatState
  onSelectOption: (id: 1 | 2) => void
  onBack: () => void
}

export function ChatView({ state, onSelectOption, onBack }: IProps) {
  const { chat, selectedOptionId, showResponse, outcome } = state
  const isAnswered = selectedOptionId !== null
  const selectedOption = chat.options.find((o) => o.id === selectedOptionId)

  return (
    <section className={styles.chatViewSection} aria-labelledby="chat-view-heading">
      <header className={styles.chatViewHeader}>
        <button
          type="button"
          className={styles.backButton}
          onClick={onBack}
          aria-label="Вернуться к списку чатов"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className={styles.chatViewContact}>
          <span className={styles.chatViewEmoji} aria-hidden="true">{chat.contactEmoji}</span>
          <div>
            <h2 id="chat-view-heading" className={styles.chatViewName}>{chat.contactName}</h2>
            <p className={styles.chatViewStatus}>
              {isAnswered ? (outcome === 'good' ? '✅ Распознан мошенник' : '❌ Попался на уловку') : 'Сейчас в сети'}
            </p>
          </div>
        </div>
      </header>

      <div className={styles.messagesArea} role="log" aria-label="История переписки" aria-live="polite">
        <div className={styles.messageDateSep} aria-hidden="true">Сегодня</div>

        {/* Scammer's message */}
        <div className={styles.messageRow}>
          <div className={styles.messageAvatarSmall} aria-hidden="true">{chat.contactEmoji}</div>
          <div className={styles.bubbleWrap}>
            <article className={clsx(styles.bubble, styles.bubbleIncoming)} aria-label={`Сообщение от ${chat.contactName}`}>
              <p className={styles.bubbleText}>{chat.scamMessage}</p>
            </article>
            <time className={styles.bubbleTime}>{chat.time}</time>
          </div>
        </div>

        {/* User's reply */}
        {isAnswered && selectedOption && (
          <div className={clsx(styles.messageRow, styles.messageRowOutgoing)}>
            <div className={styles.bubbleWrap}>
              <article className={clsx(styles.bubble, styles.bubbleOutgoing)} aria-label="Ваш ответ">
                <p className={styles.bubbleText}>{selectedOption.text}</p>
              </article>
              <time className={styles.bubbleTime}>{chat.time}</time>
            </div>
          </div>
        )}

        {/* Scammer's response */}
        {showResponse && (
          <div className={clsx(styles.messageRow, styles.messageRowResponse)}>
            <div className={styles.messageAvatarSmall} aria-hidden="true">{chat.contactEmoji}</div>
            <div className={styles.bubbleWrap}>
              <article
                className={clsx(styles.bubble, styles.bubbleIncoming, {
                  [styles.bubbleGoodEnding]: outcome === 'good',
                  [styles.bubbleBadEnding]: outcome === 'bad',
                })}
                aria-label={`Ответ от ${chat.contactName}`}
              >
                <p className={styles.bubbleText}>
                  {outcome === 'good' ? chat.goodEndingResponse : chat.badEndingResponse}
                </p>
              </article>
              <time className={styles.bubbleTime}>{chat.time}</time>
            </div>
          </div>
        )}

        {/* Typing indicator */}
        {isAnswered && !showResponse && (
          <div className={styles.messageRow}>
            <div className={styles.messageAvatarSmall} aria-hidden="true">{chat.contactEmoji}</div>
            <div className={styles.typingIndicator} aria-label="Собеседник печатает">
              <span /><span /><span />
            </div>
          </div>
        )}
      </div>

      <footer className={styles.chatViewFooter}>
        {!isAnswered ? (
          <div className={styles.optionsBlock}>
            <p className={styles.optionsHint}>Выбери ответ:</p>
            <div className={styles.optionsList}>
              {chat.options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={styles.optionButton}
                  onClick={() => onSelectOption(option.id)}
                  aria-label={`Ответить: ${option.text}`}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <button type="button" className={styles.backToListButton} onClick={onBack}>
            ← Вернуться к чатам
          </button>
        )}
      </footer>
    </section>
  )
}
