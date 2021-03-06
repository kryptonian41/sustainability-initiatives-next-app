import { NextArrow, PrevArrow } from "components/SlideShow/arrows";
import React, { useCallback, useMemo, useState } from "react";
import Slider from "react-slick";
import { useDeviceMediaQuery } from "utils/hooks/useMediaQuery";
import styles from "./styles.module.css";

interface HeroGridItem {
  title: string;
  imgUrl: string;
}

interface Props {
  items: HeroGridItem[];
}

export const HeroSlideShow: React.FC<Props> = ({ items }) => {
  const [title, setTitle] = useState(items?.length ? items[0].title : null);
  const images = useMemo(() => {
    return items.map((item) => item.imgUrl);
  }, [items]);

  const handleImageChange = useCallback(
    (_, newIndex) => {
      setTitle(items[newIndex].title);
    },
    [items]
  );

  if (!items.length) return null;

  return (
    <div className={styles.root}>
      <div className={styles.backgroundContainer}>
        <Carousel
          images={images}
          sliderProps={{
            beforeChange: handleImageChange,
          }}
        />
      </div>
      <div className={styles.bodyContainer}>
        {title && <p className="text-2xl tablet:text-4xl">{title}</p>}
      </div>
    </div>
  );
};

interface CarouselProps {
  images: string[];
  sliderProps?: {};
}

const Carousel: React.FC<CarouselProps> = ({ images, sliderProps = {} }) => {
  const matchesPhone = useDeviceMediaQuery("phone");

  const carouselSettings = useMemo(() => {
    return {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 4000,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      arrows: !matchesPhone,
    };
  }, [matchesPhone]);

  return (
    <Slider {...carouselSettings} {...sliderProps}>
      {images.map((image) => (
        <img
          src={image}
          key={image}
          className="object-cover block w-full h-full"
        />
      ))}
    </Slider>
  );
};
