'use client'

import { ReactNode } from 'react'
import styles from './button.module.scss'
import clsx from 'clsx'

interface IProps {
  variant: 'primary' | 'secondary'
  onClick: () => void
  isDisable: boolean
  children: ReactNode
}

export function Button({ variant, onClick, isDisable, children }: IProps) {
  return (
    <button
      className={clsx(styles.button, styles[variant])}
      onClick={onClick}
      disabled={isDisable}
    >
      {children}
    </button>
  )
}
