import React from "react";
import { Blog } from "utils/types";
import { useThemeContext } from "components/ThemeProvider";
import { prettyDate } from "utils/helpers";

interface Props {
  blogs: Blog[];
}

const BlogsList: React.FC<Props> = ({ blogs }) => {
  const { colors } = useThemeContext();
  return (
    <div className="my-20">
      {blogs.map((blog, index) => (
        <a href={blog.url} target="_blank" key={blog.id}>
          <div className="cursor-pointer">
            <div className="py-8">
              <h3 className="font-medium tablet:text-xl">{blog.title}</h3>
              <p>{blog.author.name}</p>
              <p
                className="text-sm"
                style={{ color: colors.text.light }}
              >{`${prettyDate(blog.published_date, "MMM dd")}, ${prettyDate(
                blog.published_date,
                "yyyy"
              )}`}</p>
            </div>
            {index < blogs.length - 1 && (
              <hr style={{ borderColor: colors.text.light }} />
            )}
          </div>
        </a>
      ))}
    </div>
  );
};

export default BlogsList;
