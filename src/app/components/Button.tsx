'use client';
import { FC } from "react"

type ButtonProps = {
  onClick?: () => void,
  title?: string,
  type?: string,
  className?: string
}

const Button: FC<ButtonProps> = ({ onClick, title, type, className }) => {
  return (
    <button onClick={onClick} className={className} type={type}>
      {title}
    </button>
  )
}

export default Button