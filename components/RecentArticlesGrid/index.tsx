import clsx from 'clsx'
import { SlideShow } from 'components/SlideShow'
import React, { useMemo } from 'react'
import { prettyDate } from 'utils/helpers'
import { Article } from 'utils/types'
import { PlainArticleTile } from '../Tiles/PlainArticleTIle'
import styles from './styles.module.css'
import Link from 'next/link'
interface Props {
  articles: Article[]
}

export const RecentArticlesGrid: React.FC<Props> = ({ articles }) => {
  const { primaryPost, secondaryPost, restPosts } = useMemo(() => {
    return {
      primaryPost: articles[0] ?? null,
      secondaryPost: articles[1] ?? null,
      restPosts: articles.slice(2, Math.min(articles.length, 4)) ?? null,
    }
  }, [articles])

  return (
    <div className={clsx(styles.root)}>
      <div className={clsx('flex-shrink-0', styles.slideShowWrapper)}>
        <Link href={`/blog/${primaryPost.slug}`}>
          <SlideShow images={primaryPost.images} title={primaryPost.title} subTitle={prettyDate(primaryPost.published_at)} />
        </Link>
      </div>
      <div className="flex flex-col">
        <div className={clsx("tablet:h-2/5", styles.slideShowWrapper)}>
          <Link href={`/blog/${secondaryPost.slug}`}>
            <SlideShow images={secondaryPost.images} title={secondaryPost.title} subTitle={prettyDate(secondaryPost.published_at)} size="small" />
          </Link>
        </div>
        {restPosts.map(post => {
          return <div className="p-6 tablet:flex-1">
            <PlainArticleTile article={post} />
          </div>
        })}
      </div>
    </div>
  )
}


