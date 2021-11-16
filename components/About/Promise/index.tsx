import React from "react";
import Section, { Props as SectionProps } from "./Section";
import promiseStyles from "./promiseStyles.module.css";
import { BaseLayout as Layout } from "components/Layout";
import { Container } from "components/Container";

const data: SectionProps[] = [
  {
    title: "Our Promise",
    desc:
      "At Sustainability Initiative, we promise to uphold the objective of Sustainability in whatever we do. While acknowledging the limitations of technology and the power of knowledge today, we shall strive to promote use of knowledge to innovate so that we find meaningful solutions for Sustainable Development.",
    imgSrc: "images/about-us-1.png",
  },
  {
    title: "Our Approach",
    desc:
      "Our journey toward Sustainability has to be based on scientific knowledge that also respects the Indian traditional knowledge on living with nature, so that our lifestyle mainstreams the principles of Sustainability. The journey towards Sustainable Development is a collective approach, where participation of communities in tandem with the government is an absolute must. Lastly, no decision or policy or action can be sustainable if it is not collaborative.",
    imgSrc: "images/about-us-2.png",
  },
];

const Promise: React.FC = () => {
  return (
    <div className={promiseStyles.background}>
      <Container>
        <div className={promiseStyles.container}>
          {data.map((section) => (
            <Section {...section} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Promise;
