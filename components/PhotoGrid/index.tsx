import { Heading } from "../Heading";
import GridPhoto from "./GridPhoto";
import Layout from "../Layout";
import NextButton from "../../assets/svgs/scroll-action-arrow.svg";
import { People } from "./types";
import styles from "./styles.module.css";

type Props = {
  people: People;
  showPositions?: boolean;
  withAction?: boolean;
  darkBg?: boolean;
};

const PhotoGrid = ({
  people,
  showPositions = true,
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
      <Layout>
        {withAction ? (
          <div className={styles.photoGridContainer}>
            <Heading
              label="The People who make it possible"
              actions={renderActions()}
            />
            <div className={styles.photosSlider}>
              <div className={styles.photoSlidesContainer} id="slider">
                {people.map((person) => (
                  <GridPhoto person={person} showPositions={showPositions} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.photoGridContainer}>
            <Heading label="The People who make it possible" />
            <div className={styles.photosContainer}>
              {people.map((person) => (
                <GridPhoto person={person} showPositions={showPositions} />
              ))}
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default PhotoGrid;
