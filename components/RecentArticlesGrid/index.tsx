import clsx from "clsx";
import { SlideShow } from "components/SlideShow";
import React, { useMemo } from "react";
import { prettyDate } from "utils/helpers";
import { Article } from "utils/types";
import { PlainArticleTile } from "../Tiles/PlainArticleTIle";
import styles from "./styles.module.css";
import Link from "next/link";
import { useDeviceMediaQuery } from "utils/hooks/useMediaQuery";
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

  const isMobile = useDeviceMediaQuery("phone");

  return (
    <div className={clsx(styles.root)}>
      <Link href={`/articles/${primaryPost.slug}`}>
        <div
          className={clsx(
            "flex-shrink-0 cursor-pointer",
            styles.slideShowWrapper
          )}
        >
          <SlideShow
            images={primaryPost.images}
            title={primaryPost.title}
            subTitle={
              primaryPost.published_date
                ? prettyDate(primaryPost.published_date)
                : ""
            }
            size={isMobile ? "small" : "medium"}
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
              <div
                className="absolute text-white bottom-0 py-4 w-full px-4 phone:px-6 tablet:px-4"
                style={{
                  background: "linear-gradient(to top, #000, transparent)",
                }}
              >
                <p className="text-lg">{secondaryPost.title}</p>
                <p className="text-sm">
                  {secondaryPost.published_date
                    ? prettyDate(secondaryPost.published_date)
                    : ""}
                </p>
              </div>
            </div>
          </div>
        </Link>
        {restPosts.map((post) => {
          return (
            <div className="pt-6 tablet:p-0 tablet:flex-1" key={post.id}>
              <PlainArticleTile article={post} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
