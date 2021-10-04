import React, { useRef } from "react";
import clsx from "clsx";
import { Container } from "components/Container";
import { OutlineButton, SolidButton } from "components/Button";
import Link from "next/link";
import { useThemeContext } from "components/ThemeProvider";
import { useMediaQuery } from "utils/hooks/useMediaQuery";
import { GridItem } from "components/PhotoGrid/GridPhoto";
import Slider from "react-slick";
import { Heading } from "components/Heading";
import ActionBtns from "components/PhotoGrid/ActionBtns";
import styles from "./styles.module.css";

const AssociatesGrid = ({ associatedPhotoGridItems }) => {
  const sliderRef = useRef(null);

  const { breakpoints } = useThemeContext();
  const isDesktop = useMediaQuery(`(min-width: ${breakpoints.laptop}px)`)
    .matches;
  const isTablet = useMediaQuery(`(min-width: ${breakpoints.tablet}px)`)
    .matches;

  const sliderSettings = {
    dots: false,
    infinite: false,
    slidesToShow: 4,
    arrows: false,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: breakpoints.laptop,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: breakpoints.tablet,
        settings: {
          slidesToShow: 1,
          arrows: true,
        },
      },
    ],
  };

  return (
    <div className="py-32">
      <Container className="overflow-hidden">
        <Heading
          label="Associates who stand with us"
          actions={isDesktop ? <ActionBtns sliderRef={sliderRef} /> : null}
        />
        <Slider
          {...sliderSettings}
          ref={sliderRef}
          className={clsx(styles.slider, isTablet && "-mr-8", "my-20")}
        >
          {associatedPhotoGridItems.map((item) => (
            <div key={item.imgSrc}>
              <GridItem
                {...item}
                className={clsx(isTablet && "mr-8", !isTablet && "mx-12")}
                nameClasses={clsx(!isTablet && "text-center")}
              />
            </div>
          ))}
        </Slider>
        <div
          className={clsx(
            "mt-6",
            isTablet && !isDesktop && "flex justify-between",
            isDesktop && "text-right",
            !isTablet && !isDesktop && "text-center"
          )}
        >
          {isTablet && !isDesktop && <ActionBtns sliderRef={sliderRef} />}
          {!isTablet ? (
            <SolidButton>
              <Link href="/associates">View All</Link>
            </SolidButton>
          ) : (
            <OutlineButton>
              <Link href="/associates">View All</Link>
            </OutlineButton>
          )}
        </div>
      </Container>
    </div>
  );
};

export default AssociatesGrid;
