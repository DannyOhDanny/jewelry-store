import styles from './styles.module.scss';

const Form = ({
  price,
  brand,
  product,
  setPrice,
  setBrand,
  setProduct,
  resetFilters,
  isFilterApplied
}) => {
  return (
    <form className={styles.filter}>
      <h3 className={styles.title}>Фильтр</h3>

      <input
        type="number"
        placeholder="Цена"
        value={price}
        onChange={({ target }) => setPrice(target.value)}
      />
      <input
        placeholder="Бренд"
        value={brand}
        onChange={({ target }) => setBrand(target.value)}
      />
      <input
        placeholder="Название"
        value={product}
        onChange={({ target }) => setProduct(target.value)}
      />
      {isFilterApplied && (
        <button
          className={styles.filterResetButton}
          type="reset"
          onClick={resetFilters}>
          Сбросить
        </button>
      )}
    </form>
  );
};

export default Form;
