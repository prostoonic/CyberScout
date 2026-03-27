import { Header } from '@/widgets/ui'
import { PasswordShield } from '@/features/password-shield'
import styles from '../levels.module.scss'

export default function Level1Page() {
  return (
    <div className={styles.page}>
      <Header />
      <PasswordShield />
    </div>
  )
}
