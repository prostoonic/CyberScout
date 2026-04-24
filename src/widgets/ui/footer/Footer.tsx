import styles from './footer.module.scss'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        Проект выполнен в рамках конкурса{' '}
        <Link
          href="https://mvd.gov.by/ru/news/17422"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.tag}
        >
          #КиберПраво
        </Link>
      </p>
    </footer>
  )
}
