import { Container } from 'components/Container';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react'
import sanitizeHtml from 'sanitize-html';
import { getArticleById, getArticles } from 'utils/api/client-side-api';
import { Article } from 'utils/types';

interface Props {
  article: Article
}


export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getArticles()
  const paths = articles.slice(0, Math.min(10, articles.length)).map(article => `/blog/${article.id}`)
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const { id } = params
  return {
    props: {
      article: await getArticleById(parseInt(id as string))
    },
    revalidate: 60000
  }
}

const BlogPage: React.FC<Props> = ({ article }) => {

  return (
    <div className="py-20">
      <Container className="body" dangerouslySetInnerHTML={{
        __html: sanitizeHtml(article.body, {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
        })
      }}></Container>
    </div>
  )
}

export default BlogPage
