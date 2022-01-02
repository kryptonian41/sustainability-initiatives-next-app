import clsx from "clsx";
import { NextArrow, PrevArrow } from "components/SlideShow/arrows";
import { useThemeContext } from "components/ThemeProvider";
import React, { useMemo } from "react";
import Slider from "react-slick";
import { useDeviceMediaQuery, useMediaQuery } from "utils/hooks/useMediaQuery";
import { Quote } from "utils/types";
import styles from "./styles.module.css";

interface Props {
  items: Quote[];
}

export const QuotesSlideShow: React.FC<Props> = ({ items }) => {
  if (!items.length) return null;
  return (
    <div className={styles.root}>
      <Carousel quotes={items} />
    </div>
  );
};

interface CarouselProps {
  quotes: Quote[];
  sliderProps?: {};
}

const Carousel: React.FC<CarouselProps> = ({ quotes, sliderProps = {} }) => {
  const { breakpoints } = useThemeContext();
  const matchesPhone = useDeviceMediaQuery("phone");

  const carouselSettings = useMemo(() => {
    return {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      arrows: !matchesPhone,
    };
  }, [matchesPhone]);

  return (
    <Slider {...carouselSettings} {...sliderProps}>
      {quotes.map(({ quote, quotee: { name, designation }, id }) => (
        <div className={styles.quoteSlide} key={id}>
          <div className={styles.quote}>{quote}</div>
          <div className={clsx(styles.author)}>
            <span>{`- ${name}`}</span>
            <span className={styles.name}>{designation}</span>
          </div>
        </div>
      ))}
    </Slider>
  );
};
