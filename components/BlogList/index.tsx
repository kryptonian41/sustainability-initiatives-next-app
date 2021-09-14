import Pagination from 'components/Pagination'
import { useThemeContext } from 'components/ThemeProvider'
import { ArticleTile } from 'components/Tiles/Article'
import Link from 'next/link'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { prettyDate, sortArticlesByDate, sortArticlesByLocation } from 'utils/helpers'
import { useMediaQuery } from 'utils/hooks/useMediaQuery'
import { usePagination } from 'utils/hooks/usePagination'
import { Article } from 'utils/types'
import styles from './style.module.css'
import FilterIcon from "../../assets/svgs/filter-icon.svg";
import { CSSTransition } from 'react-transition-group'

interface BlogListProps {
  articles: Article[]
}
interface FilterDefinition {
  label: string,
  name: string,
  function: Function
}

const filters: FilterDefinition[] = [{
  label: 'Sort by Date',
  function: sortArticlesByDate,
  name: 'sortByDate'
}, {
  label: 'Sort by Location',
  function: sortArticlesByLocation,
  name: 'sortByLocation'
}]

const getFilterFuncByName = (filters: FilterDefinition[], filterName: string) => {
  return filters.find(filter => filter.name === filterName)
}

export const BlogList: React.FC<BlogListProps> = ({ articles }) => {
  const { numberOfPages, endIndex, startIndex, setCurrentPage, currentPage } = usePagination({
    totalItems: articles.length,
    initialItemsPerPage: 8,
    initialPageNumber: 1
  })
  const [_articles, setArticles] = useState([...articles])
  const [articlesToDisplay, setArticledToDisplay] = useState(_articles.slice(startIndex, endIndex))
  const [filterName, setFilterName] = useState(null)
  const { breakpoints } = useThemeContext()
  const { matches: matchesTablet } = useMediaQuery(`(max-width: ${breakpoints.tablet}px)`)

  // Pagination Effect
  useEffect(() => {
    setArticledToDisplay(_articles.slice(startIndex, endIndex))
  }, [startIndex, endIndex, _articles])

  // Sort Effect
  useEffect(() => {
    if (!filterName) return
    const filterDefinition = getFilterFuncByName(filters, filterName)
    const filteredArticles = filterDefinition.function(articles)
    setArticles([...filteredArticles])
  }, [filterName, articles])

  const createFilterClickHandler = useCallback((filter: FilterDefinition) => () => {
    setFilterName(filter.name)
  }, [])


  return (
    <div className="flex flex-col tablet:flex-row">
      {
        matchesTablet ?
          <div className="mb-8">
            <MobileBlogFilters clickHandlerFactory={createFilterClickHandler} />
          </div>
          :
          <div className="w-1/4">
            <BlogFilters clickHandlerFactory={createFilterClickHandler} />
          </div>
      }
      <div className="flex-1 tablet:px-10">
        <div className="grid tablet:grid-cols-2 gap-x-12">
          {articlesToDisplay.map(article => {
            return <Link href={`/blog/${article.slug}`} key={article.id}>
              <div className="mb-16 cursor-pointer" >
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
        {numberOfPages > 0 && <div className="tablet:mt-20">
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

interface BlogFilterProps {
  clickHandlerFactory: (...any) => any,
}

export const BlogFilters: React.FC<BlogFilterProps> = ({ clickHandlerFactory }) => {
  return <>
    <h3 className="text-xl">Filters</h3>
    <hr className="my-4" />
    {filters &&
      <ul>
        {filters.map(filter =>
          <li
            key={filter.label}
            className={styles['filter-list--item']}
            onClick={clickHandlerFactory(filter)}
          >
            {filter.label}
          </li>)
        }
      </ul>
    }
  </>
}

interface MobileBlogFilterProps {
  clickHandlerFactory: (...any) => any,
}

const MobileBlogFilters: React.FC<MobileBlogFilterProps> = ({ clickHandlerFactory }) => {
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const listener = () => setShowFilters(false)
    if (showFilters) {
      document.body.addEventListener('click', listener)
    }
    return () => document.body.removeEventListener('click', listener)
  }, [showFilters])

  return <div className="z-50" onClick={(e) => {
    e.stopPropagation()
    setShowFilters(v => !v)
  }}>
    <div className="inline-flex items-center relative">
      <span className="text-2xl">Filters</span>
      <span className="ml-3">
        <FilterIcon />
      </span>
      <CSSTransition in={showFilters} classNames="filter-list" timeout={300} unmountOnExit>
        <ul className={styles['mobile-filter-list']}>
          {
            filters.map(filter =>
              <li
                key={filter.label}
                className={styles['mobile-filter-list--item']}
                onClick={clickHandlerFactory(filter)}
              >
                {filter.label}
              </li>)
          }
        </ul>
      </CSSTransition>
    </div>
  </div>

}