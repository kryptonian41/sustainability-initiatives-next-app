import { Heading } from "../Heading";
import GridPhoto from "./GridPhoto";
import { People } from "./types";
import styles from "./styles.module.css";

type Props = {
  people: People;
  showPositions: boolean;
};

const PhotoGrid = ({ people, showPositions = true }: Props) => {
  return (
    <div className={styles.photoGridContainer}>
      <Heading label="The People who make it possible" />
      <div className={styles.photosContainer}>
        {people.map((person) => (
          <GridPhoto person={person} showPositions={showPositions} />
        ))}
      </div>
    </div>
  );
};

export default PhotoGrid;
