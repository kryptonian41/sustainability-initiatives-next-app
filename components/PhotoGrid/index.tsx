import { useMemo, useRef } from "react";
import { Heading } from "../Heading";
import { GridItemProps, GridItem } from "./GridPhoto";
import styles from "./styles.module.css";
import { Container } from "../Container";
import Slider from "react-slick";
import ActionBtns from "./ActionBtns";

type Props = {
  items: GridItemProps[];
  heading?: string;
  itemsPerRow?: number;
  itemsToShowInSlider?: number;
  withAction?: boolean;
  darkBg?: boolean;
  containerStyles?: React.CSSProperties;
  className?: string;
  openItemOnNewPage?: boolean;
};

const PhotoGrid: React.FC<Props> = ({
  items,
  heading,
  itemsPerRow = 5,
  itemsToShowInSlider = 4,
  withAction = false,
  darkBg = false,
  containerStyles,
  className,
  openItemOnNewPage = false,
}) => {
  const sliderRef = useRef(null);
  const sliderSettings = {
    dots: false,
    infinite: false,
    arrows: false,
    slidesToShow: itemsToShowInSlider,
    slidesToScroll: 1,
  };

  const gridItems = useMemo(() => {
    return items.map((props) => (
      <GridItem {...props} openItemOnNewPage={openItemOnNewPage} />
    ))
  }, [items])

  return (
    <div
      style={{
        backgroundColor: darkBg ? "#F6F0EB" : "white",
      }}
      className={className}
    >
      <Container className="overflow-hidden">
        {withAction ? (
          <div className={styles.photoGridContainer}>
            {heading && (
              <Heading
                label={heading}
                actions={<ActionBtns sliderRef={sliderRef} />}
              />
            )}
            <div className="my-8 tablet:my-20" style={containerStyles}>
              <Slider {...sliderSettings} ref={sliderRef} className="-mr-8">
                {gridItems}
              </Slider>
            </div>
          </div>
        ) : (
          <div className={styles.photoGridContainer}>
            {heading && <Heading label={heading} />}
            <div
              className={styles.photosContainer}
              style={{
                ...(containerStyles ?? null),
                gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)`,
              }}
            >
              {gridItems}
            </div >
          </div >
        )}
      </Container >
    </div >
  );
};

export default PhotoGrid;
