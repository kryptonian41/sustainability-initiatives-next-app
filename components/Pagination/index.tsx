import styles from "./styles.module.css";

type Props = {
  numberOfPages: number;
  selectedPage: number;
  prevClickAction: React.MouseEventHandler<HTMLButtonElement>;
  nextClickAction: React.MouseEventHandler<HTMLButtonElement>;
  pageBtnAction: Function;
};

const Pagination = ({
  numberOfPages,
  selectedPage,
  prevClickAction,
  nextClickAction,
  pageBtnAction,
}: Props) => {
  const renderLongPagination = (): React.ReactNode => {
    return (
      <>
        <button
          onClick={() => {
            if (selectedPage !== 1) pageBtnAction(1);
            else return;
          }}
          className={`${styles.pageBtn} ${
            selectedPage === 1 && styles.activePage
          }`}
        >
          1
        </button>
        {selectedPage !== 2 && <span>...</span>}
        {selectedPage !== 1 && selectedPage !== numberOfPages && (
          <button className={`${styles.pageBtn} ${styles.activePage}`}>
            {selectedPage}
          </button>
        )}
        {selectedPage !== numberOfPages - 1 && <span>...</span>}
        <button
          onClick={() => {
            if (selectedPage !== numberOfPages) pageBtnAction(numberOfPages);
            else return;
          }}
          className={`${styles.pageBtn} ${
            selectedPage === numberOfPages && styles.activePage
          }`}
        >
          {numberOfPages}
        </button>
      </>
    );
  };

  return (
    <div className={styles.container}>
      <button onClick={prevClickAction} className={styles.link}>
        Previous Page
      </button>
      {numberOfPages <= 6
        ? Array(numberOfPages)
            .fill(1)
            .map((_, index) => (
              <button
                onClick={() => {
                  if (selectedPage !== index + 1) pageBtnAction(index + 1);
                  else return;
                }}
                className={`${styles.pageBtn} ${
                  selectedPage === index + 1 && styles.activePage
                }`}
              >
                {index + 1}
              </button>
            ))
        : renderLongPagination()}
      <button onClick={nextClickAction} className={styles.link}>
        Next Page
      </button>
    </div>
  );
};

export default Pagination;
