import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string,
  fullWidth?: boolean,
  [key: string]: any,

}

export const Container: React.FC<Props> = ({ fullWidth, children, className, style, ...rest }) => {
  return (
    <div className={clsx('px-4 tablet:px-0 tablet:w-11/12 laptop:w-3/4 m-auto', className)} {...rest} style={{
      ...style,
      padding: fullWidth && 0
    }}>
      {children}
    </div>
  )
}
