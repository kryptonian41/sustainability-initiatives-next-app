import React from "react";
import clsx from "clsx";
import { Article } from "utils/types";
import styles from "./styles.module.css";
import Link from "next/link";

interface Props {
  articles: Article[];
  dateColor: string;
  displayViewMore: boolean;
  authorId: number;
}

const Blogs: React.FC<Props> = ({
  articles,
  dateColor,
  displayViewMore,
  authorId,
}) => {
  const BlogSummary = (title: string, date: string) => {
    const dateObj = new Date(date);
    const day = dateObj.toLocaleString("default", { day: "2-digit" });
    const month = dateObj.toLocaleString("default", { month: "long" });
    const year = dateObj.toLocaleString("default", { year: "numeric" });
    return (
      <div className="my-6">
        <h3 className="font-medium tablet:text-xl">{title}</h3>
        <p style={{ color: dateColor }}>{`${month} ${day}, ${year}`}</p>
      </div>
    );
  };
  return (
    <div className={clsx("my-2", styles.container)}>
      <hr />
      <div className="py-8">
        <h2 className={clsx("text-xl uppercase mb-6", styles.title)}>Blogs</h2>
        {articles.map((article, index) => (
          <div key={index}>
            {BlogSummary(article.title, article.published_at)}
            {index < articles.length - 1 && (
              <hr style={{ borderColor: dateColor }} />
            )}
          </div>
        ))}
        {displayViewMore && (
          <div className={styles.link}>
            <Link href={`/articles?authour=${authorId}`}>
              More Articles &gt;
            </Link>
          </div>
        )}
      </div>
      <hr />
    </div>
  );
};

export default Blogs;
