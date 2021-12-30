import React from 'react'
import Head from 'next/head'

interface Props {
	title?: string
	keywords?: string
	description?: string
}

const SEO: React.FC<Props> = ({ title, keywords, description }) => {
	const globalKeywords =
		'sustainable, green, architecture, research, advocacy'

	const globalDesc =
		'Sustainability Initiatives is a trust registered in Pune, formed by a group of like-minded professionals in the field of urban and environmental planning, architecture, environmental science and energy. Sustainability Initiatives is formed with the objective of creating a network of researchers, academicians and professionals who will develop core research in the area of energy, environment and sustainable development.'
	return (
		<Head>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta
				name="keywords"
				content={keywords ? `${keywords}, ${globalKeywords}` : globalKeywords}
			/>
			<meta
				name="description"
				content={description ? description : globalDesc}
			/>
			<meta charSet="utf-8" />
			<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.4.5/themes/satellite-min.css" integrity="sha256-TehzF/2QvNKhGQrrNpoOb2Ck4iGZ1J/DI4pkd2oUsBc=" crossOrigin="anonymous" />
			<link rel="icon" href="/favicon.ico" />
			<link rel="apple-touch-icon" href="/favicon.ico" />
			<link
				rel="apple-touch-icon"
				sizes="152x152"
				href="/apple-touch-icon.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href="/favicon-32x32.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href="/favicon-16x16.png"
			/>
			<link rel="manifest" href="/site.webmanifest" />
			<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
			<meta name="msapplication-TileColor" content="#da532c" />
			<meta name="theme-color" content="#ffffff" />
			<title>
				{title
					? `${title} | Sustainability Initiatives`
					: 'Sustainability Initiatives'}
			</title>
		</Head>
	)
}

export default SEO
