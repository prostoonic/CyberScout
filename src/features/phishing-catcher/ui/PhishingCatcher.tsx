'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SuccessModal, LevelIntroModal } from '@/shared/ui'
import { useUserStore } from '@/entities/user'
import { usePhishingCatcher } from '../model/usePhishingCatcher'
import { EmailList } from './EmailList'
import { EmailView } from './EmailView'
import { PhishingErrorModal } from './PhishingErrorModal'
import styles from './phishing-catcher.module.scss'
import introStyles from './intro-content.module.scss'

const LEVEL_ID = 2

function Level2IntroContent() {
  return (
    <div className={introStyles.content}>
      <p className={introStyles.lead}>
        Фишинг — это способ обмана, при котором злоумышленники притворяются надёжными сервисами или
        организациями, чтобы получить доступ к твоим данным, таким как пароль или банковская
        информация.
      </p>
      <p className={introStyles.lead}>
        Фишинг опасен тем, что может привести к краже аккаунта, потере денег и утечке личных данных.
      </p>

      <h3 className={introStyles.listTitle}>Как распознать фишинговое письмо:</h3>
      <ul className={introStyles.list}>
        <li>Подозрительный адрес отправителя</li>
        <li>Ошибки в тексте письма</li>
        <li>Сообщения с требованием срочно выполнить действие</li>
        <li>Подозрительные ссылки, отличающиеся от настоящих сайтов</li>
        <li>Запросы на ввод пароля или данных карты</li>
        <li>Неожиданные письма от сервисов, которыми ты не пользуешься</li>
      </ul>

      <div className={introStyles.warning}>
        <span className={introStyles.warningIcon} aria-hidden="true">⚠️</span>
        <p className={introStyles.warningText}>
          Никогда не переходи по подозрительным ссылкам и не вводи личные данные, если не уверен в
          надёжности источника.
        </p>
      </div>
    </div>
  )
}

export function PhishingCatcher() {
  const router = useRouter()
  const completeLevel = useUserStore((s) => s.completeLevel)
  const loseLife = useUserStore((s) => s.loseLife)
  const [showIntro, setShowIntro] = useState(true)
  const [mobileView, setMobileView] = useState<'list' | 'email'>('list')

  const {
    emails,
    selectedEmail,
    selectedId,
    setSelectedId,
    answers,
    answeredCount,
    isCurrentAnswered,
    submitAnswer,
    showError,
    errorInfo,
    dismissError,
    showSuccess,
    setShowSuccess,
  } = usePhishingCatcher()

  function handleSelect(id: number) {
    setSelectedId(id)
    setMobileView('email')
  }

  function handleAnswer(answer: 'phishing' | 'legit') {
    submitAnswer(answer)
  }

  function handleErrorDismiss() {
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
          levelNumber={2}
          levelTitle="Охотник за фишингом"
          onStart={() => setShowIntro(false)}
        >
          <Level2IntroContent />
        </LevelIntroModal>
      )}

      <main className={styles.main}>
        <div className={styles.topBar}>
          <div className={styles.topBarInner}>
            <div className={styles.levelInfo}>
              <div className={styles.levelBadge} aria-label="Уровень 2">02</div>
              <div>
                <h1 className={styles.levelTitle}>Охотник за фишингом</h1>
                <p className={styles.levelSubtitle}>Определи фишинговые письма во входящих</p>
              </div>
            </div>
            <div className={styles.progress} aria-label={`Проверено ${answeredCount} из ${emails.length} писем`}>
              <span className={styles.progressText}>
                Проверено: <strong>{answeredCount}/{emails.length}</strong>
              </span>
              <div className={styles.progressDots} aria-hidden="true">
                {emails.map((e) => {
                  const r = answers[e.id]
                  return (
                    <span
                      key={e.id}
                      className={
                        !r
                          ? styles.dotEmpty
                          : r.isCorrect
                          ? styles.dotCorrect
                          : styles.dotWrong
                      }
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.workspace}>
          <div className={`${styles.listPanel} ${mobileView === 'email' ? styles.listPanelHidden : ''}`}>
            <EmailList
              emails={emails}
              selectedId={selectedId}
              answers={answers}
              onSelect={handleSelect}
            />
          </div>

          <div className={`${styles.viewPanel} ${mobileView === 'list' ? styles.viewPanelHidden : ''}`}>
            <EmailView
              email={selectedEmail}
              result={answers[selectedEmail.id]}
              onAnswer={handleAnswer}
              onBack={mobileView === 'email' ? () => setMobileView('list') : undefined}
            />
          </div>
        </div>
      </main>

      {showError && errorInfo && (
        <PhishingErrorModal errorInfo={errorInfo} onClose={handleErrorDismiss} />
      )}

      {showSuccess && (
        <SuccessModal
          onClose={handleSuccessClose}
          description="Отлично! Ты научился распознавать фишинговые письма и защищать свои данные от мошенников. Продолжай своё кибер-приключение!"
        />
      )}
    </>
  )
}
