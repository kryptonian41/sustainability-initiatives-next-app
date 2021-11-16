import clsx from "clsx";
import { OutlineButton, SolidButton } from "components/Button";
import { Container } from "components/Container";
import { Heading } from "components/Heading";
import AssociateModal from "components/Modal/AssociateModal";
import ActionBtns from "components/PhotoGrid/ActionBtns";
import { GridItem, GridItemProps } from "components/PhotoGrid/GridPhoto";
import { useThemeContext } from "components/ThemeProvider";
import Link from "next/link";
import React, { useCallback, useRef, useState } from "react";
import Slider from "react-slick";
import { useMediaQuery } from "utils/hooks/useMediaQuery";
import { Associate } from "utils/types";
import styles from "./styles.module.css";

export interface AssociateGridItem extends GridItemProps {
  associate: Associate
}
interface Props {
  items: AssociateGridItem[]
}

const AssociatesGrid: React.FC<Props> = ({ items }) => {
  const [isModalopen, setIsModalopen] = useState(false)
  const [selectedAssociate, setSelectedAssociate] = useState(null)
  const { breakpoints } = useThemeContext();
  const isDesktop = useMediaQuery(`(min-width: ${breakpoints.laptop}px)`).matches
  const isTablet = useMediaQuery(`(min-width: ${breakpoints.tablet}px)`).matches
  const sliderRef = useRef(null);

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

  const handleModalOpen = useCallback((associate) => () => {
    setSelectedAssociate(associate)
    setIsModalopen(true)
  }, [])

  const handleModalClose = useCallback(() => {
    setIsModalopen(false)
  }, [])

  return (
    <div className="my-20 tablet:my-32">
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
          {items.map(({ className, titleClasses, associate, ...restProps }) => (
            <GridItem
              {...restProps}
              className={clsx(isTablet && "pr-8", className)}
              titleClasses={clsx(!isTablet && "text-center", titleClasses)}
              onClick={handleModalOpen(associate)}
            />
          ))}
        </Slider>

        <div
          className={clsx(
            "mt-6",
            isDesktop && "text-right",
            isTablet && !isDesktop && "flex justify-between",
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

        <AssociateModal isOpen={isModalopen} associate={selectedAssociate} onClose={handleModalClose} />
      </Container>
    </div>
  );
};

export default AssociatesGrid;
