import { Container } from 'components/Container'
import React from 'react'
import heroStyles from './heroStyles.module.css'
import HeroImage from './HeroImage'

const Hero: React.FC = () => {
	return (
		<div className={heroStyles.container}>
			<HeroImage
				bgImgSrc="images/about-us-hero.png"
				alt="alt"
				heading="What we do"
			/>
			<Container>
				<p className={heroStyles.paragraph}>
					Sustainability Initiatives is a non-profit organization with its
					headquarters in Pune. It was initiated 10 years ago by a group of
					like-minded professionals from varied domains of Urban and
					Environmental Planning, Architecture, Environmental Science,
					Geography, and Energy. With this shared passion for Sustainable
					development, and an urge to make a change towards better cities, these
					individuals came together to work towards the common goal of
					Sustainability in cities. Sustainability Initiatives was thus
					conceived with the objective of creating a strong network of
					researchers, academicians, and professionals who could help develop
					meaningful research in the environment and energy sectors that could
					further be applied towards resilient city planning.
				</p>
			</Container>
		</div>
	)
}

export default Hero
