import clsx from 'clsx';
import { Container } from 'components/Container';
import { SocialPanel } from 'components/SocialPanel';
import { GetStaticPaths, GetStaticProps } from 'next';
import React, { useMemo } from 'react'
import sanitizeHtml from 'sanitize-html';
import { getArticleById, getArticles } from 'utils/api/client-side-api';
import { prettyDate } from 'utils/helpers';
import { Article } from 'utils/types';
import styles from './styles.module.css'
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
  const articleDate = useMemo(() => `${prettyDate(article.published_at, 'd MMMM')} '${prettyDate(article.published_at, 'yy')}`, [article])

  return (
    <div className="py-20">
      {article?.heroImage && <Container className="h-96 mb-20">
        <img src={article.heroImage.url} className="object-cover w-full h-full" alt="" />
      </Container>
      }

      <Container className="flex">
        <div className="w-1/5 mr-10">
          <p className={styles.date}>{articleDate}</p>
          <hr className="mt-3" />
          <div className="mt-10">
            <p className="mb-6">Share:</p>
            <div>
              <SocialPanel iconColor="#fff" />
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h3 className={clsx("text-2xl mb-10", styles.title)}>{article.title}</h3>
          <div className="body" dangerouslySetInnerHTML={{
            __html: sanitizeHtml(article.body, {
              allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
            })
          }}></div>
        </div>
      </Container>
    </div>
  )
}

export default BlogPage
