import Image from 'next/image'
import Link from 'next/link'
import styles from './not-found.module.scss'

export default function NotFoundPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.robotWrapper} aria-hidden="true">
          <Image
            src="/sad-robot.svg"
            alt="Грустный робот потерялся"
            width={280}
            height={320}
            priority
          />
        </div>

        <div className={styles.content}>
          <span className={styles.code} aria-hidden="true">404</span>
          <h1 className={styles.title}>Страница потерялась!</h1>
          <p className={styles.description}>
            Наш робот-разведчик отправился на поиски, но и сам заблудился.
            Похоже, этой страницы не существует или она была удалена.
          </p>
          <Link href="/levels" className={styles.button}>
            Вернуться на карту
          </Link>
        </div>
      </div>
    </main>
  )
}
