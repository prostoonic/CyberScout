import { Header } from '@/widgets/ui'
import { MessengerTrap } from '@/features/messenger-trap'
import styles from '../levels.module.scss'

export default function Level4Page() {
  return (
    <div className={styles.page}>
      <Header />
      <MessengerTrap />
    </div>
  )
}
