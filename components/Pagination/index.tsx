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
  return (
    <div className={styles.container}>
      <button onClick={prevClickAction} className={styles.link}>
        Previous Page
      </button>
      {numberOfPages <= 5 ? (
        Array(numberOfPages)
          .fill(1)
          .map((_, index) => (
            <button
              onClick={() => pageBtnAction(index + 1)}
              className={`${styles.pageBtn} ${
                selectedPage === index + 1 && styles.activePage
              }`}
            >
              {index + 1}
            </button>
          ))
      ) : (
        <>
          {Array(3)
            .fill(1)
            .map((_, index) => (
              <button
                onClick={() => pageBtnAction(index + 1)}
                className={`${styles.pageBtn} ${
                  selectedPage === index + 1 && styles.activePage
                }`}
              >
                {index + 1}
              </button>
            ))}
          <span>. . .</span>
          <button
            onClick={() => pageBtnAction(numberOfPages)}
            className={`${styles.pageBtn} ${
              selectedPage === numberOfPages && styles.activePage
            }`}
          >
            {numberOfPages}
          </button>
        </>
      )}
      <button onClick={nextClickAction} className={styles.link}>
        Next Page
      </button>
    </div>
  );
};

export default Pagination;
