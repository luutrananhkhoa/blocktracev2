'use client';
import { FC } from "react"

type ButtonProps = {
  onClick?: () => void,
  title?: string,
  elementType?: string,
  className?: string
} & React.ComponentPropsWithRef<'button'>

const Button: FC<ButtonProps> = ({ onClick, title, elementType, className }) => {
  if(elementType === 'submit'){
    return (
      <button onClick={onClick} className={className} type="submit">
          {title}
      </button>
    )
  }else{
    return (
      <button onClick={onClick} className={className}>
          {title}
      </button>
    )
  }
 
}

export default Button