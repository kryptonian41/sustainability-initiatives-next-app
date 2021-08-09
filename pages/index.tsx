import { Container } from 'components/Container'
import { Header } from 'components/Header'
import { Heading } from 'components/Heading'
import Parallax, { Props as ParallaxProps } from 'components/Parallax'
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


const missionSection: ParallaxProps = {
  bgImg:
    "https://images.unsplash.com/photo-1498092651296-641e88c3b057?auto=format&fit=crop&w=1778&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
  title: "Our mission is to make the world sustainable",
  subTitle:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim iaculis purus pretium ultrices. Suspendisse et condim entum libero. Proin vehicula dolor nibh.",
  btnContent: "READ MORE ABOUT US",
};

const supportUsSection: ParallaxProps = {
  bgImg:
    "https://images.unsplash.com/photo-1498092651296-641e88c3b057?auto=format&fit=crop&w=1778&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
  title: "We believe that we can make more impact with your support",
  btnContent: "SUPPORT US",
  isLight: true
}


export const Home: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ recentArticles }) => {

  return (
    <div>
      <Container>
        <div className="mt-12">
          <RecentArticlesGrid articles={recentArticles}></RecentArticlesGrid>
        </div>
      </Container>
      <div className="my-32">
        <Parallax {...missionSection} />
      </div>

      <Container>
        <div className="mt-12">
          <Heading label="Our Initiatives" />
        </div>
        <div className="mt-12">
          <Heading label="Associates who stand with us" />
        </div>
      </Container>

      <div className="my-32">
        <Parallax {...supportUsSection} />
      </div>

    </div>
  )
}


export default Home