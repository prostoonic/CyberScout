export interface Domain {
  id: number
  value: string
  isPhishing: boolean
  /** shown only for legit domains: why it's trustworthy */
  legitimateTip?: string
}

export interface DomainRound {
  id: number
  question: string
  domains: Domain[]
  /** explanation shown in the error modal when user picks wrong */
  phishingExplanation: string
  /** what tactic was used */
  phishingTactic: string
}

export const DOMAIN_ROUNDS: DomainRound[] = [
  {
    id: 1,
    question: 'Один из этих адресов — поддельный сайт Google. Найди его!',
    phishingExplanation:
      'Адрес «g00gle.com» использует цифры «0» вместо букв «o». Это распространённый приём: мошенники заменяют похожие символы, чтобы сайт выглядел настоящим.',
    phishingTactic: 'Замена букв на похожие цифры (o → 0)',
    domains: [
      { id: 1, value: 'google.com', isPhishing: false },
      { id: 2, value: 'g00gle.com', isPhishing: true },
      { id: 3, value: 'github.com', isPhishing: false },
      { id: 4, value: 'amazon.com', isPhishing: false },
    ],
  },
  {
    id: 2,
    question: 'Среди этих сайтов есть фишинговый. Попробуй его вычислить!',
    phishingExplanation:
      'Адрес «paypa1.com» выглядит почти как настоящий PayPal, но буква «l» заменена на цифру «1». Внимательно проверяй каждую букву в адресе сайта!',
    phishingTactic: 'Замена буквы «l» на цифру «1»',
    domains: [
      { id: 1, value: 'vk.com', isPhishing: false },
      { id: 2, value: 'youtube.com', isPhishing: false },
      { id: 3, value: 'paypa1.com', isPhishing: true },
      { id: 4, value: 'yandex.ru', isPhishing: false },
    ],
  },
  {
    id: 3,
    question: 'Здесь спрятан фальшивый сайт ВКонтакте. Найди его!',
    phishingExplanation:
      'Адрес «vk-login-secure.ru» — поддельный. Настоящий ВКонтакте находится на vk.com. Если в адресе есть лишние слова (login, secure, verify), это признак фишинга.',
    phishingTactic: 'Добавление лишних слов к настоящему бренду',
    domains: [
      { id: 1, value: 'instagram.com', isPhishing: false },
      { id: 2, value: 'vk-login-secure.ru', isPhishing: true },
      { id: 3, value: 'facebook.com', isPhishing: false },
      { id: 4, value: 'vk.com', isPhishing: false },
    ],
  },
  {
    id: 4,
    question: 'Один из этих банковских сайтов — подделка. Какой?',
    phishingExplanation:
      '«sberbank-online-secure.com» — поддельный сайт. Настоящий Сбербанк работает на домене sberbank.ru. Мошенники используют «.com» вместо «.ru» и добавляют слова «online», «secure» для обмана.',
    phishingTactic: 'Неправильная доменная зона + лишние слова',
    domains: [
      { id: 1, value: 'sberbank.ru', isPhishing: false },
      { id: 2, value: 'gosuslugi.ru', isPhishing: false },
      { id: 3, value: 'sberbank-online-secure.com', isPhishing: true },
      { id: 4, value: 'mail.ru', isPhishing: false },
    ],
  },
  {
    id: 5,
    question: 'Последний уровень! Один из игровых сайтов — мошеннический.',
    phishingExplanation:
      '«steam-gifts-free.ru» — фишинговый сайт. Настоящий Steam находится на store.steampowered.com. Сайты с «free», «gifts», «bonus» в адресе почти всегда пытаются тебя обмануть.',
    phishingTactic: 'Слова «free» и «gifts» в адресе — ловушка',
    domains: [
      { id: 1, value: 'minecraft.net', isPhishing: false },
      { id: 2, value: 'steam-gifts-free.ru', isPhishing: true },
      { id: 3, value: 'roblox.com', isPhishing: false },
      { id: 4, value: 'epicgames.com', isPhishing: false },
    ],
  },
]
