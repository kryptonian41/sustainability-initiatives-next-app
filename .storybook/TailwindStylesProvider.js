import React from 'react'
import '../styles/globals.css'

function TailwindStylesProvider({ children }) {
  return (
    <div>
      {children}
    </div>
  )
}

export default TailwindStylesProvider
