import { OutlineButton } from "components/Button";
import { Container } from "components/Container";
import { Heading } from "components/Heading";
import { HeroSlideShow } from "components/HeroCarousel";
import Parallax, { Props as ParallaxProps } from "components/Parallax";
import PhotoGrid from "components/PhotoGrid";
import { GridItemProps } from "components/PhotoGrid/GridPhoto";
import { QuotesSlideShow } from "components/QuotesSlider";
import { RecentArticlesGrid } from "components/RecentArticlesGrid";
import { useThemeContext } from "components/ThemeProvider";
import { InitiaveTile } from "components/Tiles/InitiativeTile";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect, useMemo } from "react";
import Link from "next/link";
import { API } from "utils/api";
import { useMediaQuery } from "utils/hooks/useMediaQuery";
import {
  Article,
  Associate,
  Initiative,
  Quote,
  StakeHolder,
} from "utils/types";
import AssociatesGrid from "components/AssociatesGrid";
interface Props {
  recentArticles: Article[];
  initiatives: Initiative[];
  stakeHolders: StakeHolder[];
  associates: Associate[];
  quotes: Quote[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const recentArticles = await API.getRecentArticles();
  const initiatives = await API.getInitiatives();
  const stakeHolders = await API.getStakeHolders();
  const associates = await API.getAssociates();
  const quotes = await API.getQuotes();
  return {
    props: {
      recentArticles,
      initiatives,
      stakeHolders,
      associates,
      quotes,
    },
  };
};

const missionSection: ParallaxProps = {
  bgImg:
    "https://images.unsplash.com/photo-1498092651296-641e88c3b057?auto=format&fit=crop&w=1778&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
  title: "Our mission is to make the world sustainable",
  subTitle:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim iaculis purus pretium ultrices. Suspendisse et condim entum libero. Proin vehicula dolor nibh.",
  btnContent: "READ MORE ABOUT US",
};

const supportUsSection: ParallaxProps = {
  bgImg:
    "https://images.unsplash.com/photo-1498092651296-641e88c3b057?auto=format&fit=crop&w=1778&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
  title: "We believe that we can make more impact with your support",
  btnContent: "SUPPORT US",
  isLight: true,
};

export const Home: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ recentArticles, initiatives, stakeHolders, associates, quotes }) => {
  const { breakpoints } = useThemeContext();
  const { matches: matchesPhone } = useMediaQuery(
    `(max-width: ${breakpoints.phone}px)`
  );

  const stakeHolderPhotoGridItems: GridItemProps[] = useMemo<
    GridItemProps[]
  >(() => {
    return stakeHolders.map((stakeHolder) => {
      return {
        imgSrc: stakeHolder.photo.url,
        title: stakeHolder.name,
        subTitle: stakeHolder.designation,
      };
    });
  }, [stakeHolders]);

  const associatedPhotoGridItems: GridItemProps[] = useMemo<
    GridItemProps[]
  >(() => {
    return associates.map((associate) => {
      return {
        imgSrc: associate.logo.url,
        title: associate.name,
        imageContainerStyles: {
          height: 155,
          display: "flex",
          alignItems: "center",
        },
      };
    });
  }, [associates]);

  return (
    <div>
      <Container className="tablet:mt-14 tablet:my-0 tablet:mb-20" fullWidth>
        <div
          style={{
            height: "50vh",
          }}
        >
          <HeroSlideShow
            items={[
              {
                imgUrl:
                  "https://www.india-briefing.com/news/wp-content/uploads/2013/07/India-Briefing-Economy-of-Mumbai-Indias-Major-Commercial-Hub.jpg",
                title: "Development made sustainably",
              },
              {
                imgUrl:
                  "https://www.india-briefing.com/news/wp-content/uploads/2013/07/India-Briefing-Economy-of-Mumbai-Indias-Major-Commercial-Hub.jpg",
                title: "Development sustainably",
              },
            ]}
          />
        </div>
        <div className="mt-16 tablet:mt-24">
          <RecentArticlesGrid articles={recentArticles}></RecentArticlesGrid>
        </div>
      </Container>

      <div className="py-10">
        <Parallax {...missionSection} />
      </div>

      <Container>
        <div className="my-12">
          <Heading label="Our Initiatives" />
          <div className="mt-8">
            {initiatives && (
              <div className="flex flex-col justify-center items-center flex-wrap tablet:flex-row tablet:justify-start">
                {initiatives.map((initiative) => {
                  return (
                    <div
                      className="w-11/12 tablet:w-1/2 my-14 tablet:pr-10"
                      key={initiative.id}
                    >
                      <InitiaveTile initiave={initiative} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Container>

      <PhotoGrid
        items={stakeHolderPhotoGridItems}
        darkBg
        heading="The People who make it Possible"
        itemsPerRow={matchesPhone ? 2 : 5}
        className="py-20"
      />

      <AssociatesGrid associatedPhotoGridItems={associatedPhotoGridItems} />

      <Container className="py-10">
        <QuotesSlideShow items={quotes} />
      </Container>

      <div className="my-16 tablet:my-32">
        <Parallax {...supportUsSection} />
      </div>
    </div>
  );
};

export default Home;
