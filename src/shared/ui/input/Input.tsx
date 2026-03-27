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
  error?: string
  maxLength?: number
}

export function Input({ id, placeholder, value, onChange, error, maxLength }: IProps) {
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
      <input
        type="text"
        className={clsx(styles.input, { [styles.inputError]: !!error })}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
      />
      {error && <span className={styles.errorText} role="alert">{error}</span>}
    </div>
  )
}
