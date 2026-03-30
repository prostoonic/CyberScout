import { Footer } from '@/widgets/ui'
import { VictoryPage } from '@/features/victory'
import styles from './victory.module.scss'

export default function Victory() {
  return (
    <div className={styles.page}>
      <VictoryPage />
      <Footer />
    </div>
  )
}
