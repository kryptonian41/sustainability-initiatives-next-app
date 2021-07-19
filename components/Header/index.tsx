import { Button } from '../Button'
import React from 'react'
import HeaderLogo from '../../assets/svgs/logo.svg'
import styles from './styles.module.css'

interface Props {

}

export const Header = (props: Props) => {
  return (
    <div className={styles.container}>
      <HeaderLogo />
      <div className={styles.body}>
        <div className={styles['sub-nav']}>
          <Button>GET IN TOUCH</Button>
        </div>
        <div className={styles.nav}>
          <ul>
            <li>About Us</li>
            <li>Initiatives</li>
            <li>Associates</li>
            <li>Support</li>
            <li>Blogs</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
