import React, { useEffect, useRef } from 'react'
import styles from './styles.module.css'

interface Props {
  label?: string,
  actions?: React.ReactNode
}

export const Heading: React.FC<Props> = ({ label, actions, children }) => {
  const elementRef = useRef(null)

  useEffect(() => {
    (async () => {
      const Splitting = (await import("splitting")).default
      Splitting({
        target: elementRef.current,
        by: 'words'
      })
    })()
  }, [])

  return (
    <div className={styles.container} ref={elementRef}>
      {children || label}
      <span className={styles.line}></span>
      {actions && <span className={styles.actionsContainer}>
        {actions}
      </span>}
    </div>
  )
}
