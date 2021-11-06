import { useThemeContext } from "components/ThemeProvider";
import React from "react";
import { useMediaQuery } from "utils/hooks/useMediaQuery";
import heroStyles from "./heroStyles.module.css";
import { Container } from "components/Container";

interface Props {
  bgImgSrc: string;
  heading?: string;
  alt?: string;
}

const HeroImage: React.FC<Props> = ({ bgImgSrc, heading = "", alt = "" }) => {
  const { breakpoints } = useThemeContext();
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.tablet}px)`)
    .matches;

  const heroImageHtml = (
    <div className={heroStyles.imageContainer}>
      <img src={bgImgSrc} alt={alt} />
      <h1>{heading}</h1>
    </div>
  );
  if (isMobile) return heroImageHtml;
  return <Container>{heroImageHtml}</Container>;
};

export default HeroImage;
