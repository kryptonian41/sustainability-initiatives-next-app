import { Container } from 'components/Container'
import { Header } from 'components/Header'
import { Heading } from 'components/Heading'
import Parallax, { Props as ParallaxProps } from 'components/Parallax'
import PhotoGrid from 'components/PhotoGrid'
import { GridItem } from 'components/PhotoGrid/GridPhoto'
import { RecentArticlesGrid } from 'components/RecentArticlesGrid'
import { InitiaveTile } from 'components/Tiles/InitiativeTile'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useMemo } from 'react'
import { API } from 'utils/api'
import { Article, Initiative, StakeHolder } from 'utils/types'
import styles from '../styles/Home.module.css'
interface Props {
  recentArticles: Article[],
  initiatives: Initiative[],
  stakeHolders: StakeHolder[]
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const recentArticles = await API.getRecentArticles()
  const initiatives = await API.getInitiatives()
  const stakeHolders = await API.getStakeHolders()
  return {
    props: {
      recentArticles,
      initiatives,
      stakeHolders
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
> = ({ recentArticles, initiatives, stakeHolders }) => {

  const photoGridItems: GridItem[] = useMemo<GridItem[]>(() => {
    return stakeHolders.map(stakeHolder => {
      return {
        imgSrc: stakeHolder.photo.url,
        title: stakeHolder.name,
        subTitle: stakeHolder.designation
      }
    })
  }, [stakeHolders])

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

          <div className="mt-8">
            {
              initiatives && <div className="flex flex-wrap">
                {
                  initiatives.map(initiative => {
                    return <div className="w-1/2 my-14 pr-10">
                      <InitiaveTile initiave={initiative} />
                    </div>
                  })
                }
              </div>
            }
          </div>
        </div>
        <div className="mt-12">
          <Heading label="Associates who stand with us" />
        </div>
      </Container>

      <PhotoGrid items={photoGridItems} darkBg heading="The People who make it possible" />

      <div className="my-32">
        <Parallax {...supportUsSection} />
      </div>

    </div>
  )
}


export default Home