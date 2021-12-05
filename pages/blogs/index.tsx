import { Container } from "components/Container";
import React from "react";
import { getBlogs } from "utils/api/client-side-api";
import { Blog } from "utils/types";
import BlogsList from "components/Blogs/BlogsList";

interface Props {
  blogs: Blog[];
}

export const getServerSideProps = async () => {
  const blogs = await getBlogs();
  return {
    props: {
      blogs,
    },
  };
};

const Blogs: React.FC<Props> = ({ blogs }) => {
  return (
    <div>
      <Container>{blogs.length > 0 && <BlogsList blogs={blogs} />}</Container>
    </div>
  );
};

export default Blogs;
