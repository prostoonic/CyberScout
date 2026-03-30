export interface ChatOption {
  id: 1 | 2
  text: string
}

export interface Chat {
  id: number
  contactName: string
  contactEmoji: string
  scamMessage: string
  options: [ChatOption, ChatOption]
  goodOptionId: 1 | 2
  goodEndingResponse: string
  badEndingResponse: string
  /** Short preview shown in chat list */
  preview: string
  time: string
}

export const CHATS: Chat[] = [
  {
    id: 1,
    contactName: 'Служба безопасности',
    contactEmoji: '🛡️',
    time: '10:14',
    preview: 'Зафиксирован подозрительный вход...',
    scamMessage:
      'Здравствуйте. Система безопасности зафиксировала подозрительный вход в ваш аккаунт из другого города. Чтобы подтвердить, что это вы, и избежать немедленной блокировки, продиктуйте нам код из СМС.',
    options: [
      { id: 1, text: 'Я вам ничего не скину! Код — это секрет.' },
      { id: 2, text: 'Конечно. Вот код 0237' },
    ],
    goodOptionId: 1,
    goodEndingResponse:
      'Блин, а мы так серьезно всё подготовили, чтобы тебя взломать... Пойду поплачу в углу(((',
    badEndingResponse:
      'Ха-ха! Твоя бдительность на нуле. Теперь у нас есть полный доступ к твоему аккаунту!',
  },

  {
    id: 2,
    contactName: 'Друг',
    contactEmoji: '👤',
    time: '11:02',
    preview: 'Срочно нужна помощь...',
    scamMessage:
      'Привет, выручай срочно. Я сейчас за границей, карта не работает. Можешь занять 50 евро? Я вечером верну.',
    options: [
      { id: 1, text: 'Давай созвонимся, хочу убедиться, что это ты' },
      { id: 2, text: 'Ок, сейчас переведу деньги' },
    ],
    goodOptionId: 1,
    goodEndingResponse: 'Эм… сейчас не могу говорить. Давай потом…',
    badEndingResponse: 'Спасибо за перевод! Очень щедро с твоей стороны',
  },

  {
    id: 3,
    contactName: 'Банк',
    contactEmoji: '🏦',
    time: '12:47',
    preview: 'Подтвердите данные карты...',
    scamMessage:
      'Добрый день. Для предотвращения списания средств необходимо срочно подтвердить данные вашей карты. Напишите номер карты , срок действия и CVV.',
    options: [
      { id: 1, text: 'Я не буду передавать данные карты' },
      { id: 2, text: 'Хорошо, номер 1234 5678 9012 3456, срок 12/26, CVV 203' },
    ],
    goodOptionId: 1,
    goodEndingResponse: 'Эх, не получилось… обычно на это ведутся',
    badEndingResponse:
      'Отлично, данные получены. Сейчас проверим ваш баланс… ой, уже списали',
  },

  {
    id: 4,
    contactName: 'Маркетплейс',
    contactEmoji: '📦',
    time: '13:15',
    preview: 'Проблема с доставкой...',
    scamMessage:
      'Здравствуйте. Возникла проблема с доставкой вашей посылки. Чтобы подтвердить адрес, перейдите по ссылке и введите данные.',
    options: [
      { id: 1, text: 'Я сам зайду в приложение и проверю заказ' },
      { id: 2, text: 'Сейчас перейду по ссылке' },
    ],
    goodOptionId: 1,
    goodEndingResponse:
      'Ну и ладно… мы старались сделать ссылку максимально похожей(',
    badEndingResponse: 'Отлично, ты перешел. Теперь жди сюрприз с вирусом',
  },

  {
    id: 5,
    contactName: 'Знакомый',
    contactEmoji: '🙂',
    time: '14:03',
    preview: 'Посмотри фото...',
    scamMessage:
      'Привет. Слушай, ты на этом фото? Нашел в сети, очень похоже на тебя. Вот ссылка.',
    options: [
      { id: 1, text: 'Скинь фото сюда, я не открываю ссылки' },
      { id: 2, text: 'Сейчас открою, интересно' },
    ],
    goodOptionId: 1,
    goodEndingResponse: 'Не, так не интересно… открой лучше ссылку',
    badEndingResponse: 'Попался. Теперь у нас есть доступ к твоему устройству',
  },
]
