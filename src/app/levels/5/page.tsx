import { Header } from '@/widgets/ui'
import { PermissionProtector } from '@/features/permission-protector'
import styles from '../levels.module.scss'

export default function Level5Page() {
  return (
    <div className={styles.page}>
      <Header />
      <PermissionProtector />
    </div>
  )
}
