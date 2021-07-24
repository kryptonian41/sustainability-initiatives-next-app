import React from 'react'

interface Props {

}

export const Container: React.FC<Props> = ({ children }) => {
  return (
    <div className="laptop:w-3/4 m-auto">
      {children}
    </div>
  )
}
