import HeroImage from 'components/About/Hero/HeroImage'
import { Container } from 'components/Container'
import SEO from 'components/SEO'
import React from 'react'

const Support = () => {
	return (
		<>
			<SEO title="Support" />
			<div className="mt-12">
				<HeroImage bgImgSrc="images/support.jpg" heading="Support" />
				<Container>
					<div className="my-12 laptop:grid laptop:grid-cols-2 laptop:gap-12">
						<div>
							<p>
								We at Sustainability Initiatives carry out policy research in
								the areas of sustainable governance, urban and environment
								planning, to bring positive change in the urban development
								pattern. We collaborate with expert professionals for
								identifying current gaps and conduct relevant investigative
								research in the domain of Sustainable Urban Development. Our
								research projects involve in-depth background studies,
								literature review, research design and methodology with theory
								of change, primary and secondary data collection and analysis,
								stakeholder consultations to execute detailed project reports.
								This scientifically conducted research strongly supports our
								advocacy initiatives.
							</p>
						</div>
						<div>
							<p>
								We intend create a ripple effect through our initiatives and
								pave the way for an environmentally responsible society.
							</p>
							<br />
							<p>
								Research and Development within Sustainability requires
								significant funding and we need your support to be able to bring
								about a meaningful change! The support can be through your
								contributions in terms of time, your subject expertise, and
								access to your networks or monetary support. Let us embark on
								this journey of sustainable transformation, together!
							</p>
							<br />
							<p>
								Kindly write to us at{' '}
								<span className="font-bold">
									<a href="mailto:mail@sustainability-initiatives.org">
										mail@sustainability-initiatives.org
									</a>
								</span>{' '}
								if you would like to contribute and support our activities!
							</p>
						</div>
					</div>
				</Container>
			</div>
		</>
	)
}

export default Support
