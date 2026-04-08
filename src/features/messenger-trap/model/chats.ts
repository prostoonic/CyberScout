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
  preview: string
  time: string
}

export const CHATS: Chat[] = [
  {
    id: 1,
    contactName: 'Служба безопасности',
    contactEmoji: '🛡️',
    time: '10:14',
    preview: 'Здравствуйте. Система безопасности...',
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
    preview: 'Привет, выручай срочно...',
    scamMessage:
      'Привет, выручай срочно. Я сейчас за границей, карта не работает. Можешь занять 50 евро? Я вечером верну.',
    options: [
      { id: 1, text: 'Сначала убедюсь, что это ты. Давай созвонимся.' },
      { id: 2, text: 'Без проблем, сейчас переведу деньги' },
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
    preview: 'Добрый день. Для предотвращения...',
    scamMessage:
      'Добрый день. Для предотвращения списания средств необходимо срочно подтвердить данные вашей карты. Напишите номер карты , срок действия и CVV.',
    options: [
      { id: 1, text: 'Я не передаю данные карты. Это конфиденциально.' },
      { id: 2, text: 'Хорошо, вот все данные карты' },
    ],
    goodOptionId: 1,
    goodEndingResponse: 'Эх, не получилось… обычно на это ведутся',
    badEndingResponse:
      'Отлично, данные получены. Сейчас проверим ваш баланс… ой, уже списали',
  },

  {
    id: 4,
    contactName: 'Wildberries',
    contactEmoji: '📦',
    time: '13:15',
    preview: 'Здравствуйте. Возникла проблема ...',
    scamMessage:
      'Здравствуйте. Возникла проблема с доставкой вашей посылки. Чтобы подтвердить адрес, перейдите по ссылке и введите данные. https://wildberries-support.ru/tracking/1234567890',
    options: [
      { id: 1, text: 'Я сам проверю заказ в приложении. По ссылкам не перехожу.' },
      { id: 2, text: 'Ок, перехожу по ссылке' },
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
    preview: 'Привет. Слушай, ты ...',
    scamMessage:
      'Привет. Слушай, ты на этом фото? Нашел в сети, очень похоже на тебя. Вот ссылка.',
    options: [
      { id: 1, text: 'Я не открываю ссылки. Скинь фото сюда.' },
      { id: 2, text: 'Сейчас открою, интересно' },
    ],
    goodOptionId: 1,
    goodEndingResponse: 'Не, так не интересно… открой лучше ссылку',
    badEndingResponse: 'Попался. Теперь у нас есть доступ к твоему устройству',
  },
]