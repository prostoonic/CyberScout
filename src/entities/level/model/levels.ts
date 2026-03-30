import type { IconName } from '@/shared/ui/icon/Icon'

export type LevelStatus = 'completed' | 'current' | 'locked'

export interface Level {
  id: number
  number: number
  title: string
  description: string
  icon: IconName
  status: LevelStatus
  isFinal?: boolean
}

export const LEVELS: Level[] = [
  {
    id: 1,
    number: 1,
    title: 'Пароли',
    description: 'Как создавать надёжные пароли и хранить их в безопасности',
    icon: 'KeyIcon',
    status: 'completed',
  },
  {
    id: 2,
    number: 2,
    title: 'Фишинг',
    description: 'Научись распознавать мошеннические письма',
    icon: 'FishIcon',
    status: 'completed',
  },
  {
    id: 3,
    number: 3,
    title: 'Фальшивые домены',
    description: 'Как распознавать поддельные сайты и домены',
    icon: 'GlobeIcon',
    status: 'current',
  },
  {
    id: 4,
    number: 4,
    title: 'Скам-сообщения',
    description: 'Как распознавать мошеннические сообщения и спам',
    icon: 'ChatWarningIcon',
    status: 'locked',
  },
  {
    id: 5,
    number: 5,
    title: 'Менеджер разрешенй',
    description: 'Как управлять разрешениями приложений',
    icon: 'ShieldIcon',
    status: 'locked',
  },
  {
    id: 6,
    number: 6,
    title: 'Финальное испытание',
    description: 'Проверь все свои знания о кибербезопасности',
    icon: 'TrophyIcon',
    status: 'locked',
    isFinal: true,
  },
]
