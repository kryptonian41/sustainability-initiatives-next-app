import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
}

export const Container: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={clsx('laptop:w-3/4 m-auto', className)}>
      {children}
    </div>
  )
}
