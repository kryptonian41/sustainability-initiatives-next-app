import React from 'react'
import HeaderLogo from '../../assets/svgs/logo.svg'
import styles from './styles.module.css'

interface Props {

}

export const Header = (props: Props) => {
  return (
    <div className={styles.container}>
      <HeaderLogo />
    </div>
  )
}
