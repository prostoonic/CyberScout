import { Header } from '@/widgets/ui'
import { PhishingCatcher } from '@/features/phishing-catcher'
import styles from '../levels.module.scss'

export default function Level2Page() {
  return (
    <div className={styles.page}>
      <Header />
      <PhishingCatcher />
    </div>
  )
}
