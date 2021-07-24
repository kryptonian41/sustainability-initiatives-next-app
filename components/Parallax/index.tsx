import React from "react";
import { ParallaxBanner, ParallaxProvider } from "react-scroll-parallax";
import Layout from "../Layout";
import { Button } from "../Button";
import styles from "./styles.module.css";

export interface Props {
  isLight?: boolean;
  bgImg: string;
  title: string;
  subTitle?: string;
  btnText: string;
  btnAction: React.MouseEventHandler<HTMLButtonElement>;
}

const Parallax = ({
  bgImg,
  title,
  subTitle,
  btnText,
  btnAction,
  isLight = false,
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
        style={{ position: "relative", minHeight: "60vh" }}
      >
        <div
          className={styles.bgOverlay}
          style={{
            backgroundImage: isLight
              ? "linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0.2), transparent, transparent)"
              : "linear-gradient(90deg, rgba(0,0,0,0.8), transparent)",
            color: isLight ? "black" : "white",
          }}
        >
          <Layout>
            <div className={styles.content}>
              {title && <h3>{title}</h3>}
              {subTitle && <p>{subTitle}</p>}
              {btnText && <Button>{btnText}</Button>}
            </div>
          </Layout>
        </div>
      </ParallaxBanner>
    </ParallaxProvider>
  );
};

export default Parallax;
