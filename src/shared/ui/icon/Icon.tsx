import RocketIcon from './icons/RocketIcon'
import KeyIcon from './icons/KeyIcon'
import FishIcon from './icons/FishIcon'
import ShieldIcon from './icons/ShieldIcon'
import ChatWarningIcon from './icons/ChatWarningIcon'
import GlobeIcon from './icons/GlobeIcon'
import TrophyIcon from './icons/TrophyIcon'
import LockIcon from './icons/LockIcon'
import StarIcon from './icons/StarIcon'
import CheckIcon from './icons/CheckIcon'
import EyeIcon from './icons/EyeIcon'
import EyeOffIcon from './icons/EyeOffIcon'

const iconsMap = {
  RocketIcon,
  KeyIcon,
  FishIcon,
  ShieldIcon,
  ChatWarningIcon,
  GlobeIcon,
  TrophyIcon,
  LockIcon,
  StarIcon,
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
} as const

export type IconName = keyof typeof iconsMap

interface IProps {
  icon: IconName
  className?: string
}

export function Icon({ icon, className }: IProps) {
  const IconComponent = iconsMap[icon]

  return IconComponent ? (
    <span className={className} aria-hidden="true">
      <IconComponent />
    </span>
  ) : null
}
