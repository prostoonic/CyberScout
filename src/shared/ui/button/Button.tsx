import { ReactNode } from "react"
import styles from "./button.module.css"
import clsx from "clsx"

interface IProps {
    variant: "primary" | "secondary",
    onClick: () => void,
    isDisable: boolean,
    children: ReactNode
}

export default function Button({variant, onClick,isDisable,children}:IProps) {
  return (
    <button className={clsx(styles.button, styles[variant], isDisable && styles.disabled) }onClick={onClick}>
      {children}
    </button>
  )
}
