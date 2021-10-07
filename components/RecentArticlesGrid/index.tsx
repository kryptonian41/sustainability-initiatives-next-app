import clsx from "clsx";
import { SlideShow } from "components/SlideShow";
import React, { useMemo } from "react";
import { prettyDate } from "utils/helpers";
import { Article } from "utils/types";
import { PlainArticleTile } from "../Tiles/PlainArticleTIle";
import styles from "./styles.module.css";
import Link from "next/link";
interface Props {
  articles: Article[];
}

export const RecentArticlesGrid: React.FC<Props> = ({ articles }) => {
  const { primaryPost, secondaryPost, restPosts } = useMemo(() => {
    return {
      primaryPost: articles[0] ?? null,
      secondaryPost: articles[1] ?? null,
      restPosts: articles.slice(2, Math.min(articles.length, 4)) ?? null,
    };
  }, [articles]);

  return (
    <div className={clsx(styles.root)}>
      <div className={clsx("flex-shrink-0", styles.slideShowWrapper)}>
        <Link href={`/blog/${primaryPost.slug}`}>
          <SlideShow
            images={primaryPost.images}
            title={primaryPost.title}
            subTitle={prettyDate(primaryPost.published_at)}
          />
        </Link>
      </div>
      <div className="flex flex-col">
        <div className={clsx("cursor-pointer", styles.slideShowWrapper)}>
          <Link href={`/blog/${secondaryPost.slug}`}>
            <div className="relative h-full">
              <img
                src={secondaryPost.images[0].url}
                alt={secondaryPost.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute text-white bottom-4 w-full px-6 tablet:px-4">
                <p className="text-lg">{secondaryPost.title}</p>
                <p className="text-sm">
                  {prettyDate(secondaryPost.published_at)}
                </p>
              </div>
            </div>
          </Link>
        </div>
        {restPosts.map((post) => {
          return (
            <div className="p-6 tablet:p-0 tablet:flex-1">
              <PlainArticleTile article={post} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
