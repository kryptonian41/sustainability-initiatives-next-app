import { useRef } from "react";
import { Heading } from "../Heading";
import { GridItemProps, GridItem } from "./GridPhoto";
import styles from "./styles.module.css";
import { Container } from "../Container";
import Slider from "react-slick";
import ActionBtns from "./ActionBtns";

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
  const sliderRef = useRef(null);

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
            <Heading
              label={heading}
              actions={<ActionBtns sliderRef={sliderRef} />}
            />
            <Slider {...sliderSettings} ref={sliderRef}>
              {items.map((item) => (
                <GridItem {...item} key={item.imgSrc} className="mr-8" />
              ))}
            </Slider>
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
