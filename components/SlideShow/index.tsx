import React, { useMemo } from 'react'
import Slider from "react-slick";
import { Picture } from 'utils/types';
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
  const hasMoreThanOneImage = useMemo(() => {
    return Boolean(images) && images.length > 1
  }, [images])

  return (
    <div className={styles.root}>
      <div className={styles.backgroundContainer}>
        {hasMoreThanOneImage ? <Carousel images={images} /> : null}
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