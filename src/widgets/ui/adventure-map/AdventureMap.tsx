'use client'

import { LEVELS } from '@/entities/level'
import { LevelNode } from '@/entities/level'
import type { Level, LevelStatus } from '@/entities/level'
import styles from './adventure-map.module.scss'
import { useUserStore } from '@/entities/user'

function computeLevels(completedLevels: number[]): Level[] {
  let foundCurrent = false
  return LEVELS.map((level) => {
    if (completedLevels.includes(level.id)) {
      return { ...level, status: 'completed' as LevelStatus }
    }
    if (!foundCurrent) {
      foundCurrent = true
      return { ...level, status: 'current' as LevelStatus }
    }
    return { ...level, status: 'locked' as LevelStatus }
  })
}

export function AdventureMap() {
  const completedLevels = useUserStore((s) => s.completedLevels)
  const levels = computeLevels(completedLevels)

  function handlePlay(id: number) {
    console.log('play level', id)
  }

  return (
    <section className={styles.section} aria-labelledby="map-heading">
      <div className={styles.container}>
        <div className={styles.heading}>
          <h2 id="map-heading" className={styles.title}>
            Карта приключений
          </h2>
          <p className={styles.subtitle}>
            Пройди все уровни и стань настоящим кибер-разведчиком!
          </p>
        </div>

        <div className={styles.mapWrapper} role="list" aria-label="Уровни игры">
          {levels.map((level, index) => (
            <div
              key={level.id}
              className={styles.levelItem}
              data-position={index % 2 === 0 ? 'left' : 'right'}
              role="listitem"
            >
              <LevelNode level={level} onPlay={handlePlay} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
