import styles from "./styles.module.css";

type Props = {
  numberOfPages: number;
  selectedPage: number;
  prevClickAction: React.MouseEventHandler<HTMLButtonElement>;
  nextClickAction: React.MouseEventHandler<HTMLButtonElement>;
  pageBtnAction: Function;
  isCentered?: boolean;
};

const Pagination = ({
  numberOfPages,
  selectedPage,
  prevClickAction,
  nextClickAction,
  pageBtnAction,
  isCentered = false,
}: Props) => {
  const renderBtn = (pageNumber: number): React.ReactNode => {
    return (
      <button
        key={pageNumber}
        onClick={() => {
          if (selectedPage !== pageNumber) pageBtnAction(pageNumber);
        }}
        className={`${styles.pageBtn} ${selectedPage === pageNumber && styles.activePage
          }`}
      >
        {pageNumber}
      </button>
    );
  };

  const renderLongPagination = (): React.ReactNode => {
    const renderEllipsis = () => (
      <>
        <span style={{ marginRight: "0.8rem" }}>.</span>
        <span style={{ marginRight: "0.8rem" }}>.</span>
        <span>.</span>
      </>
    );

    return (
      <>
        {renderBtn(1)}
        {selectedPage > 2 && renderEllipsis()}
        {selectedPage === 1 && renderBtn(2)}
        {selectedPage !== 1 &&
          selectedPage !== numberOfPages &&
          renderBtn(selectedPage)}
        {selectedPage === numberOfPages && renderBtn(numberOfPages - 1)}
        {selectedPage < numberOfPages - 1 && renderEllipsis()}
        {renderBtn(numberOfPages)}
      </>
    );
  };

  return (
    <div
      className={styles.container}
      style={isCentered ? { margin: "auto" } : {}}
    >
      <button onClick={prevClickAction} className={styles.link}>
        Previous Page
      </button>
      {numberOfPages <= 5
        ? Array(numberOfPages)
          .fill(1)
          .map((_, index) => renderBtn(index + 1))
        : renderLongPagination()}
      <button onClick={nextClickAction} className={styles.link}>
        Next Page
      </button>
    </div>
  );
};

export default Pagination;
