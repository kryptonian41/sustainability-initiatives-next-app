import styles from "./styles.module.css";

export interface GridItemProps {
  title: string;
  subTitle: string;
  imgSrc: string;
};

export const GridItem: React.FC<GridItemProps> = ({ imgSrc, subTitle, title }) => {
  return (
    <div className={styles.gridItem}>
      <img src={imgSrc} alt={title} />
      <p className={styles.name}>{title}</p>
      {subTitle && <p className={styles.position}>{subTitle}</p>}
    </div>
  );
};

