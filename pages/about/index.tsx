import PhotoGrid from 'components/PhotoGrid'
import { GridItemProps } from 'components/PhotoGrid/GridPhoto'
import SEO from 'components/SEO'
import { useThemeContext } from 'components/ThemeProvider'
import { GetServerSideProps } from 'next'
import React, { useMemo } from 'react'
import { getStakeHolders } from 'utils/api/client-side-api'
import { useMediaQuery } from 'utils/hooks/useMediaQuery'
import { StakeHolder } from 'utils/types'
import Hero from '../../components/About/Hero'
import Promise from '../../components/About/Promise'

interface Props {
	stakeHolders: StakeHolder[]
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
	const stakeHolders = await getStakeHolders()
	return {
		props: {
			stakeHolders,
		},
		revalidate: 600,
	}
}

const About: React.FC<Props> = ({ stakeHolders }) => {
	const gridProps = (): GridItemProps[] =>
		stakeHolders.map((stakeHolder) => ({
			item: {
				imgSrc: stakeHolder.gridPhoto.url,
				title: stakeHolder.name,
				subTitle: stakeHolder.designation,
				path: `/people/${stakeHolder.slug}`,
			},
		}))

	const { breakpoints } = useThemeContext()
	const isTablet = useMediaQuery(`(min-width: ${breakpoints.tablet}px)`).matches
	const isLaptop = useMediaQuery(`(min-width: ${breakpoints.laptop}px)`).matches

	const itemsPerRow = useMemo(() => {
		if (isLaptop) return 5
		if (isTablet) return 3
		return 2
	}, [isTablet, isLaptop])

	return (
		<>
			<SEO title="About Us" />
			<Hero />
			<Promise />
			{stakeHolders.length > 0 && (
				<div className="py-32">
					<PhotoGrid
						heading="The People who make it possible"
						items={gridProps()}
						itemsPerRow={itemsPerRow}
					/>
				</div>
			)}
		</>
	)
}

export default About
