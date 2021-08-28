import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string,
  [key: string]: any
}

export const Container: React.FC<Props> = ({ children, className, ...rest }) => {
  return (
    <div className={clsx('px-4 tablet:px-0 tablet:w-11/12 laptop:w-3/4 m-auto', className)} {...rest}>
      {children}
    </div>
  )
}
