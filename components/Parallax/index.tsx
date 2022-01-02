import clsx from "clsx";
import { Container } from "components/Container";
import Link from "next/link";
import React from "react";
import { ParallaxBanner, ParallaxProvider } from "react-scroll-parallax";
import { Button } from "../Button";
import styles from "./styles.module.css";
export interface Props {
  isLight?: boolean;
  bgImg: string;
  title: string;
  subTitle?: string;
  btnContent: string | React.ReactNode;
  btnLink?: string;
}

const Parallax = ({
  bgImg,
  title,
  subTitle,
  btnContent,
  isLight = false,
  btnLink,
}: Props) => {
  return (
    <ParallaxProvider>
      <ParallaxBanner
        layers={[
          {
            image: bgImg,
            amount: 0.4,
          },
        ]}
        style={{ height: "fit-content" }}
      >
        <div
          className={styles.bgOverlay}
          style={{
            backgroundImage: isLight
              ? "linear-gradient(90deg, rgba(255,255,255,0.9) 30%, rgba(255,255,255,0.2), transparent)"
              : "linear-gradient(90deg, rgba(0,0,0,0.8) 30%, transparent)",
          }}
        />
        <div className={styles["content-wrapper"]}>
          <div
            className={clsx(styles.content, {
              [styles.light]: isLight,
            })}
          >
            <div className="py-8">
              {title && <h3>{title}</h3>}
              {subTitle && <p>{subTitle}</p>}
              {btnContent &&
                (btnLink ? (
                  <Link href={btnLink}>
                    <Button>{btnContent}</Button>
                  </Link>
                ) : (
                  <Button>{btnContent}</Button>
                ))}
            </div>
          </div>
        </div>
      </ParallaxBanner>
    </ParallaxProvider>
  );
};

export default Parallax;
