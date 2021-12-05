import clsx from 'clsx'
import React from 'react'
import styles from "./styles.module.css"

interface Props {
  className?: string,
  fullWidth?: boolean,
  [key: string]: any,

}

export const Container: React.FC<Props> = ({ fullWidth, children, className, style, ...rest }) => {
  return (
    <div className={clsx('px-4 tablet:px-6 m-auto', className, styles.container)} {...rest} style={{
      ...style,
      padding: fullWidth && 0
    }}>
      {children}
    </div>
  )
}
