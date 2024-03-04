import styles from './styles.module.scss';

const Pagination = ({ page, totalCount, setPage }) => {
  return (
    <div className={styles.pagination}>
      <button
        type="button"
        disabled={page === 1}
        onClick={() => setPage(prevValue => prevValue - 1)}>
        Назад
      </button>
      <span>
        {page}/{totalCount}
      </span>
      <button
        type="button"
        disabled={page === totalCount}
        onClick={() => setPage(prevValue => prevValue + 1)}>
        Вперед
      </button>
    </div>
  );
};

export default Pagination;
