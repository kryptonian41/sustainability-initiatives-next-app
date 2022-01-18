import React, { PropsWithChildren } from 'react'
import styles from './styles.module.css'
import clsx from 'clsx'

interface Props {
  imgUrl: string,
  title: string,
  subtitle: string,
  body: string,
  actions?: React.ReactNode
}

export const ArticleTile = ({ body, imgUrl, subtitle, title, actions }: PropsWithChildren<Props>) => {
  return (
    <div className={styles.container}>
      <img src={imgUrl} alt="" className={styles.image} />
      <p className={styles.title}>{title}</p>
      {/* <p className={styles.subtitle}>{subtitle}</p> */}
      <p className={clsx(styles.body, "font-medium")}>{body}</p>
      {actions &&
        <div className={styles.actionContainer}>
          {actions}
        </div>
      }
    </div>
  )
}
