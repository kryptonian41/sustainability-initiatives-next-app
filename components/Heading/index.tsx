import React from 'react'
import styles from './styles.module.css'

interface Props {
  label: string,
  actions: React.ReactNode
}

export const Heading = ({ label, actions }: Props) => {
  return (
    <div className={styles.container}>
      <span className={styles.label}>{label}</span>
      <span className={styles.line}></span>
      {actions && <span className={styles.actionsContainer}>
        {actions}
      </span>}
    </div>
  )
}
