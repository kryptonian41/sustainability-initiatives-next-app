import clsx from "clsx";
import Link from "next/link";
import styles from "./styles.module.css";

export interface GridItemProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  item: {
    title: string;
    subTitle?: string;
    imgSrc: string;
    imageContainerStyles?: React.CSSProperties;
    imageStyles?: React.CSSProperties;
    path?: string;
  },
  className?: string;
  titleClasses?: string;
  key?: string | number
  openItemOnNewPage?: boolean
}

export const GridItem: React.FC<GridItemProps> = ({
  item: {
    imgSrc,
    subTitle,
    title,
    imageStyles,
    imageContainerStyles,
    path
  },
  className,
  titleClasses,
  openItemOnNewPage = false,
  ...restProps
}) => {
  const item = (
    <div
      className={clsx(styles.gridItem, className, {
        "cursor-pointer": Boolean(path),
      })}
      {...restProps}
    >
      <div style={imageContainerStyles ?? null}>
        <img src={imgSrc} alt={title} style={imageStyles ?? null} />
      </div>
      <p
        className={clsx(
          styles.name,
          titleClasses,
          "font-semibold mt-6 text-sm laptop:text-base"
        )}
      >
        {title}
      </p>
      {subTitle && (
        <p className={clsx(styles.position, "text-xs laptop:text-sm")}>
          {subTitle}
        </p>
      )}
    </div>
  );

  if (path && openItemOnNewPage)
    return (
      <a href={path} target="_blank">
        {item}
      </a>
    );
  else if (path) return <Link href={path}>{item}</Link>;
  else return item;
};
