import { Container } from "components/Container";
import React from "react";
import heroStyles from "./heroStyles.module.css";
import HeroImage from "./HeroImage";

const Hero: React.FC = () => {
  return (
    <div className={heroStyles.container}>
      <HeroImage bgImgSrc="images/about-us-hero.png" alt="alt" heading="What we do" />
      <Container>
        <p className={heroStyles.paragraph}>
          The functional areas of Sustainability Initiatives have emerged
          through identification of existing gaps. There is a severe gap in
          availability of quality research that is specific to India and India’s
          growth trends and potential. Further, there is a massive gap between
          academic research and professional applications. Similarly, existing
          capacity in India, to conduct research and analysis for effective
          policy formulation is also weak, leading to ineffective policy
          implementation in the areas of urban sustainability. Advocacy is a
          cornerstone functionality that is being explored at Sustainability
          Initiatives. Through the services for Advocacy, Sustainability
          Initiatives aims to support governmental departments and other similar
          urban local bodies to carry out targeted research and analysis for
          decision making.
        </p>
      </Container>
    </div>
  );
};

export default Hero;
