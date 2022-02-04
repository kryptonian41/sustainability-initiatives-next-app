import React from 'react'
import Section, { Props as SectionProps } from './Section'
import promiseStyles from './promiseStyles.module.css'
import { BaseLayout as Layout } from 'components/Layout'
import { Container } from 'components/Container'
import SecOneImgOne from 'public/images/about-us-1.jpg'
import SecOneImgTwo from 'public/images/about-us-2.jpg'
import SecTwoImgOne from 'public/images/about-us-3.png'
import SecTwoImgTwo from 'public/images/about-us-4.jpg'

const data: SectionProps[] = [
	{
		title: 'Our Promise',
		desc: 'At Sustainability Initiative, we have taken a pledge to uphold the objective of Sustainability in all our endeavours. With an increasing threat to our natural resources and a pressing need for alternative ways of advancing, we shall strive to innovate and invent significant solutions for Sustainable Development in all realms.',
		imgOne: SecOneImgOne,
		imgTwo: SecOneImgTwo,
	},
	{
		title: 'Our Approach',
		desc: 'Our journey towards achieving Sustainability must incorporate scientific knowledge that borrows from the regional context and traditional Indian knowledge systems. Only then will the way forward be universal yet contextual. Every project must create effective conversations with the past, present, and future. The journey towards Sustainable Development is a collective approach, where democratic participation of communities in tandem with the government is an absolute must. Lastly, no decision, policy, or action can be sustainable and holistic without collaboration.',
		imgOne: SecTwoImgOne,
		imgTwo: SecTwoImgTwo,
	},
]

const Promise: React.FC = () => {
	return (
		<div className={promiseStyles.background}>
			<Container>
				<div className={promiseStyles.container}>
					{data.map((section, index) => (
						<Section {...section} key={index} />
					))}
				</div>
			</Container>
		</div>
	)
}

export default Promise
