import { AssociateGridItem } from "components/AssociatesGrid";
import { Container } from "components/Container";
import AssociateModal from "components/Modal/AssociateModal";
import Pagination from "components/Pagination";
import PhotoGrid from "components/PhotoGrid";
import { GridItemProps } from "components/PhotoGrid/GridPhoto";
import { useThemeContext } from "components/ThemeProvider";
import { GetStaticProps } from "next";
import React, {
  useCallback, useEffect, useLayoutEffect, useMemo,
  useState
} from "react";
import { getAssociates } from "utils/api/client-side-api";
import { useMediaQuery } from "utils/hooks/useMediaQuery";
import { Associate } from "utils/types";

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
  const [isModalopen, setIsModalopen] = useState(false)
  const [selectedAssociate, setSelectedAssociate] = useState(null)
  const [showPaginationBar, numberOfPages] = useMemo(() => {
    return [
      associates.length > itemsPerPage,
      Math.ceil(associates.length / itemsPerPage),
    ];
  }, [associates, itemsPerPage]);


  const handleModalOpen = useCallback((associate) => () => {
    setSelectedAssociate(associate)
    setIsModalopen(true)
  }, [])

  const handleModalClose = useCallback(() => {
    setIsModalopen(false)
  }, [])

  const gridItems = useMemo<AssociateGridItem[]>(() => {
    const test = associates.map((associate) => ({
      item: {
        title: associate.name,
        imgSrc: associate.logo.url,
      },
      associate,
      key: associate.id,
      onClick: handleModalOpen(associate),
      className: 'cursor-pointer'
    }))
    return [...test];
  }, [associates]);

  const paginatedItems = useMemo<GridItemProps[]>(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    return gridItems.slice(startIndex, endIndex);
  }, [gridItems, currentPage, itemsPerPage]);

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

  useEffect(() => {
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
      <div className="py-20">
        <PhotoGrid
          items={paginatedItems}
          heading="Our Associates"
          itemsPerRow={itemsPerRow}
          containerStyles={{
            // @ts-ignore
            "--gap": "3rem",
            gridRowGap: "5rem",
            marginTop: 90,
            alignItems: "baseline",
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

      <AssociateModal isOpen={isModalopen} associate={selectedAssociate} onClose={handleModalClose} />
    </div>
  );
};

export default Associates;
