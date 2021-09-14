import { useRef } from "react";
import { Heading } from "../Heading";
import { GridItemProps, GridItem } from "./GridPhoto";
import { PrevArrow, NextArrow } from "components/SlideShow/arrows";
import styles from "./styles.module.css";
import { Container } from "../Container";
import { useThemeContext } from "components/ThemeProvider";
import Slider from "react-slick";

type Props = {
  items: GridItemProps[];
  heading: string;
  itemsPerRow?: number;
  itemsToShowInSlider?: number;
  withAction?: boolean;
  darkBg?: boolean;
  containerStyles?: React.CSSProperties;
  className?: string;
};

const PhotoGrid = ({
  items,
  heading,
  itemsPerRow = 5,
  itemsToShowInSlider = 4,
  withAction = false,
  darkBg = false,
  containerStyles,
  className,
}: Props) => {
  const handleClick = (direction: string): void => {
    switch (direction) {
      case "right":
        sliderRef.current?.slickNext();
        break;
      case "left":
        sliderRef.current?.slickPrev();
        break;
      default:
    }
  };

  const { colors } = useThemeContext();

  const sliderRef = useRef(null);

  const renderActions = (): React.ReactNode => {
    return (
      <div className={styles.actionBtns}>
        <PrevArrow
          style={{
            stroke: colors.secondary,
            transform: "rotate(180deg)",
            marginRight: "2rem",
            cursor: "pointer",
          }}
          onClick={() => handleClick("left")}
        />
        <NextArrow
          style={{ stroke: colors.secondary, cursor: "pointer" }}
          onClick={() => handleClick("right")}
        />
      </div>
    );
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    slidesToShow: itemsToShowInSlider,
    slidesToScroll: 1,
  };

  return (
    <div
      style={{
        backgroundColor: darkBg ? "#F6F0EB" : "white",
      }}
      className={className}
    >
      <Container>
        {withAction ? (
          <div className={styles.photoGridContainer}>
            <Heading label={heading} actions={renderActions()} />
            <Slider {...sliderSettings} ref={sliderRef}>
              {items.map((item) => (
                <GridItem {...item} key={item.imgSrc} />
              ))}
            </Slider>
            {/* <div className={styles.photosSlider}>
              <div
                className={styles.photoSlidesContainer}
                id="slider"
                style={containerStyles ?? null}
              >
                {items.map((item) => (
                  <GridItem {...item} key={item.imgSrc} />
                ))}
              </div>
            </div> */}
          </div>
        ) : (
          <div className={styles.photoGridContainer}>
            <Heading label={heading} />
            <div
              className={styles.photosContainer}
              style={{
                ...(containerStyles ?? null),
                gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)`,
              }}
            >
              {items.map((item) => (
                <GridItem {...item} key={item.imgSrc} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default PhotoGrid;
