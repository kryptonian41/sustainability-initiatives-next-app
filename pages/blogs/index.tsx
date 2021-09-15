import { BlogList } from 'components/BlogList'
import { Container } from 'components/Container'
import { GetServerSideProps } from 'next'
import React from 'react'
import { getArticlesByAuthor } from 'utils/api/client-side-api'
import { Article } from 'utils/types'

interface Props {
  articles: Article[]
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const { authorId } = query
  const articles = await getArticlesByAuthor(parseInt(authorId as string))
  return {
    props: {
      articles,
    }
  }
}

export const Blogs: React.FC<Props> = ({ articles }) => {
  return (
    <div>
      <Container className="my-20">
        <BlogList articles={articles} />
      </Container>
    </div>
  )
}
