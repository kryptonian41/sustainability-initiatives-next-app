import React from 'react'
import { Article } from 'utils/types'

interface Props {
  articles: Article[]
}

export const RecentArticlesGrid: React.FC<Props> = ({ articles }) => {
  return (
    <div>
      {
        articles.slice(0, 3).map(article =>
          <div key={article.id}>
            {article.title}
          </div>
        )
      }
    </div>
  )
}


