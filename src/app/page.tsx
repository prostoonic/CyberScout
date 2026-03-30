'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.scss'
import Image from 'next/image'
import { Button, Icon, Input } from '@/shared/ui'
import { AVATARS } from '@/entities/avatar/model/avatars'
import { useUserStore } from '@/entities/user'

const MAX_NAME_LENGTH = 15

export default function Home() {
  const router = useRouter()
  const startGame = useUserStore(s => s.startGame)

  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')
  const [avatar, setAvatar] = useState<number>(1)

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setName(value)
    if (value.length >= MAX_NAME_LENGTH) {
      setNameError(`Имя не должно превышать ${MAX_NAME_LENGTH} символов`)
    } else {
      setNameError('')
    }
  }

  function handleStart() {
    if (!name.trim() || !!nameError) return
    startGame(name.trim(), avatar)
    router.replace('/levels')
  }

  const isDisabled = !name.trim() || !!nameError

  const avatars = AVATARS.map((a, index) => {
    return (
      <li key={a.id} className={styles.avatarItem}>
        <label className={styles.avatarLabel}>
          <input
            className={styles.radio}
            type="radio"
            name="avatar"
            value={a.id}
            checked={avatar === a.id}
            onChange={e => setAvatar(+e.target.value)}
          />
          <Image
            src={a.image}
            width={80}
            height={80}
            alt="Аватар"
            priority={index < 3}
            unoptimized
          />
        </label>
      </li>
    )
  })

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1 className={styles.title}>CyberScout</h1>
          <p className={styles.text}>
            Твоё приключение в цифровом мире начинается здесь
          </p>
        </header>
        <main className={styles.main}>
          <form
            className={styles.form}
            onSubmit={e => {
              e.preventDefault()
              handleStart()
            }}
          >
            <div className={styles.formWrapper}>
              <label htmlFor="name" className={styles.subtitle}>
                Как тебя зовут
              </label>
              <Input
                id="name"
                placeholder="Введи имя..."
                value={name}
                onChange={handleNameChange}
                error={nameError}
                maxLength={MAX_NAME_LENGTH}
              />
            </div>
            <fieldset className={styles.avatarFieldset}>
              <legend className={styles.subtitle}>Выбери своего аватара</legend>
              <ul className={styles.avatarList}>{avatars}</ul>
            </fieldset>

            <Button
              variant="primary"
              onClick={handleStart}
              isDisable={isDisabled}
            >
              <span>Начать путешествие</span>
              <Icon icon="RocketIcon" />
            </Button>
          </form>
        </main>
      </div>
    </div>
  )
}
