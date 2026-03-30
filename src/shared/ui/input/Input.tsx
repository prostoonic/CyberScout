'use client'

import { useState } from 'react'
import clsx from 'clsx'
import { Icon } from '@/shared/ui/icon/Icon'
import styles from './input.module.scss'

function sanitize(value: string): string {
  return value.replace(/[<>]/g, '')
}

interface IProps {
  id: string
  placeholder: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: () => void
  error?: string
  hasError?: boolean
  maxLength?: number
  type?: 'text' | 'password'
  label?: string
  showToggle?: boolean
}

export function Input({
  id,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  hasError,
  maxLength,
  type = 'text',
  label,
  showToggle = false,
}: IProps) {
  const [visible, setVisible] = useState(false)

  const isError = !!error || hasError
  const resolvedType = type === 'password' && showToggle
    ? visible ? 'text' : 'password'
    : type

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const clean = sanitize(e.target.value)
    if (onChange) {
      const syntheticEvent = {
        ...e,
        target: { ...e.target, value: clean },
      } as React.ChangeEvent<HTMLInputElement>
      onChange(syntheticEvent)
    }
  }

  return (
    <div className={styles.wrapper}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      <div className={styles.inputWrapper}>
        <input
          type={resolvedType}
          className={clsx(styles.input, {
            [styles.inputError]: isError,
            [styles.inputWithToggle]: showToggle,
          })}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          onBlur={onBlur}
          aria-invalid={isError}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {showToggle && (
          <button
            type="button"
            className={styles.toggleButton}
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Скрыть пароль' : 'Показать пароль'}
            tabIndex={-1}
          >
            {visible ? <Icon icon="EyeOffIcon" /> : <Icon icon="EyeIcon" />}
          </button>
        )}
      </div>
      {error && (
        <span className={styles.errorText} id={`${id}-error`} role="alert">
          {error}
        </span>
      )}
    </div>
  )
}
