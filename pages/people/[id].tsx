import React from "react";
import {
  getArticlesByAuthor,
  getStakeHolderBySlug,
} from "utils/api/client-side-api";
import { StakeHolder, SocialLinks, Article } from "utils/types";
import styles from "./style.module.css";
import { Container } from "components/Container";
import { SocialPanel, SocialItem } from "components/SocialPanel";
import { useThemeContext } from "components/ThemeProvider";
import YoutubeIcon from "assets/svgs/social-icons/youtube.svg";
import FacebookIcon from "assets/svgs/social-icons/facebook.svg";
import TwitterIcon from "assets/svgs/social-icons/twitter.svg";
import Instagramicon from "assets/svgs/social-icons/instagram.svg";

interface Props {
  stakeHolder: StakeHolder[];
  articlesByStakeHolder: Article[];
}

export const getServerSideProps = async ({ params }) => {
  const { id } = params;
  const stakeHolder = await getStakeHolderBySlug(id);
  let articlesByStakeHolder = [];
  if (stakeHolder.length) {
    const { author } = stakeHolder[0];
    if (author) {
      articlesByStakeHolder = await getArticlesByAuthor(author.id, true);
    }
  }

  return {
    props: {
      stakeHolder,
      articlesByStakeHolder,
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

const People: React.FC<Props> = ({ stakeHolder, articlesByStakeHolder }) => {
  if (stakeHolder.length === 0) {
    // return not found component
    return <div />;
  }
  const { name, education, about, photo, socialLinks } = stakeHolder[0];
  const { colors } = useThemeContext();
  return (
    <Container>
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <h1 className={styles.name}>{name}</h1>
          <p className={styles.edu}>{education}</p>
          <p className={styles.about}>{about}</p>
        </div>
        <div>
          <img
            className={styles.picture}
            src={photo.url}
            alt={photo.alternativeText}
            title={photo.name}
          />
          <div className="my-4">
            {socialLinks && (
              <SocialPanel
                backgroundColor={colors.secondary}
                iconColor={colors.background.primary}
                items={createSocialItemArr(socialLinks)}
              />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default People;
