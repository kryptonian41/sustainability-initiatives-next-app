import React from "react";
import styles from "./styles.module.css";
import { PrevArrow, NextArrow } from "components/SlideShow/arrows";
import { useThemeContext } from "components/ThemeProvider";

const ActionBtns = ({ sliderRef }) => {
  const { colors } = useThemeContext();

  const handleClick = (direction: string): void => {
    switch (direction) {
      case "right":
        sliderRef.current?.slickNext();
        break;
      case "left":
        sliderRef.current?.slickPrev();
        break;
      default:
    }
  };

  return (
    <div className={styles.actionBtns}>
      <PrevArrow
        style={{
          stroke: colors.secondary,
          transform: "rotate(180deg)",
          marginRight: "2rem",
          cursor: "pointer",
        }}
        onClick={() => handleClick("left")}
      />
      <NextArrow
        style={{ stroke: colors.secondary, cursor: "pointer" }}
        onClick={() => handleClick("right")}
      />
    </div>
  );
};

export default ActionBtns;
