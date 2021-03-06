import React, { useMemo } from "react";
import Wrapper from "components/Wrapper";
import Hero from "../../components/About/Hero";
import { getStakeHolders } from "utils/api/client-side-api";
import Promise from "../../components/About/Promise";
import PhotoGrid from "components/PhotoGrid";
import { peopleProps } from "components/PhotoGrid/mockProps";
import { StakeHolder } from "utils/types";
import { GridItemProps } from "components/PhotoGrid/GridPhoto";
import { useThemeContext } from "components/ThemeProvider";
import { useMediaQuery } from "utils/hooks/useMediaQuery";
import SEO from "components/SEO"

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
      item: {
        imgSrc: stakeHolder.gridPhoto.url,
        title: stakeHolder.name,
        subTitle: stakeHolder.designation,
        path: `/people/${stakeHolder.slug}`,
      },
    }));

  const { breakpoints } = useThemeContext();
  const isTablet = useMediaQuery(`(min-width: ${breakpoints.tablet}px)`)
    .matches;
  const isLaptop = useMediaQuery(`(min-width: ${breakpoints.laptop}px)`)
    .matches;

  const itemsPerRow = useMemo(() => {
    if (isLaptop) return 5;
    if (isTablet) return 3;
    return 2;
  }, [isTablet, isLaptop]);

  return (
    <>
    <SEO title="About Us" />
      <Hero />
      <Promise />
      {stakeHolders.length > 0 && (
        <div className="py-32">
          <PhotoGrid
            heading="The People who make it possible"
            items={gridProps()}
            itemsPerRow={itemsPerRow}
          />
        </div>
      )}
    </>
  );
};

export default About;
