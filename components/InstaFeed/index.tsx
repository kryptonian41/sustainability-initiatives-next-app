import React from 'react'
import { Container } from 'components/Container'
import { Heading } from 'components/Heading'
import InstagramFeed from 'react-ig-feed'

const InstaFeed = () => (
	<Container className="pb-10">
		<Heading label="Join our network" />
		<div className="py-20">
			{/* <img src="/images/Social 1.jpg" />
				<img src="/images/Social 2.jpg" />
				<img src="/images/Social 3.jpg" /> */}
			<InstagramFeed
				token={process.env.NEXT_PUBLIC_INSTAGRAM_TOKEN}
				counter="3"
			/>
		</div>
	</Container>
)

export default InstaFeed
