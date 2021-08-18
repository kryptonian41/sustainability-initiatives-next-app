import React from "react";
import Wrapper from "components/Wrapper";
import Hero from "components/AboutUs/Hero";
import Promise from "components/AboutUs/Promise";
import PhotoGrid from "components/PhotoGrid";
import { peopleProps } from "components/PhotoGrid/mockProps";

const About = () => {
  return (
    <Wrapper>
      <Hero />
      <Promise />
      <PhotoGrid
        heading="The People who make it possible"
        items={peopleProps}
      />
    </Wrapper>
  );
};

export default About;
