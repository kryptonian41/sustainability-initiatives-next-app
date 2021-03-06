import Pagination from "components/Pagination";
import { useThemeContext } from "components/ThemeProvider";
import { ArticleTile } from "components/Tiles/Article";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  prettyDate,
  sortArticlesByDate,
  sortArticlesByLocation,
} from "utils/helpers";
import { useDeviceMediaQuery, useMediaQuery } from "utils/hooks/useMediaQuery";
import { usePagination } from "utils/hooks/usePagination";
import { Article } from "utils/types";
import styles from "./style.module.css";
import FilterIcon from "../../assets/svgs/filter-icon.svg";
import { CSSTransition } from "react-transition-group";
import clsx from "clsx";
import { OutlineButton } from "components/Button";

interface BlogListProps {
  articles: Article[];
}
interface FilterDefinition {
  label: string;
  name: string;
  function: Function;
}

const filters: FilterDefinition[] = [
  {
    label: "Sort by Date",
    function: sortArticlesByDate,
    name: "sortByDate",
  },
  // {
  //   label: "Sort by Location",
  //   function: sortArticlesByLocation,
  //   name: "sortByLocation",
  // },
];

const getFilterFuncByName = (
  filters: FilterDefinition[],
  filterName: string
) => {
  return filters.find((filter) => filter.name === filterName);
};

export const BlogList: React.FC<BlogListProps> = ({ articles }) => {
  const {
    numberOfPages,
    endIndex,
    startIndex,
    setCurrentPage,
    currentPage,
  } = usePagination({
    totalItems: articles.length,
    initialItemsPerPage: 9,
    initialPageNumber: 1,
  });
  const [_articles, setArticles] = useState([...articles]);
  const [articlesToDisplay, setArticledToDisplay] = useState(
    _articles.slice(startIndex, endIndex)
  );
  const [filterName, setFilterName] = useState(null);
  const matchesLaptop = useDeviceMediaQuery("laptop");

  // Pagination Effect
  useEffect(() => {
    setArticledToDisplay(_articles.slice(startIndex, endIndex));
  }, [startIndex, endIndex, _articles]);

  // Sort Effect
  useEffect(() => {
    if (!filterName) return;
    const filterDefinition = getFilterFuncByName(filters, filterName);
    const filteredArticles = filterDefinition.function(articles);
    setArticles([...filteredArticles]);
  }, [filterName, articles]);

  // Update list of articles when initiative is changed
  useEffect(() => {
    setArticles([...articles]);
  }, [articles]);

  const createFilterClickHandler = useCallback(
    (filter: FilterDefinition) => () => {
      setFilterName(filter.name);
    },
    []
  );

  return (
    <div className="flex flex-col laptop:flex-row">
      {/* {matchesLaptop ? (
        <div className="w-1/6">
          <BlogFilters clickHandlerFactory={createFilterClickHandler} />
        </div>
      ) : (
        <div className="mb-8">
          <MobileBlogFilters clickHandlerFactory={createFilterClickHandler} />
        </div>
      )} */}
      <div className="flex-1">
        {articlesToDisplay.length > 0 ? (
          <>
            <div className="grid phone:grid-cols-2 laptop:grid-cols-3 gap-x-12">
              {articlesToDisplay.map((article) => {
                return (
                  <div className="mb-16 cursor-pointer" key={article.id}>
                    <ArticleTile
                      key={article.id}
                      title={article.title}
                      subtitle={`Posted on ${prettyDate(article.published_date || article.published_at)}`}
                      imgUrl={article.images[0].url}
                      body={article.summary}
                      actions={
                        <Link href={`/articles/${article.slug}`}>
                          <OutlineButton label="READ MORE" />
                        </Link>
                      }
                    />
                  </div>
                );
              })}
            </div>
            {numberOfPages > 0 && (
              <div className="tablet:mt-20">
                <Pagination
                  nextClickAction={() => setCurrentPage((page) => page + 1)}
                  prevClickAction={() => setCurrentPage((page) => page - 1)}
                  numberOfPages={numberOfPages}
                  selectedPage={currentPage}
                  pageBtnAction={(pageNumber) => setCurrentPage(pageNumber)}
                />
              </div>
            )}
          </>
        ) : (
          <h1 className="text-center text-3xl">No Articles Found</h1>
        )}
      </div>
    </div>
  );
};

interface BlogFilterProps {
  clickHandlerFactory: (...any) => any;
}

export const BlogFilters: React.FC<BlogFilterProps> = ({
  clickHandlerFactory,
}) => {
  const { colors } = useThemeContext();
  return (
    <>
      <h3 className="text-xl">Filters</h3>
      <hr
        className="my-4 no-outline border-none"
        style={{
          background: colors.secondary,
          height: 1,
        }}
      />
      {filters && (
        <ul>
          {filters.map((filter) => (
            <li
              key={filter.label}
              className={clsx(styles["filter-list--item"], "font-medium")}
              onClick={clickHandlerFactory(filter)}
            >
              {filter.label}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

interface MobileBlogFilterProps {
  clickHandlerFactory: (...any) => any;
}

const MobileBlogFilters: React.FC<MobileBlogFilterProps> = ({
  clickHandlerFactory,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const listener = () => setShowFilters(false);
    if (showFilters) {
      document.body.addEventListener("click", listener);
    }
    return () => document.body.removeEventListener("click", listener);
  }, [showFilters]);

  return (
    <div
      className="z-50"
      onClick={(e) => {
        e.stopPropagation();
        setShowFilters((v) => !v);
      }}
    >
      <div className="inline-flex items-center relative">
        <span className="text-2xl">Filters</span>
        <span className="ml-3">
          <FilterIcon />
        </span>
        <CSSTransition
          in={showFilters}
          classNames="filter-list"
          timeout={300}
          unmountOnExit
        >
          <ul className={styles["mobile-filter-list"]}>
            {filters.map((filter) => (
              <li
                key={filter.label}
                className={styles["mobile-filter-list--item"]}
                onClick={clickHandlerFactory(filter)}
              >
                {filter.label}
              </li>
            ))}
          </ul>
        </CSSTransition>
      </div>
    </div>
  );
};
