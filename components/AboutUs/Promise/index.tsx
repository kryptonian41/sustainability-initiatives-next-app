import React from "react";
import Section, { Props as SectionProps } from "./Section";
import promiseStyles from "./promiseStyles.module.css";
import Layout from "components/Layout";

const data: SectionProps[] = [
  {
    title: "Our Promise",
    desc:
      "Sustainability Initiatives is a not-for-profit organisation based in Pune. It is  formed by a group of like-minded professionals in the field of urban and environmental planning, architecture, environmental science, geography and energy. Sustainability Initiatives is formed with the objective of creating a network of researchers, academicians and professionals who will develop core research in the area of environment and energy.",
    imgSrc: "images/about-us-1.png",
  },
  {
    title: "Our Approach",
    desc:
      "Sustainability Initiatives is a not-for-profit organisation based in Pune. It is  formed by a group of like-minded professionals in the field of urban and environmental planning, architecture, environmental science, geography and energy. Sustainability Initiatives is formed with the objective of creating a network of researchers, academicians and professionals who will develop core research in the area of environment and energy.",
    imgSrc: "images/about-us-2.png",
  },
];

const Promise: React.FC = () => {
  return (
    <div className={promiseStyles.background}>
      <Layout>
        <div className={promiseStyles.container}>
          {data.map((section) => (
            <Section {...section} />
          ))}
        </div>
      </Layout>
    </div>
  );
};

export default Promise;
