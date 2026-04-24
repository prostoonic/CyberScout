export interface Domain {
  id: number
  value: string
  isPhishing: boolean
  legitimateTip?: string
}

export interface DomainRound {
  id: number
  question: string
  domains: Domain[]
  phishingExplanation: string
  phishingTactic: string
}

export const DOMAIN_ROUNDS: DomainRound[] = [
  {
    id: 1,
    question: 'Среди этих адресов есть фишинговый. Попробуй его вычислить! ',
    phishingExplanation:
      'Адрес «y0utube.com» использует цифры «0» вместо букв «o». Это распространённый приём: мошенники заменяют похожие символы, чтобы сайт выглядел настоящим.',
    phishingTactic: 'Замена букв на похожие цифры (o → 0)',
    domains: [
      { id: 1, value: 'twitch.tv', isPhishing: false },
      { id: 2, value: 'google.com', isPhishing: true },
      { id: 3, value: 'y0utube.com', isPhishing: false },
      { id: 4, value: 'discord.com', isPhishing: false },
    ],
  },
  {
    id: 2,
    question: 'Среди этих сайтов есть фишинговый. Попробуй его вычислить! ',
    phishingExplanation:
      'Адрес «te1egram.org» выглядит почти как настоящий Telegram, но буква «l» заменена на цифру «1». Внимательно проверяй каждую букву в адресе сайта! ',
    phishingTactic: 'Замена буквы «l» на цифру «1»',
    domains: [
      { id: 1, value: 'vk.com', isPhishing: false },
      { id: 2, value: 'youtube.com', isPhishing: false },
      { id: 3, value: 'te1egram.org', isPhishing: true },
      { id: 4, value: 'yandex.ru', isPhishing: false },
    ],
  },
  {
    id: 3,
    question: 'Среди этих сайтов есть фишинговый. Попробуй его вычислить! ',
    phishingExplanation:
      'Адрес «vk-login-secure.ru» — поддельный. Настоящий ВКонтакте находится на vk.com. Если в адресе есть лишние слова (login, secure, verify), это признак фишинга.',
    phishingTactic: 'Добавление лишних слов к настоящему бренду',
    domains: [
      { id: 1, value: 'instagram.com', isPhishing: false },
      { id: 2, value: 'vk-login-secure.ru', isPhishing: true },
      { id: 3, value: 'facebook.com', isPhishing: false },
      { id: 4, value: 'vk.com', isPhishing: false },
    ],
  },
  {
    id: 4,
    question: 'Среди этих сайтов есть фишинговый. Попробуй его вычислить! ',
    phishingExplanation:
      '«roblox.secure.net» — поддельный сайт. Настоящий Роблокс работает на домене roblox.com. Мошенники используют «.net» вместо «.com» и добавляют слова «online», «secure» для обмана.',
    phishingTactic: 'Неправильная доменная зона + лишние слова',
    domains: [
      { id: 1, value: 'belarusbank.by', isPhishing: false },
      { id: 2, value: 'spotify.com', isPhishing: false },
      { id: 3, value: 'roblox.secure.net', isPhishing: true },
      { id: 4, value: 'mail.ru', isPhishing: false },
    ],
  },
  {
    id: 5,
    question: 'Среди этих сайтов есть фишинговый. Попробуй его вычислить! ',
    phishingExplanation:
      '«steam-gifts-free.ru» — фишинговый сайт. Настоящий Steam находится на store.steampowered.com. Сайты с «free», «gifts», «bonus» в адресе почти всегда пытаются тебя обмануть.',
    phishingTactic: 'Слова «free» и «gifts» в адресе — ловушка',
    domains: [
      { id: 1, value: 'minecraft.net', isPhishing: false },
      { id: 2, value: 'steam-gifts-free.ru', isPhishing: true },
      { id: 3, value: 'roblox.com', isPhishing: false },
      { id: 4, value: 'epicgames.com', isPhishing: false },
    ],
  },
]
