import clsx from 'clsx';
import { NextArrow, PrevArrow } from 'components/SlideShow/arrows';
import { useThemeContext } from 'components/ThemeProvider';
import React, { useMemo } from 'react'
import Slider from "react-slick";
import { useMediaQuery } from 'utils/hooks/useMediaQuery';
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



interface CarouselProps {
  quotes: Quote[]
  sliderProps?: {}
}

const Carousel: React.FC<CarouselProps> = ({ quotes, sliderProps = {} }) => {
  const { breakpoints } = useThemeContext()
  const { matches } = useMediaQuery(`(max-width: ${breakpoints.tablet}px)`)

  const carouselSettings = useMemo(() => {
    return {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      arrows: !matches
    };
  }, [matches])

  return <Slider {...carouselSettings} {...sliderProps} >
    {
      quotes.map(({ quote, associate: { name }, id }) =>
        <div className={styles.quoteSlide} key={id}>
          <div className={styles.quote}>
            {quote}
          </div>
          <div className={clsx(styles.author)}>
            <span>-Associate Name</span>
            <span className={styles.name}>{name}</span>
          </div>
        </div>
      )
    }
  </Slider>
}
