import clsx from "clsx";
import Link from "next/link";
import styles from "./styles.module.css";

export interface GridItemProps {
  title: string;
  subTitle?: string;
  imgSrc: string;
  imageContainerStyles?: React.CSSProperties;
  imageStyles?: React.CSSProperties;
  path?: string;
}

export const GridItem: React.FC<GridItemProps> = ({
  imgSrc,
  subTitle,
  title,
  imageStyles,
  imageContainerStyles,
  path,
}) => {
  const item = (
    <div className={styles.gridItem}>
      <div style={imageContainerStyles ?? null}>
        <img src={imgSrc} alt={title} style={imageStyles ?? null} />
      </div>
      <p
        className={clsx(
          styles.name,
          "font-semibold mt-6 text-sm laptop:text-base"
        )}
      >
        {title}
      </p>
      {subTitle && <p className={clsx(styles.position, "text-xs laptop:text-sm")}>{subTitle}</p>}
    </div>
  );

  if (path)
    return (
      <div style={{ cursor: "pointer" }}>
        <Link href={path}>{item}</Link>
      </div>
    );
  return item;
};
