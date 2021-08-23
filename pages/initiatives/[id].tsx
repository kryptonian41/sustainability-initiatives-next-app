import clsx from 'clsx'
import { BlogList } from 'components/BlogList'
import { Container } from 'components/Container'
import { Heading } from 'components/Heading'
import { GetServerSideProps } from 'next'
import React from 'react'
import { getArticledByInitiative, getInitiaveById } from 'utils/api/client-side-api'
import { Article, Initiative } from 'utils/types'
import styles from './styles.module.css'

interface Props {
  initiative: Initiative,
  articles: Article[]
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const { id } = params
  const initiativeId = parseInt(id as string)
  const articles = await getArticledByInitiative(initiativeId)
  const initiative = await getInitiaveById(initiativeId)
  return {
    props: {
      initiative,
      articles,
    }
  }
}
const Initiaves: React.FC<Props> = ({ articles, initiative }) => {
  return (
    <div className="py-20">
      <div className={clsx(styles.heroContainer)}>
        <Container className="flex items-center">
          <div className="flex-1 pr-12">
            <Heading label={initiative.title} key={initiative.title} />
            <p className="mt-10">{initiative.description}</p>
          </div>
          <div className="w-2/6">
            <img src={initiative.icon.url} alt={`${initiative.title} Icon`} className="block w-full" />
          </div>
        </Container>
      </div>

      <Container className="my-20">
        <BlogList articles={articles} />
      </Container>

    </div>
  )
}

export default Initiaves
