import { OutlineButton } from 'components/Button'
import React from 'react'
import { Initiative } from 'utils/types'
import styles from './styles.module.css'
import Link from 'next/link';
interface Props {
  initiave: Initiative
}

export const InitiaveTile: React.FC<Props> = ({ initiave }) => {
  return (
    <div className={styles.root}>
      <img src={initiave.icon.url} className={styles.icon} />
      <div className={styles.body}>
        <h3 className="text-xl font-medium">{initiave.title}</h3>
        <p className="mt-6">{initiave.shortDescription}</p>
        <div className="mt-6">
          <Link href={`/initiatives/${initiave.slug}`}>
            <OutlineButton>READ MORE</OutlineButton>
          </Link>
        </div>
      </div>
    </div>
  )
}
