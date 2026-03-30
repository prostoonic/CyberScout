'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import { SuccessModal, LevelIntroModal } from '@/shared/ui'
import { useUserStore } from '@/entities/user'
import { ALL_PERMISSIONS } from '../model/apps'
import { usePermissionProtector } from '../model/usePermissionProtector'
import { PermissionErrorModal } from './PermissionErrorModal'
import styles from './permission-protector.module.scss'
import introStyles from './intro-content.module.scss'

const LEVEL_ID = 5

function Level5IntroContent() {
  return (
    <div className={introStyles.content}>
      <p className={introStyles.lead}>
        Приложения могут запрашивать доступ к камере, микрофону, контактам и
        другим данным. Не все разрешения безопасны.
      </p>
      <p className={introStyles.lead}>
        Если дать лишний доступ, приложение может следить за тобой или
        передавать твои данные.
      </p>

      <h3 className={introStyles.listTitle}>
        Как понять, можно ли дать разрешение:
      </h3>
      <ul className={introStyles.list}>
        <li>Оно должно быть нужно для работы приложения</li>
        <li>Если запрос выглядит странно — лучше отказать</li>
        <li>Не давай лишние разрешения</li>
        <li>При необходимости выбирай доступ только во время использования</li>
      </ul>

      <div className={introStyles.examples}>
        <p className={introStyles.examplesTitle}>Примеры:</p>
        <ul className={introStyles.examplesList}>
          <li>
            <span aria-hidden="true">🚫</span> Фонарик просит доступ к контактам
            — подозрительно
          </li>
          <li>
            <span aria-hidden="true">✅</span> Навигатор просит геолокацию —
            нормально
          </li>
          <li>
            <span aria-hidden="true">✅</span> Соцсеть просит камеру — допустимо
          </li>
        </ul>
      </div>

      <div className={introStyles.rule}>
        <span className={introStyles.ruleIcon} aria-hidden="true">
          💡
        </span>
        <p className={introStyles.ruleText}>
          Главное правило: давай только необходимые разрешения.
        </p>
      </div>
    </div>
  )
}

export function PermissionProtector() {
  const router = useRouter()
  const completeLevel = useUserStore(s => s.completeLevel)
  const loseLife = useUserStore(s => s.loseLife)
  const addMistake = useUserStore(s => s.addMistake)
  const [showIntro, setShowIntro] = useState(true)

  const {
    currentApp,
    appIndex,
    totalApps,
    enabled,
    togglePermission,
    saveSettings,
    showError,
    errorDetail,
    dismissError,
    showSuccess,
    setShowSuccess,
  } = usePermissionProtector()

  function handleErrorDismiss() {
    if (errorDetail) {
      addMistake(`Неверные разрешения для приложения «${errorDetail.app.name}»`)
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
          levelNumber={5}
          levelTitle="Защитник разрешений"
          introIcon="GlobeIcon"
          onStart={() => setShowIntro(false)}
        >
          <Level5IntroContent />
        </LevelIntroModal>
      )}

      <main className={styles.main}>
        <div className={styles.container}>
          <header className={styles.pageHeader}>
            <div className={styles.levelBadge} aria-label="Уровень 5">
              05
            </div>
            <div>
              <h1 className={styles.levelTitle}>Защитник разрешений</h1>
              <p className={styles.levelSubtitle}>
                Выдай только нужные разрешения приложению
              </p>
            </div>
          </header>

          {/* Progress */}
          <div
            className={styles.progressRow}
            role="status"
            aria-live="polite"
            aria-label={`Приложение ${appIndex + 1} из ${totalApps}`}
          >
            {Array.from({ length: totalApps }).map((_, i) => (
              <div
                key={i}
                className={clsx({
                  [styles.progressDotDone]: i < appIndex,
                  [styles.progressDotActive]: i === appIndex,
                  [styles.progressDotEmpty]: i > appIndex,
                })}
                aria-hidden="true"
              />
            ))}
            <span className={styles.progressLabel}>
              {appIndex + 1} / {totalApps}
            </span>
          </div>

          {/* App card */}
          <section className={styles.card} aria-labelledby="app-name">
            <div className={styles.appHeader}>
              <div className={styles.appIconWrapper} aria-hidden="true">
                <span className={styles.appIcon}>{currentApp.emoji}</span>
              </div>
              <div>
                <h2 id="app-name" className={styles.appName}>
                  {currentApp.name}
                </h2>
                <p className={styles.appDesc}>{currentApp.description}</p>
              </div>
            </div>

            <fieldset className={styles.permissionsFieldset}>
              <legend className={styles.permissionsLegend}>
                Выбери необходимые разрешения:
              </legend>

              <ul className={styles.permissionList} role="list">
                {ALL_PERMISSIONS.map(perm => {
                  const isOn = enabled[perm.id]
                  const switchId = `perm-${perm.id}`
                  return (
                    <li
                      key={perm.id}
                      className={styles.permissionItem}
                      role="listitem"
                    >
                      <label
                        className={styles.permissionLabel}
                        htmlFor={switchId}
                      >
                        <span
                          className={styles.permissionIconWrap}
                          aria-hidden="true"
                        >
                          {perm.icon}
                        </span>
                        <span className={styles.permissionText}>
                          {perm.label}
                        </span>
                      </label>
                      <button
                        id={switchId}
                        type="button"
                        role="switch"
                        aria-checked={isOn}
                        className={clsx(styles.toggle, {
                          [styles.toggleOn]: isOn,
                        })}
                        onClick={() => togglePermission(perm.id)}
                        aria-label={`${perm.label}: ${isOn ? 'включено' : 'выключено'}`}
                      >
                        <span
                          className={styles.toggleThumb}
                          aria-hidden="true"
                        />
                      </button>
                    </li>
                  )
                })}
              </ul>
            </fieldset>

            <button
              type="button"
              className={styles.saveButton}
              onClick={saveSettings}
            >
              Сохранить настройки
            </button>
          </section>
        </div>
      </main>

      {showError && errorDetail && (
        <PermissionErrorModal
          errorDetail={errorDetail}
          onClose={handleErrorDismiss}
        />
      )}

      {showSuccess && (
        <SuccessModal
          onClose={handleSuccessClose}
          description="Превосходно! Ты научился выдавать только необходимые разрешения и не давать лишнего доступа приложениям. Твои данные в безопасности!"
        />
      )}
    </>
  )
}
