import React from 'react'
import promistStyles from './promiseStyles.module.css'

export interface Props {
	title: string
	desc: string
	imgOne: StaticImageData
	imgTwo: StaticImageData
}

const Section: React.FC<Props> = ({ title, desc, imgOne, imgTwo }) => {
	return (
		<div className={promistStyles.sectionContainer}>
			<div>
				<h3>{title}</h3>
				<p>{desc}</p>
			</div>
			<div>
				<img
					src={imgOne.src}
					alt={title}
					className="-mx-4 w-screen max-w-none tablet:-m-0 tablet:max-w-full tablet:mt-16"
				/>
				<img
					src={imgTwo.src}
					alt={title}
					className="-mx-4 w-screen max-w-none tablet:-m-0 tablet:max-w-full tablet:mt-8"
				/>
			</div>
		</div>
	)
}

export default Section
