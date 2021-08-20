import clsx from "clsx";
import styles from "./styles.module.css";

export interface GridItemProps {
  title: string;
  subTitle?: string;
  imgSrc: string;
  imageContainerStyles?: React.CSSProperties,
  imageStyles?: React.CSSProperties,
};

export const GridItem: React.FC<GridItemProps> = ({ imgSrc, subTitle, title, imageStyles, imageContainerStyles }) => {
  return (
    <div className={styles.gridItem}>
      <div style={imageContainerStyles ?? null}>
        <img src={imgSrc} alt={title} style={imageStyles ?? null} />
      </div>
      <p className={clsx(styles.name, 'font-semibold mt-6')}>{title}</p>
      {subTitle && <p className={styles.position}>{subTitle}</p>}
    </div>
  );
};

