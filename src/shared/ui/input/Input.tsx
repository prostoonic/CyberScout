'use client'

import { useState } from 'react'
import clsx from 'clsx'
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
            {visible ? <EyeOffIcon /> : <EyeIcon />}
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

function EyeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 4C5.5 4 2 10 2 10C2 10 5.5 16 10 16C14.5 16 18 10 18 10C18 10 14.5 4 10 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M3 3L17 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7.5 7.76C6.57 8.42 5.78 9.27 5.18 10C5.18 10 7.5 14 10 14C10.9 14 11.76 13.67 12.5 13.18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 6.08C9.33 6.03 9.66 6 10 6C12.5 6 14.82 8 15.82 10C15.56 10.56 15.22 11.12 14.82 11.64"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
