import { Header } from '@/widgets/ui'
import { SkillCheck } from '@/features/skill-check'
import styles from '../levels.module.scss'

export default function Level6Page() {
  return (
    <div className={styles.page}>
      <Header />
      <SkillCheck />
    </div>
  )
}
