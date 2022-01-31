import { Container } from 'components/Container'
import { Heading } from 'components/Heading'
import React, { useMemo } from 'react'
import { getAnnualReports } from 'utils/api/client-side-api'
import { Report } from 'utils/types'
import PhotoGrid from 'components/PhotoGrid'
import { GridItemProps } from 'components/PhotoGrid/GridPhoto'
import { useMediaQuery } from 'utils/hooks/useMediaQuery'
import { useThemeContext } from 'components/ThemeProvider'
import SEO from 'components/SEO'

interface Props {
	reports: Report[]
}

export const getStaticProps = async () => {
	const reports = await getAnnualReports()
	return {
		props: {
			reports,
		},
		revalidate: 86400,
	}
}

const Downloads: React.FC<Props> = ({ reports }) => {
	const reportsGridProps = (): GridItemProps[] =>
		reports.map((report) => ({
			item: {
				imgSrc: report.thumbnail?.formats?.small?.url || 'images/report.jpg',
				title: report.title,
				path: report.report.url,
				imageStyles: {
					objectFit: 'cover',
					aspectRatio: '1',
				},
			},
		}))

	const { colors, breakpoints } = useThemeContext()
	const isTablet = useMediaQuery(`(min-width: ${breakpoints.tablet}px)`).matches
	const isLaptop = useMediaQuery(`(min-width: ${breakpoints.laptop}px)`).matches

	const itemsPerRow = useMemo(() => {
		if (isLaptop) return 6
		if (isTablet) return 4
		return 2
	}, [isTablet, isLaptop])
	return (
		<>
			<SEO title="Downloads" />
			<div className="my-20">
				<Container>
					<Heading label="Downloads"></Heading>
					<h3
						className="uppercase mt-10 tablet:text-xl"
						style={{ color: colors.secondary }}
					>
						Publications
					</h3>
				</Container>
				<PhotoGrid
					items={reportsGridProps()}
					itemsPerRow={itemsPerRow}
					openItemOnNewPage
					className="-mt-8"
				/>
			</div>
		</>
	)
}

export default Downloads
