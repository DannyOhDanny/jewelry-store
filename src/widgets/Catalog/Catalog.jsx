import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import catalogAPI from './api/catalogAPI'
import { PRODUCTS_PER_PAGE } from '../../constants'
import List from './ui/List'
import styles from './styles.module.css'

const Catalog = () => {
  const [page, setPage] = useState(1)


  const [price, setPrice] = useState('')
  const [brand, setBrand] = useState('')
  const [product, setProduct] = useState('')
  const isFilterApplied = Boolean(price || brand || product)
  console.debug('isFilterApplied:', isFilterApplied)

  const { isLoading: isProductIDsLoading, data: productIDs = [] } = useQuery({
    queryKey: ['get-product-ids', page],
    queryFn: () => catalogAPI.getProductIDs((page - 1) * PRODUCTS_PER_PAGE, PRODUCTS_PER_PAGE),
  })

  const { isLoading: isFilteredProductIDsLoading, data: filteredProductIDs = [] } = useQuery({
    queryKey: ['get-filtered-product-ids', price, brand, product],
    queryFn: () => catalogAPI.getFilteredProductIDs(price, brand, product),
    enabled: isFilterApplied,
  })

  console.debug('filteredProductIDs:', filteredProductIDs)

  const isLoading = isProductIDsLoading || isFilteredProductIDsLoading

  return (
    <div className={styles.root}>
      <form className={styles.filter}>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={({ target }) => setPrice(target.value)}
        />
        <input
          placeholder="Brand"
          value={brand}
          onChange={({ target }) => setBrand(target.value)}
        />
        <input
          placeholder="Name"
          value={product}
          onChange={({ target }) => setProduct(target.value)}
        />
        {isFilterApplied && (
          <button
            className={styles.filterResetButton}
            type="reset"
            onClick={() => {
              setPage(1)
              setPrice('')
              setBrand('')
              setProduct('')
            }}
          >
            Reset filters
          </button>
        )}
      </form>
      {!isFilterApplied && (
        <div className={styles.pagination}>
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage((prevValue) => prevValue - 1)}
          >
            Prev page
          </button>
          <span>{page}</span>
          <button
            type="button"
            onClick={() => setPage((prevValue) => prevValue + 1)}
          >
            Next page
          </button>
        </div>
      )}
      {isLoading ? <div>Loading...</div> : (
        <List productIDs={isFilterApplied ? filteredProductIDs : productIDs} />
      )}
    </div>
  )
}

export default Catalog
