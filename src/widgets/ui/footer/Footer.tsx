import styles from './footer.module.scss'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        Проект выполнен в рамках конкурса{' '}
        <span className={styles.tag}>#КиберПраво</span>
      </p>
    </footer>
  )
}
