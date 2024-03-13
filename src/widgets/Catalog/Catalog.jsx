import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { PRODUCTS_PER_PAGE, SERVER_ERROR } from '@utils/constants';

import logo from '../../assets/sketch_6423309.svg';

import catalogAPI from './api/catalogAPI';

import List from './ui/List';
import Loader from './ui/Loader';
import Pagination from './ui/Pagination';
import Form from './ui/Form';

import styles from './styles.module.scss';

const Catalog = () => {
  const [error, setError] = useState('');

  const [page, setPage] = useState(1);
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [product, setProduct] = useState('');

  const isFilterApplied = Boolean(price || brand || product);

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

  const isLoading =
    isProductIDsLoading || isFilteredProductIDsLoading || isAllIDsLoading;

  if (allIDs.isError) {
    setError(SERVER_ERROR);
  }
  if (productIDs.isError) {
    setError(SERVER_ERROR);
  }

  if (filteredProductIDs.isError) {
    setError(SERVER_ERROR);
  }
  const resetFilters = () => {
    setPage(1);
    setPrice('');
    setBrand('');
    setProduct('');
    setError('');
  };
  const totalCount = Math.ceil(allIDs.length / PRODUCTS_PER_PAGE);

  return (
    <>
      <header className={styles.header}>
        <a href="https://dannyohdanny.github.io/jewelry-store/">
          <img src={logo} className={styles.icon} />
        </a>
        <h1 className={styles.titleShop}>SHOP online</h1>
      </header>
      <div className={styles.root}>
        <Form
          price={price}
          brand={brand}
          product={product}
          setPrice={setPrice}
          setBrand={setBrand}
          setProduct={setProduct}
          resetFilters={resetFilters}
          isFilterApplied={isFilterApplied}
        />
        {!isFilterApplied && (
          <Pagination page={page} totalCount={totalCount} setPage={setPage} />
        )}
        {isLoading ? (
          <Loader />
        ) : (
          <List
            productIDs={isFilterApplied ? filteredProductIDs : productIDs}
          />
        )}
        {error && <p>{error}</p>}
      </div>
    </>
  );
};

export default Catalog;
