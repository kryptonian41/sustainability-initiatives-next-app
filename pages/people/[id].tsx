import React, { useMemo } from "react";
import {
  getArticlesByAuthor,
  getStakeHolderBySlug,
  getStakeHolders,
} from "utils/api/client-side-api";
import { StakeHolder, SocialLinks, Article } from "utils/types";
import styles from "./styles.module.css";
import { Container } from "components/Container";
import { SocialPanel, SocialItem } from "components/SocialPanel";
import { useThemeContext } from "components/ThemeProvider";
import Blogs from "../../components/People/Blogs";
import YoutubeIcon from "assets/svgs/social-icons/youtube.svg";
import FacebookIcon from "assets/svgs/social-icons/facebook.svg";
import TwitterIcon from "assets/svgs/social-icons/twitter.svg";
import Instagramicon from "assets/svgs/social-icons/instagram.svg";
import PhotoGrid from "components/PhotoGrid";
import { GridItemProps } from "components/PhotoGrid/GridPhoto";
import { useMediaQuery } from "utils/hooks/useMediaQuery";
import clsx from "clsx";

interface Props {
  stakeHolders: StakeHolder[];
  stakeHolder: StakeHolder[];
}

export const getServerSideProps = async ({ params }) => {
  const { id } = params;
  let stakeHolders = await getStakeHolders();
  const stakeHolder = await getStakeHolderBySlug(id);
  if (stakeHolder.length)
    stakeHolders = stakeHolders.filter((sh) => sh.id !== stakeHolder[0].id);

  return {
    props: {
      stakeHolders,
      stakeHolder,
    },
  };
};

const Icons = {
  Twitter: TwitterIcon,
  YouTube: YoutubeIcon,
  Facebook: FacebookIcon,
  Instagram: Instagramicon,
};

const createSocialItemArr = (socialLinks: SocialLinks): SocialItem[] =>
  Object.entries(socialLinks)
    .filter((item) => typeof item[1] === "string")
    .map((item) => ({
      icon: Icons[item[0]],
      url: item[1],
    }));

const People: React.FC<Props> = ({ stakeHolders, stakeHolder }) => {
  const gridProps = (): GridItemProps[] =>
    stakeHolders.map((stakeHolder) => ({
      item: {
        imgSrc: stakeHolder.gridPhoto.url,
        title: stakeHolder.name,
        subTitle: stakeHolder.designation,
        path: `/people/${stakeHolder.slug}`,
      },
    }));
  if (stakeHolder.length === 0) {
    // return not found component
    return <div />;
  }
  const { name, education, about, photo, socialLinks, blogs } = stakeHolder[0];
  const { colors, breakpoints } = useThemeContext();
  const isTablet = useMediaQuery(`(min-width: ${breakpoints.tablet}px)`)
    .matches;
  const isLaptop = useMediaQuery(`(min-width: ${breakpoints.laptop}px)`)
    .matches;

  const itemsPerRow = useMemo(() => {
    if (isLaptop) return 4;
    if (isTablet) return 3;
    return 2;
  }, [isTablet, isLaptop]);

  return (
    <div>
      <Container>
        <div className={styles.container}>
          <div>
            <img
              className={clsx(
                "mb-8 tablet:w-80 tablet:float-right tablet:ml-8 laptop:float-none laptop:m-0 laptop:w-full",
                styles.picture
              )}
              src={photo.url}
              alt={photo.alternativeText}
              title={photo.name}
            />
            {isLaptop && (
              <div className="my-4">
                {socialLinks && (
                  <SocialPanel
                    backgroundColor={colors.secondary}
                    iconColor={colors.background.primary}
                    items={createSocialItemArr(socialLinks)}
                  />
                )}
              </div>
            )}
          </div>
          <div className={styles.infoContainer}>
            <h1 className={clsx("text-2xl tablet:text-4xl", styles.name)}>
              {name}
            </h1>
            <p className={clsx("text-sm  tablet:text-base", styles.edu)}>
              {education}
            </p>
            {!isLaptop && (
              <div className="mb-8">
                {socialLinks && (
                  <SocialPanel
                    backgroundColor={colors.secondary}
                    iconColor={colors.background.primary}
                    items={createSocialItemArr(socialLinks)}
                  />
                )}
              </div>
            )}
            <p className="text-sm mb-8 tablet:text-base">
              {about}
            </p>
            {blogs.length > 0 && (
              <Blogs
                blogs={blogs.slice(0, 3)}
                dateColor={colors.text.light}
                displayViewMore={true}
              />
            )}
          </div>
        </div>
      </Container>
      <div className="my-20">
        {stakeHolders.length && (
          <PhotoGrid
            heading="The People who make it possible"
            items={gridProps()}
            withAction={isLaptop}
            darkBg={!isLaptop}
            itemsPerRow={itemsPerRow}
            className="pt-8 pb-4"
          />
        )}
      </div>
    </div>
  );
};

export default People;
