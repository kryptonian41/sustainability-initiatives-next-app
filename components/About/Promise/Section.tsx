import React from "react";
import promistStyles from "./promiseStyles.module.css";

export interface Props {
  title: string;
  desc: string;
  imgSrc: string;
}

const Section: React.FC<Props> = ({ title, desc, imgSrc }) => {
  return (
    <div className={promistStyles.sectionContainer}>
      <h3>{title}</h3>
      <p>{desc}</p>
      <img src={imgSrc} alt={title} className="-mx-4 w-screen max-w-none tablet:-m-0 tablet:max-w-full tablet:mt-16" />
    </div>
  );
};

export default Section;
