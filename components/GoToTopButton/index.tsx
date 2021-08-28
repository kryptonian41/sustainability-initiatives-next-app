import React, { useCallback } from 'react'
import styles from './styles.module.css'

interface Props {

}

export const GoToTopButton = (props: Props) => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])
  return (
    <div className={styles.root}>
      <button onClick={scrollToTop} className={styles.button}></button>
    </div>
  )
}
