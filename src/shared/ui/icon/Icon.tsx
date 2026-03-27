import RocketIcon from './icons/RocketIcon'

const iconsMap = {
  RocketIcon,
} as const

type iconName = keyof typeof iconsMap

interface IProps {
  icon: iconName
}

export function Icon({ icon }: IProps) {
  const IconComponent = iconsMap[icon]

  return IconComponent ? <IconComponent /> : null
}
