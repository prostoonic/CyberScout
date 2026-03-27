import styles from './input.module.scss'

interface IProps {
  id: string
  placeholder: string
}

export function Input({ id, placeholder }: IProps) {
  return (
    <input
      type="text"
      className={styles.input}
      id={id}
      placeholder={placeholder}
    />
  )
}
