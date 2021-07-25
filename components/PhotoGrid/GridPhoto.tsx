import { Person } from "./types";
import styles from "./styles.module.css";

type Props = {
  person: Person;
  showPositions: boolean;
};

const GridPhoto = ({ person, showPositions }: Props) => {
  const { imgSrc, name, position } = person;
  return (
    <div className={styles.gridItem}>
      <img src={imgSrc} alt={name} />
      <p className={styles.name}>{name}</p>
      {showPositions && <p className={styles.position}>{position}</p>}
    </div>
  );
};

export default GridPhoto;
