import { OutlineButton } from 'components/Button'
import { Container } from 'components/Container'
import { Header } from 'components/Header'
import { Heading } from 'components/Heading'
import Parallax, { Props as ParallaxProps } from 'components/Parallax'
import PhotoGrid from 'components/PhotoGrid'
import { GridItemProps } from 'components/PhotoGrid/GridPhoto'
import { RecentArticlesGrid } from 'components/RecentArticlesGrid'
import { InitiaveTile } from 'components/Tiles/InitiativeTile'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useMemo } from 'react'
import { API } from 'utils/api'
import { Article, Associate, Initiative, StakeHolder } from 'utils/types'
import styles from '../styles/Home.module.css'
interface Props {
  recentArticles: Article[],
  initiatives: Initiative[],
  stakeHolders: StakeHolder[],
  associates: Associate[]
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const recentArticles = await API.getRecentArticles()
  const initiatives = await API.getInitiatives()
  const stakeHolders = await API.getStakeHolders()
  const associates = await API.getAssociates()
  return {
    props: {
      recentArticles,
      initiatives,
      stakeHolders,
      associates
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
> = ({ recentArticles, initiatives, stakeHolders, associates }) => {

  const stakeHolderPhotoGridItems: GridItemProps[] = useMemo<GridItemProps[]>(() => {
    return stakeHolders.map(stakeHolder => {
      return {
        imgSrc: stakeHolder.photo.url,
        title: stakeHolder.name,
        subTitle: stakeHolder.designation
      }
    })
  }, [stakeHolders])

  const associatedPhotoGridItems: GridItemProps[] = useMemo<GridItemProps[]>(() => {
    return associates.map(associate => {
      return {
        imgSrc: associate.logo.url,
        title: associate.name,
        imageContainerStyles: {
          height: 155,
          display: 'flex',
          alignItems: 'center'
        }
      }
    })
  }, [associates])


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
        <div className="my-12">
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

      </Container>

      <PhotoGrid items={stakeHolderPhotoGridItems} darkBg heading="The People who make it possible" itemsPerRow={5} className="py-20" />

      <div className="py-20">
        <PhotoGrid items={associatedPhotoGridItems} heading="Associates who stand with us" itemsPerRow={4} containerStyles={{
          // @ts-ignore
          '--gap': '10rem'
        }} withAction className="py-6" />

        <Container className="text-right">
          <OutlineButton>View All</OutlineButton>
        </Container>
      </div>

      <div className="my-32">
        <Parallax {...supportUsSection} />
      </div>

    </div>
  )
}


export default Home