import React from 'react';
import { prettyDate } from 'utils/helpers';
import { Article } from 'utils/types';
import styles from './style.module.css'
import Link from 'next/link'
interface PlainArticleTileProps {
  article: Article;
}

export const PlainArticleTile: React.FC<PlainArticleTileProps> = ({ article }) => {
  return <div className={styles.root}>
    <p className={styles.title}>{article.title}</p>
    <p className={styles.date}>Posted on {prettyDate(article.published_at)}</p>
    <p className={styles.summary}>{article.summary.slice(0, 90)}......
      <Link href={`/blog/${article.slug}`}><span>&nbsp; Read More &gt;</span></Link>
    </p>
  </div>;
};
