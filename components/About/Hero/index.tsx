import { Container } from "components/Container";
import React from "react";
import heroStyles from "./heroStyles.module.css";
import HeroImage from "./HeroImage";

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
          headquarters in Pune. It was initiated 10 years ago by a group of like
          minded professionals belonging to varied domains of Urban and
          Environmental Planning, Architecture, Environmental Science, Geography
          and Energy. With a core belief and an urge to make a change towards
          better cities, these individuals came together to work towards a
          common cause of Sustainability in cities. Sustainability Initiatives
          was thus born with the objective of creating a network of researchers,
          academicians and professionals who can develop meaningful research in
          environment and energy sectors so that it can be applied in planning
          and implementation in our cities today.
        </p>
      </Container>
    </div>
  );
};

export default Hero;
