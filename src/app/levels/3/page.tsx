import { Header } from '@/widgets/ui'
import { DomainCatcher } from '@/features/domain-catcher'
import styles from '../levels.module.scss'

export default function Level3Page() {
  return (
    <div className={styles.page}>
      <Header />
      <DomainCatcher />
    </div>
  )
}
