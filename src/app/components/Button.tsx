'use client';
import { FC } from "react"

type ButtonProps = {
  onClick?: () => void,
  title?: string,
  type?: string
}

const Button: FC<ButtonProps> = ({ onClick, title, type }) => {
  return (
    <button onClick={onClick} className="bg-[#9252FE] hover:bg-[#5F2EB1] text-white font-bold py-4 px-16 rounded">
      {title}
    </button>
  )
}

export default Button