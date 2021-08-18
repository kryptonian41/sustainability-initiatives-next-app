import styles from "./styles.module.css";

export interface GridItem {
  title: string;
  subTitle: string;
  imgSrc: string;
};

const GridPhoto: React.FC<GridItem> = ({ imgSrc, subTitle, title }) => {
  return (
    <div className={styles.gridItem}>
      <img src={imgSrc} alt={title} />
      <p className={styles.name}>{title}</p>
      {subTitle && <p className={styles.position}>{subTitle}</p>}
    </div>
  );
};

export default GridPhoto;
