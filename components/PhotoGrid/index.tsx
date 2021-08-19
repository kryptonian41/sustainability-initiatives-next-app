import { Heading } from "../Heading";
import { GridItemProps, GridItem } from "./GridPhoto";
import NextButton from "../../assets/svgs/scroll-action-arrow.svg";
import styles from "./styles.module.css";
import { Container } from "../Container";

type Props = {
  items: GridItemProps[];
  heading: string;
  itemsPerRow?: number,
  withAction?: boolean;
  darkBg?: boolean;
};

const PhotoGrid = ({
  items,
  heading,
  itemsPerRow = 5,
  withAction = false,
  darkBg = false,
}: Props) => {
  const handleClick = (direction: string): void => {
    const slider = document.getElementById("slider");
    switch (direction) {
      case "right":
        slider.scrollBy(50, 0);
        break;
      case "left":
        slider.scrollBy(-50, 0);
        break;
      default:
    }
  };

  const renderActions = (): React.ReactNode => {
    return (
      <div className={styles.actionBtns}>
        <NextButton
          style={{ transform: "rotate(180deg)" }}
          onClick={() => handleClick("left")}
        />
        <NextButton onClick={() => handleClick("right")} />
      </div>
    );
  };

  return (
    <div
      style={{
        backgroundColor: darkBg ? "#F6F0EB" : "white",
        padding: "6rem 0",
      }}
    >
      <Container>
        {withAction ? (
          <div className={styles.photoGridContainer}>
            <Heading
              label={heading}
              actions={renderActions()}
            />
            <div className={styles.photosSlider}>
              <div className={styles.photoSlidesContainer} id="slider">
                {items.map((item) => (
                  <GridItem {...item} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.photoGridContainer}>
            <Heading label={heading} />
            <div className={styles.photosContainer} style={{
              gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)`
            }}>
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
