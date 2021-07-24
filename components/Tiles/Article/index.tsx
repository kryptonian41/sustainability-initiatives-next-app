import React, { PropsWithChildren } from 'react'
import styles from './styles.module.css'
import Image from 'next/image'
export interface ArticleInfo {

}

interface Props {
  imgUrl: StaticImageData,
  title: string,
  subtitle: string,
  body: string,
  actions: React.ReactNode
}

export const ArticleTile = ({ body, imgUrl, subtitle, title, actions }: PropsWithChildren<Props>) => {
  return (
    <div className={styles.container}>
      <Image src={imgUrl} alt="" className={styles.image} layout="responsive" />
      <p className={styles.title}>{title}</p>
      <p className={styles.subtitle}>{subtitle}</p>
      <p className={styles.body}>{body}</p>
      {actions &&
        <div className={styles.actionContainer}>
          {actions}
        </div>
      }
    </div>
  )
}
