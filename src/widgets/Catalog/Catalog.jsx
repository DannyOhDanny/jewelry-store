import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { PRODUCTS_PER_PAGE } from '@utils/constants';

import catalogAPI from './api/catalogAPI';
import List from './ui/List';
import styles from './styles.module.scss';
import Loader from './ui/Loader';

const Catalog = () => {
  const [page, setPage] = useState(1);

  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [product, setProduct] = useState('');
  const isFilterApplied = Boolean(price || brand || product);
  console.debug('isFilterApplied:', isFilterApplied);

  const { isLoading: isProductIDsLoading, data: productIDs = [] } = useQuery({
    queryKey: ['get-product-ids', page],
    queryFn: () =>
      catalogAPI.getProductIDs(
        (page - 1) * PRODUCTS_PER_PAGE,
        PRODUCTS_PER_PAGE
      )
  });
  const { isLoading: isAllIDsLoading, data: allIDs = [] } = useQuery({
    queryKey: ['get-product-ids'],
    queryFn: () => catalogAPI.getAllProductIDs()
  });

  const {
    isLoading: isFilteredProductIDsLoading,
    data: filteredProductIDs = []
  } = useQuery({
    queryKey: ['get-filtered-product-ids', price, brand, product],
    queryFn: () => catalogAPI.getFilteredProductIDs(price, brand, product),
    enabled: isFilterApplied
  });

  console.debug('filteredProductIDs:', filteredProductIDs);

  const isLoading =
    isProductIDsLoading || isFilteredProductIDsLoading || isAllIDsLoading;

  const resetFilters = () => {
    setPage(1);
    setPrice('');
    setBrand('');
    setProduct('');
  };
  const totalCount = Math.ceil(allIDs.length / PRODUCTS_PER_PAGE);

  return (
    <>
      <h1 className={styles.titleShop}>SHOP online</h1>
      <div className={styles.root}>
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
        {!isFilterApplied && (
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
              onClick={() => setPage(prevValue => prevValue + 1)}>
              Вперед
            </button>
          </div>
        )}
        {isLoading ? (
          <Loader />
        ) : (
          <List
            productIDs={isFilterApplied ? filteredProductIDs : productIDs}
          />
        )}
      </div>
    </>
  );
};

export default Catalog;
