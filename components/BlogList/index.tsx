import Pagination from 'components/Pagination'
import { ArticleTile } from 'components/Tiles/Article'
import Link from 'next/link'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { prettyDate, sortArticlesByDate, sortArticlesByLocation } from 'utils/helpers'
import { usePagination } from 'utils/hooks/usePagination'
import { Article } from 'utils/types'

interface Props {
  articles: Article[]
}

const filters = [{
  label: 'Sort by Date',
  function: sortArticlesByDate
}, {
  label: 'Sort by Location',
  function: sortArticlesByLocation
}]

export const BlogList: React.FC<Props> = ({ articles }) => {
  const { numberOfPages, endIndex, startIndex, setCurrentPage, currentPage } = usePagination({
    totalItems: articles.length,
    initialItemsPerPage: 8,
    initialPageNumber: 1
  })
  const [_articles, setArticles] = useState([...articles])
  const [articlesToDisplay, setArticledToDisplay] = useState(_articles.slice(startIndex, endIndex))

  useEffect(() => {
    setArticledToDisplay(_articles.slice(startIndex, endIndex))
  }, [startIndex, endIndex, _articles])

  const createFilterClickHandler = useCallback((sortMethod) => () => {
    const sortedArticles = sortMethod(_articles)
    console.log("🚀 ~ file: index.tsx ~ line 36 ~ createFilterClickHandler ~ sortedArticles", sortedArticles)
    setArticles([...sortedArticles])
  }, [_articles])


  return (
    <div className="flex">
      <div className="w-1/4">
        <h3>Filters</h3>
        <hr className="my-4" />
        {filters &&
          <ul>
            {filters.map(filter =>
              <li
                key={filter.label}
                className="cursor-pointer"
                onClick={createFilterClickHandler(filter.function)}
              >
                {filter.label}
              </li>)
            }
          </ul>
        }
      </div>
      <div className="flex-1 px-10 ">
        <div className="grid grid-cols-2 gap-y-8 gap-x-12">
          {articlesToDisplay.map(article => {
            return <Link href={`/blog/${article.id}`} key={article.id}>
              <div className="mb-20 cursor-pointer" >
                <ArticleTile
                  key={article.id}
                  title={article.title}
                  subtitle={`Posted on ${prettyDate(article.published_at)}`}
                  imgUrl={article.images[0].url}
                  body={article.summary}
                />
              </div>
            </Link>
          })}
        </div>
        {numberOfPages > 0 && <div className="mt-20">
          <Pagination
            nextClickAction={() => setCurrentPage(page => page + 1)}
            prevClickAction={() => setCurrentPage(page => page - 1)}
            numberOfPages={numberOfPages}
            selectedPage={currentPage}
            pageBtnAction={pageNumber => setCurrentPage(pageNumber)}
          />
        </div>}
      </div>
    </div>
  )
}
