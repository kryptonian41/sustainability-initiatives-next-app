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
      <Link href={`/articles/${primaryPost.slug}`}>
        <div className={clsx("flex-shrink-0 cursor-pointer", styles.slideShowWrapper)}>
          <SlideShow
            images={primaryPost.images}
            title={primaryPost.title}
            subTitle={prettyDate(primaryPost.published_at)}
          />
        </div>
      </Link>
      <div className="flex flex-col">
        <Link href={`/articles/${secondaryPost.slug}`}>
          <div className={clsx("cursor-pointer", styles.slideShowWrapper)}>
            <div className="relative h-full">
              <img
                src={secondaryPost.images[0].url}
                alt={secondaryPost.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute text-white bottom-0 py-4 w-full px-6 tablet:px-4" style={{
                background: 'linear-gradient(to top, #000, transparent)'
              }}>
                <p className="text-lg">{secondaryPost.title}</p>
                <p className="text-sm">
                  {prettyDate(secondaryPost.published_at)}
                </p>
              </div>
            </div>
          </div>
        </Link>
        {restPosts.map((post) => {
          return (
            <div className="p-6 tablet:p-0 tablet:flex-1" key={post.id}>
              <PlainArticleTile article={post} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
