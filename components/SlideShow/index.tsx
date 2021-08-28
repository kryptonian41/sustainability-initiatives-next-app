import React, { useMemo } from 'react'
import Slider from "react-slick";
import { Picture } from 'utils/types';
import { NextArrow, PrevArrow } from './arrows';
import styles from './styles.module.css'

interface Props {
  title: string,
  subTitle: String,
  images: Picture[],
}

export const SlideShow: React.FC<Props> = ({
  images,
  title,
  subTitle
}) => {

  return (
    <div className={styles.root}>
      <div className={styles.backgroundContainer}>
        <Carousel images={images} />
      </div>
      <div className={styles.bodyContainer}>
        <p className="text-2xl">{title}</p>
        <p className="text-lg mt-4">{subTitle}</p>
      </div>
    </div>
  )
}


const carouselSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />
};

interface CarouselProps {
  images: Picture[]
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  return <Slider {...carouselSettings}>
    {images.map(image =>
      <img src={image.url} key={image.id} className="object-cover block w-full h-full" />
    )
    }
  </Slider>
}
