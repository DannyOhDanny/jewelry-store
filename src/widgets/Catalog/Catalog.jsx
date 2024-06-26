import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { PRODUCTS_PER_PAGE, SERVER_ERROR } from '@utils/constants';

import { jewelryObjects } from '../../utils/functions';
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
  //const totalCount = Math.ceil(allIDs.length / PRODUCTS_PER_PAGE);

  const filterItems = () => {
    let filteredItems = jewelryObjects;

    if (price) {
      const priceString = price.toString();
      filteredItems = filteredItems.filter(item =>
        item.price.toString().startsWith(priceString)
      );
    }
    if (brand) {
      filteredItems = filteredItems.filter(item => item.brand === brand);
    }

    if (product) {
      filteredItems = filteredItems.filter(item =>
        item.product.toLowerCase().includes(product.toLowerCase())
      );
    }
    filteredItems.sort((a, b) => a.price - b.price);
    return filteredItems;
  };

  const filteredItems = filterItems();

  const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const itemsToDisplay = filteredItems.slice(startIndex, endIndex);
  const itemsToDisplayDef = jewelryObjects.slice(startIndex, endIndex);

  const totalCountFiltered = Math.ceil(
    jewelryObjects.length / PRODUCTS_PER_PAGE
  );
  const filteredCountFiltered = Math.ceil(
    filteredItems.length / PRODUCTS_PER_PAGE
  );

  useEffect(() => {
    if (isFilterApplied) {
      setPage(1);
    }
  }, [isFilterApplied]);

  return (
    <>
      <header className={styles.header}>
        <a
          href="https://dannyohdanny.github.io/jewelry-store/"
          className={styles.link}>
          <img src={logo} className={styles.icon} />
        </a>
        <h1 className={styles.title}>SHOP online</h1>
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
        {/* {!isFilterApplied && (
          <Pagination
            page={page}
            totalCount={
              filteredItems ? filteredCountFiltered : totalCountFiltered
            }
            setPage={setPage}
          />
        )} */}
        <Pagination
          page={page}
          totalCount={
            isFilterApplied ? filteredCountFiltered : totalCountFiltered
          }
          setPage={setPage}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <List
            filteredItems={isFilterApplied ? itemsToDisplay : itemsToDisplayDef}
            productIDs={isFilterApplied ? filteredProductIDs : productIDs}
          />
        )}
        {error && <p>{error}</p>}
      </div>
    </>
  );
};

export default Catalog;
