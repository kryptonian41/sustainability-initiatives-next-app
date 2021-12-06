import { useThemeContext } from "components/ThemeProvider";
import React from "react";
import { useDeviceMediaQuery } from "utils/hooks/useMediaQuery";
import heroStyles from "./heroStyles.module.css";
import { Container } from "components/Container";

interface Props {
  bgImgSrc: string;
  heading?: string;
  alt?: string;
}

const HeroImage: React.FC<Props> = ({ bgImgSrc, heading = "", alt = "" }) => {
  const { breakpoints } = useThemeContext();
  const isMobile = useDeviceMediaQuery('phone');

  const heroImageHtml = (
    <div className={heroStyles.imageContainer}>
      <img src={bgImgSrc} alt={alt} style={{
        height: '50vh'
      }} />
      <h1>{heading}</h1>
    </div>
  );
  if (isMobile) return heroImageHtml;
  return <Container>{heroImageHtml}</Container>;
};

export default HeroImage;
