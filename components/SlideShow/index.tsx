import clsx from "clsx";
import React, { useMemo } from "react";
import Slider from "react-slick";
import { Picture } from "utils/types";
import { NextArrow, PrevArrow } from "./arrows";
import styles from "./styles.module.css";

enum Sizes {
  small,
  medium,
  large,
}

interface Props {
  title?: string;
  subTitle?: String;
  images: Picture[];
  size?: keyof typeof Sizes;
  withOverlay?: boolean;
}

export const SlideShow: React.FC<Props> = ({
  images,
  title = "",
  subTitle = "",
  size = "medium",
  withOverlay = true,
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.backgroundContainer}>
        <Carousel images={images} />
      </div>
      <div
        className={clsx(withOverlay && styles.bodyContainer, {
          [styles.small]: Sizes[size] === Sizes.small,
          [styles.large]: Sizes[size] === Sizes.large,
        })}
      >
        <p
          className={clsx({
            ["text-xl"]: Sizes[size] === Sizes.small,
            ["text-2xl"]: Sizes[size] === Sizes.medium,
            ["text-3xl"]: Sizes[size] === Sizes.large,
          })}
        >
          {title}
        </p>
        <p
          className={clsx({
            ["text-lg mt-2"]: Sizes[size] === Sizes.medium,
            ["text-base mt-2"]: Sizes[size] === Sizes.small,
            ["text-xl mt-4"]: Sizes[size] === Sizes.large,
          })}
        >
          {subTitle}
        </p>
      </div>
    </div>
  );
};

const carouselSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

interface CarouselProps {
  images: Picture[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  return (
    <Slider {...carouselSettings}>
      {images.map((image) => (
        <img
          src={image.url}
          key={image.id}
          className="object-cover block w-full h-full"
        />
      ))}
    </Slider>
  );
};
