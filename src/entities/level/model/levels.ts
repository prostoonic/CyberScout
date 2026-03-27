export type LevelStatus = 'completed' | 'current' | 'locked'

export interface Level {
  id: number
  number: number
  title: string
  description: string
  icon: string
  status: LevelStatus
  isFinal?: boolean
  starsEarned?: number
  maxStars?: number
}

export const LEVELS: Level[] = [
  {
    id: 1,
    number: 1,
    title: 'Пароли',
    description: 'Как создавать надёжные пароли и хранить их в безопасности',
    icon: 'KeyIcon',
    status: 'completed',
    starsEarned: 3,
    maxStars: 3,
  },
  {
    id: 2,
    number: 2,
    title: 'Фишинг',
    description: 'Научись распознавать мошеннические письма и сайты',
    icon: 'FishIcon',
    status: 'completed',
  },
  {
    id: 3,
    number: 3,
    title: 'Личные данные',
    description: 'Какую информацию можно публиковать в интернете',
    icon: 'ShieldIcon',
    status: 'current',
  },
  {
    id: 4,
    number: 4,
    title: 'Кибербуллинг',
    description: 'Как вести себя и защититься от травли в сети',
    icon: 'ChatWarningIcon',
    status: 'locked',
  },
  {
    id: 5,
    number: 5,
    title: 'Безопасный интернет',
    description: 'Правила безопасного поведения в цифровом мире',
    icon: 'GlobeIcon',
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
