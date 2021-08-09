import { Container } from 'components/Container'
import { Header } from 'components/Header'
import { Heading } from 'components/Heading'
import { RecentArticlesGrid } from 'components/RecentArticlesGrid'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { API } from 'utils/api'
import { Article } from 'utils/types'
import styles from '../styles/Home.module.css'
interface Props {
  recentArticles: Article[]
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const recentArticles = await API.getRecentArticles()
  return {
    props: {
      recentArticles
    }
  }
}

export const Home: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ recentArticles }) => {

  return (
    <div>
      <Container>
        <Header />
        <div className="mt-12">
          <RecentArticlesGrid articles={recentArticles}></RecentArticlesGrid>
        </div>
        <div className="mt-12">
          <Heading label="Our Initiatives" />
        </div>

      </Container>
    </div>
  )
}


export default Home