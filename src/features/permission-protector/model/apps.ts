export type PermissionId = 'camera' | 'contacts' | 'location' | 'microphone' | 'gallery'

export interface Permission {
  id: PermissionId
  label: string
  icon: string
}

export interface AppScenario {
  id: number
  name: string
  emoji: string
  description: string
  requiredPermissions: PermissionId[]
  /** Explanations for each wrong answer (per permission) */
  hints: Partial<Record<PermissionId, string>>
}

export const ALL_PERMISSIONS: Permission[] = [
  { id: 'camera',     label: 'Камера',     icon: '📷' },
  { id: 'contacts',   label: 'Контакты',   icon: '👥' },
  { id: 'location',   label: 'Геолокация', icon: '📍' },
  { id: 'microphone', label: 'Микрофон',   icon: '🎙️' },
  { id: 'gallery',    label: 'Галерея',    icon: '🖼️' },
]

export const APP_SCENARIOS: AppScenario[] = [
  {
    id: 1,
    name: 'Навигатор',
    emoji: '🗺️',
    description:
      'Приложение для построения маршрутов и поиска мест поблизости. Прокладывает путь от точки А до точки Б и помогает не заблудиться.',
    requiredPermissions: ['location'],
    hints: {
      camera:   'Навигатору не нужна камера — он строит маршруты, а не делает фото.',
      contacts: 'Навигатору не нужны контакты — он работает с картами, а не со списком людей.',
      gallery:  'Навигатору не нужна галерея — он не редактирует фотографии.',
      microphone: 'Навигатору не нужен микрофон — он работает с картами, а не с голосовыми командами.',
    },
  },
  {
    id: 2,
    name: 'Фоторедактор',
    emoji: '🎨',
    description:
      'Инструмент для наложения фильтров и ретуши уже готовых снимков. Помогает сделать фото ещё лучше.',
    requiredPermissions: ['gallery', 'camera'],
    hints: {
      contacts:   'Фоторедактору не нужны контакты — он работает с фото, а не со списком людей.',
      location:   'Фоторедактору не нужна геолокация — он редактирует снимки, а не строит маршруты.',
      microphone: 'Фоторедактору не нужен микрофон — он работает с изображениями, а не звуком.',
    },
  },
  {
    id: 3,
    name: 'Мессенджер',
    emoji: '💬',
    description:
      'Приложение для текстовых сообщений, голосовых звонков и обмена файлами с друзьями.',
    requiredPermissions: ['contacts', 'microphone', 'gallery', 'camera'],
    hints: {
      location: 'Мессенджеру не нужна геолокация для основной работы — это лишний доступ.',
    },
  },
  {
    id: 4,
    name: 'Видеочат',
    emoji: '📹',
    description:
      'Платформа исключительно для проведения видеоконференций. Только звонки лицом к лицу — больше ничего.',
    requiredPermissions: ['camera', 'microphone'],
    hints: {
      contacts: 'Видеочату не нужны контакты — ты присоединяешься по ссылке или коду комнаты.',
      location: 'Видеочату не нужна геолокация — твоё местоположение для звонков не нужно.',
      gallery:  'Видеочату не нужна галерея — он предназначен только для видеозвонков.',
    },
  },
  {
    id: 5,
    name: 'Прогноз погоды',
    emoji: '🌤️',
    description:
      'Простой виджет, показывающий температуру и осадки для твоего города в реальном времени.',
    requiredPermissions: ['location'],
    hints: {
      camera:     'Прогноз погоды не нужна камера — приложение не снимает фото.',
      contacts:   'Контакты не нужны для погоды — оно работает с метеоданными, а не со списком людей.',
      microphone: 'Микрофон не нужен для погодного виджета — он не принимает голосовые команды.',
      gallery:    'Галерея не нужна приложению погоды — оно не работает с фотографиями.',
    },
  },
]
