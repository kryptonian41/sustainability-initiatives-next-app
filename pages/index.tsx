import AssociatesGrid, { AssociateGridItem } from 'components/AssociatesGrid'
import { Container } from 'components/Container'
import { Heading } from 'components/Heading'
import { HeroSlideShow } from 'components/HeroCarousel'
import InstaFeed from 'components/InstaFeed'
import Parallax, { Props as ParallaxProps } from 'components/Parallax'
import PhotoGrid from 'components/PhotoGrid'
import { GridItemProps } from 'components/PhotoGrid/GridPhoto'
import { QuotesSlideShow } from 'components/QuotesSlider'
import { RecentArticlesGrid } from 'components/RecentArticlesGrid'
import { InitiativeTile } from 'components/Tiles/InitiativeTile'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useMemo } from 'react'
import { API } from 'utils/api'
import {
	useBreakpointValue,
	useDeviceMediaQuery,
} from 'utils/hooks/useMediaQuery'
import { Article, Associate, Initiative, Quote, StakeHolder } from 'utils/types'

interface Props {
	recentArticles: Article[]
	initiatives: Initiative[]
	stakeHolders: StakeHolder[]
	associates: Associate[]
	quotes: Quote[]
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
	const recentArticles = await API.getRecentArticles()
	const initiatives = await API.getInitiatives()
	const stakeHolders = await API.getStakeHolders()
	const associates = await API.getAssociates()
	const quotes = await API.getQuotes()
	return {
		props: {
			recentArticles,
			initiatives,
			stakeHolders,
			associates,
			quotes,
		},
	}
}

const missionSection: ParallaxProps = {
	bgImg: '/images/homepage-mission-parallax.png',
	title: 'Our Mission – Moving Towards Sustainability',
	subTitle:
		'The concept of Sustainability as a way of life is of paramount importance today. With issues of environmental degradation, depleting resources, and irreversible climate change plaguing the earth, urgent steps must be taken towards the resilient and sensitive development of the built environment. Sustainability Initiatives aims at developing a knowledge resource pool that will guide the policymakers and actors of today to make informed decisions that would make the world a better place for the future generation.',
	btnContent: 'READ MORE ABOUT US',
	btnLink: '/about',
}

const supportUsSection: ParallaxProps = {
	bgImg: '/images/homepage-support-parallax.png',
	title: 'We believe that, together with your support, we can Make A Change',
	subTitle:
		'Sustainability only becomes truly impactful through collective and united efforts. When more and more people begin walking the talk on Sustainability by setting examples- that is when a meaningful change will begin. Together, we will inch a step closer towards achieving a transformed consciousness by collectively working towards sensitive means of innovation for a Sustainable world.',
	btnContent: 'SUPPORT US',
	isLight: true,
	btnLink: '/support',
}

export const Home: React.FC<
	InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ recentArticles, initiatives, stakeHolders, associates, quotes }) => {
	const matchesPhone = useDeviceMediaQuery('phone')
	const stakeHolderGridItemsPerRow = useBreakpointValue({
		phone: 2,
		tablet: 3,
		laptop: 5,
	})
	const stakeHolderPhotoGridItems = useMemo<GridItemProps[]>(() => {
		return stakeHolders.map((stakeHolder) => {
			return {
				item: {
					imgSrc: stakeHolder.gridPhoto.url,
					title: stakeHolder.name,
					subTitle: stakeHolder.designation,
					path: `/people/${stakeHolder.slug}`,
				},
				key: stakeHolder.id,
			}
		})
	}, [stakeHolders])

	const associatedPhotoGridItems = useMemo<AssociateGridItem[]>(() => {
		return associates.map((associate) => {
			return {
				item: {
					imgSrc: associate.logo.url,
					title: associate.name,
					imageContainerStyles: {
						height: 155,
						display: 'flex',
						alignContent: 'center',
						justifyContent: 'center',
					},
					imageStyles: {
						objectFit: 'contain'
					}
				},
				key: associate.id,
				associate,
				className: 'cursor-pointer',
			}
		})
	}, [associates])

	return (
		<div>
			<Container
				className="tablet:mt-14 tablet:px-12 laptop:px-6 tablet:mb-20"
				fullWidth={matchesPhone}
			>
				<div
					style={{
						height: '73vh',
					}}
				>
					<HeroSlideShow
						items={[
							{
								imgUrl: '/images/hero_1.jpg',
								title: 'Development made sustainably',
							},
							{
								imgUrl: '/images/hero_2.jpg',
								title: 'Development made sustainably',
							},
							{
								imgUrl: '/images/hero_3.jpg',
								title: 'Development made sustainably',
							},
							{
								imgUrl: '/images/hero_4.jpg',
								title: 'Development made sustainably',
							},
							{
								imgUrl: '/images/hero_5.jpg',
								title: 'Development made sustainably',
							},
							{
								imgUrl: '/images/hero_6.jpg',
								title: 'Development made sustainably',
							},
						]}
					/>
				</div>
			</Container>
			<Container className="my-16 tablet:my-36">
				<RecentArticlesGrid articles={recentArticles}></RecentArticlesGrid>
			</Container>
			<div>
				<Parallax {...missionSection} />
			</div>
			<Container className="my-16 tablet:my-36">
				<div>
					<Heading label="Our Initiatives" />
					<div className="mt-8">
						{initiatives && (
							<div className="flex flex-col justify-center items-center flex-wrap tablet:flex-row tablet:justify-start">
								{initiatives.map((initiative) => {
									return (
										<div
											className="w-11/12 laptop:w-1/2 my-14 tablet:pr-10"
											key={initiative.id}
										>
											<InitiativeTile initiave={initiative} />
										</div>
									)
								})}
							</div>
						)}
					</div>
				</div>
			</Container>
			<PhotoGrid
				items={stakeHolderPhotoGridItems}
				darkBg
				heading="The People who make it Possible"
				itemsPerRow={stakeHolderGridItemsPerRow}
				className="py-20"
			/>
			<AssociatesGrid items={associatedPhotoGridItems} />
			<Container className="tablet:px-12">
				<QuotesSlideShow items={quotes} />
			</Container>
			<div className="my-16 tablet:my-36">
				<Parallax {...supportUsSection} />
			</div>

			{/* Social Container */}
			<InstaFeed />
		</div>
	)
}

export default Home
