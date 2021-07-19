import React from 'react'
import HeaderLogo from '../../assets/svgs/logo.svg'
import styles from './styles.module.css'
console.log("🚀 ~ file: index.tsx ~ line 4 ~ styles", styles)

interface Props {

}

export const Header = (props: Props) => {
  return (
    <div className={styles.container}>
      <HeaderLogo />
    </div>
  )
}
