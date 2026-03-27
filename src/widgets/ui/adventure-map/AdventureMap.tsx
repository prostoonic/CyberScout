'use client'

import { LEVELS } from '@/entities/level'
import { LevelNode } from '@/entities/level'
import styles from './adventure-map.module.scss'

export function AdventureMap() {
  function handlePlay(id: number) {
    // TODO: navigate to level page
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
          {LEVELS.map((level, index) => (
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
