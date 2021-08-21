import clsx from 'clsx';
import { NextArrow, PrevArrow } from 'components/SlideShow/arrows';
import React from 'react'
import Slider from "react-slick";
import { Quote } from 'utils/types';
import styles from './styles.module.css'

interface Props {
  items: Quote[],
}

export const QuotesSlideShow: React.FC<Props> = ({
  items
}) => {
  if (!items.length) return null
  return (
    <div className={styles.root}>
      <Carousel quotes={items} />
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
  quotes: Quote[]
  sliderProps?: {}
}

const Carousel: React.FC<CarouselProps> = ({ quotes, sliderProps = {} }) => {
  return <Slider {...carouselSettings} {...sliderProps} >
    {
      quotes.map(({ quote, associate: { name } }) => <div className={styles.quoteSlide}>
        <div className={styles.quote}>
          {quote}
        </div>
        <div className={clsx(styles.author)}>
          <span>-Associate Name</span>
          <span className="name">{name}</span>
        </div>
      </div>)
    }
  </Slider>
}
