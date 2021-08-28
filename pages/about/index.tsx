import React from "react";
import Wrapper from "components/Wrapper";
import Hero from "./components/Hero";
import { getStakeHolders } from "utils/api/client-side-api";
import Promise from "./components/Promise";
import PhotoGrid from "components/PhotoGrid";
import { peopleProps } from "components/PhotoGrid/mockProps";
import { StakeHolder } from "utils/types";
import { GridItemProps } from "components/PhotoGrid/GridPhoto";

interface Props {
  stakeHolders: StakeHolder[];
}

export const getServerSideProps = async () => {
  const stakeHolders = await getStakeHolders();
  return {
    props: {
      stakeHolders,
    },
  };
};

const About: React.FC<Props> = ({ stakeHolders }) => {
  const gridProps = (): GridItemProps[] =>
    stakeHolders.map((stakeHolder) => ({
      imgSrc: stakeHolder.photo.url,
      title: stakeHolder.name,
      subTitle: stakeHolder.designation,
      path: `/people/${stakeHolder.slug}`,
    }));
  return (
    <>
      <Hero />
      <Promise />
      {stakeHolders.length > 0 && (
        <div className="py-20">
          <PhotoGrid
            heading="The People who make it possible"
            items={gridProps()}
          />
        </div>
      )}
    </>
  );
};

export default About;
