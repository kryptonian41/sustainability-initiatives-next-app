import React from "react";
import { ParallaxBanner, ParallaxProvider } from "react-scroll-parallax";
import { Button } from "../Button";
import styles from "./styles.module.css";
import { Container } from "components/Container";

export interface Props {
  isLight?: boolean;
  bgImg: string;
  title: string;
  subTitle?: string;
  btnContent: string | React.ReactNode;
}

const Parallax = ({
  bgImg,
  title,
  subTitle,
  btnContent,
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
        style={{ height: "fit-content" }}
      >
        <div
          className={styles.bgOverlay}
          style={{
            backgroundImage: isLight
              ? "linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0.2), transparent, transparent)"
              : "linear-gradient(90deg, rgba(0,0,0,0.8), transparent)",
          }}
        />
        <Container>
          <div
            className={styles.content}
            style={{ color: isLight ? "black" : "white" }}
          >
            <div>
              {title && <h3>{title}</h3>}
              {subTitle && <p>{subTitle}</p>}
              {btnContent && <Button>{btnContent}</Button>}
            </div>
          </div>
        </Container>
      </ParallaxBanner>
    </ParallaxProvider>
  );
};

export default Parallax;
