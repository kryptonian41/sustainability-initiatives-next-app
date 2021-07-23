import React, { useLayoutEffect, useRef } from 'react'
import styles from './styles.module.css'
import Splitting from "splitting";

interface Props {
  label: string,
  actions: React.ReactNode
}

export const Heading = ({ label, actions }: Props) => {
  const elementRef = useRef(null)
  useLayoutEffect(() => {
    Splitting({
      target: elementRef.current,
      by: 'words'
    })
  }, [])
  return (
    <div className={styles.container} ref={elementRef}>
      {/* TODO: Use splitting text achieve the desired look on mobile devices */}
      {label}
      <span className={styles.line}></span>
      {actions && <span className={styles.actionsContainer}>
        {actions}
      </span>}
    </div>
  )
}
