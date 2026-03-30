'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SuccessModal, LevelIntroModal } from '@/shared/ui'
import { useUserStore } from '@/entities/user'
import { useMessengerTrap } from '../model/useMessengerTrap'
import { ChatList } from './ChatList'
import { ChatView } from './ChatView'
import { MessengerErrorModal } from './MessengerErrorModal'
import styles from './messenger-trap.module.scss'
import introStyles from './intro-content.module.scss'

const LEVEL_ID = 4

function Level4IntroContent() {
  return (
    <div className={introStyles.content}>
      <p className={introStyles.lead}>
        В этом уровне тебе предстоит определить, какие сообщения пишет настоящий
        собеседник, а какие — мошенник.
      </p>
      <p className={introStyles.lead}>
        Мошенники часто выдают себя за знакомых, коллег или сервисы поддержки.
        Они могут писать вежливо и убедительно, не вызывая подозрений. Их цель —
        заставить тебя передать личные данные, код подтверждения или перейти по
        ссылке.
      </p>

      <div className={introStyles.warning}>
        <span className={introStyles.warningIcon} aria-hidden="true">
          ⚠️
        </span>
        <p className={introStyles.warningText}>
          Будь внимателен: даже обычное на первый взгляд сообщение может быть
          обманом.
        </p>
      </div>
    </div>
  )
}

export function MessengerTrap() {
  const router = useRouter()
  const completeLevel = useUserStore(s => s.completeLevel)
  const loseLife = useUserStore(s => s.loseLife)
  const addMistake = useUserStore(s => s.addMistake)
  const [showIntro, setShowIntro] = useState(true)

  const {
    chats,
    results,
    completedCount,
    activeChatId,
    activeState,
    openChat,
    closeChat,
    selectOption,
    showError,
    errorChat,
    dismissError,
    showSuccess,
    setShowSuccess,
  } = useMessengerTrap()

  function handleErrorDismiss() {
    if (errorChat) {
      addMistake(`Попался на мошенника: ${errorChat.contactName}`)
    }
    loseLife()
    dismissError()
  }

  function handleSuccessClose() {
    completeLevel(LEVEL_ID)
    setShowSuccess(false)
    router.replace('/levels')
  }

  return (
    <>
      {showIntro && (
        <LevelIntroModal
          levelNumber={4}
          levelTitle="Мессенджер ловушка"
          onStart={() => setShowIntro(false)}
        >
          <Level4IntroContent />
        </LevelIntroModal>
      )}

      <main className={styles.main}>
        <div className={styles.topBar}>
          <div className={styles.topBarInner}>
            <div className={styles.levelInfo}>
              <div className={styles.levelBadge} aria-label="Уровень 4">
                04
              </div>
              <div>
                <h1 className={styles.levelTitle}>Мессенджер ловушка</h1>
                <p className={styles.levelSubtitle}>
                  Распознай мошенника в переписке
                </p>
              </div>
            </div>
            <div
              className={styles.progressInfo}
              aria-label={`Проверено ${completedCount} из ${chats.length} чатов`}
            >
              <div className={styles.progressDots} aria-hidden="true">
                {chats.map(c => {
                  const r = results[c.id]
                  return (
                    <span
                      key={c.id}
                      className={
                        !r
                          ? styles.dotEmpty
                          : r.outcome === 'good'
                            ? styles.dotGood
                            : styles.dotBad
                      }
                    />
                  )
                })}
              </div>
              <span className={styles.progressText}>
                {completedCount}/{chats.length}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.workspace}>
          {activeChatId === null || activeState === null ? (
            <ChatList
              chats={chats}
              results={results}
              completedCount={completedCount}
              onOpenChat={openChat}
            />
          ) : (
            <ChatView
              state={activeState}
              onSelectOption={selectOption}
              onBack={closeChat}
            />
          )}
        </div>
      </main>

      {showError && errorChat && (
        <MessengerErrorModal chat={errorChat} onClose={handleErrorDismiss} />
      )}

      {showSuccess && (
        <SuccessModal
          onClose={handleSuccessClose}
          description="Великолепно! Ты распознал всех мошенников и ни разу не попался на их уловки. Теперь ты знаешь, как защитить свои данные в переписке!"
        />
      )}
    </>
  )
}
