import { Container } from "components/Container";
import Pagination from "components/Pagination";
import PhotoGrid from "components/PhotoGrid";
import { GridItemProps } from "components/PhotoGrid/GridPhoto";
import { GetStaticProps } from "next";
import React, {
  ReactElement,
  useCallback,
  useMemo,
  useState,
  useLayoutEffect,
} from "react";
import { getAssociates } from "utils/api/client-side-api";
import { Associate } from "utils/types";
import { useMediaQuery } from "utils/hooks/useMediaQuery";
import { useThemeContext } from "components/ThemeProvider";

interface Props {
  associates: Associate[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      associates: await getAssociates(),
    },
  };
};

const Associates: React.FC<Props> = ({ associates }) => {
  const [itemsPerPage, setItemPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPaginationBar, numberOfPages] = useMemo(() => {
    return [
      associates.length > itemsPerPage,
      Math.ceil(associates.length / itemsPerPage),
    ];
  }, [associates, itemsPerPage]);

  const gridItems = useMemo<GridItemProps[]>(() => {
    return associates.map((associate) => {
      return {
        title: associate.name,
        imgSrc: associate.logo.url,
      };
    });
  }, [associates, itemsPerPage]);

  const paginatedItems = useMemo<GridItemProps[]>(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    return gridItems.slice(startIndex, endIndex);
  }, [gridItems, currentPage]);

  const createPaginationActionHandler = useCallback(
    (action) => (arg) => {
      switch (action) {
        case "prev": {
          if (currentPage === 1) return;
          setCurrentPage((page) => page - 1);
          break;
        }

        case "next": {
          if (currentPage === numberOfPages) return;
          setCurrentPage((page) => page + 1);
          break;
        }

        case "number": {
          if (arg) setCurrentPage(arg);
        }

        default:
          break;
      }
    },
    [currentPage, numberOfPages]
  );

  const { breakpoints } = useThemeContext();
  const isTablet = useMediaQuery(`(min-width: ${breakpoints.tablet}px)`)
    .matches;
  const isDesktop = useMediaQuery(`(min-width: ${breakpoints.laptop}px)`)
    .matches;

  useLayoutEffect(() => {
    if (isDesktop) setItemPerPage(16);
    else if (isTablet) setItemPerPage(10);
    else setItemPerPage(7);
  }, [isTablet, isDesktop]);

  const itemsPerRow = useMemo(() => {
    if (isDesktop) return 4;
    if (isTablet) return 2;
    return 1;
  }, [isTablet, isDesktop]);

  return (
    <div>
      <div className="py-40">
        <PhotoGrid
          items={paginatedItems}
          heading="Our Associates"
          itemsPerRow={itemsPerRow}
          containerStyles={{
            // @ts-ignore
            "--gap": "6rem",
          }}
        />

        {showPaginationBar && (
          <Container>
            <div className="mt-20">
              <Pagination
                numberOfPages={numberOfPages}
                selectedPage={currentPage}
                prevClickAction={createPaginationActionHandler("prev")}
                nextClickAction={createPaginationActionHandler("next")}
                pageBtnAction={createPaginationActionHandler("number")}
                isCentered={!isDesktop}
              />
            </div>
          </Container>
        )}
      </div>
    </div>
  );
};

export default Associates;
