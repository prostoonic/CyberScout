import { Header, AdventureMap } from '@/widgets/ui'
import styles from './levels.module.scss'

export default function LevelsPage() {
  return (
    <div className={styles.page}>
      <Header />
      <AdventureMap />
    </div>
  )
}
