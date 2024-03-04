import { useQuery } from '@tanstack/react-query'
import catalogAPI from '../../api/catalogAPI'
import styles from './styles.module.css'

const List = (props) => {
  const { productIDs = [] } = props

  const { isLoading, data: items = [] } = useQuery({
    queryKey: ['catalog-get-items', productIDs],
    queryFn: () => catalogAPI.getItems(productIDs),
    select: (items) => {
      const mappedItems = new Map(items.map((item) => [item.id, item]));
      const uniqueItems = [...mappedItems.values()]

      return uniqueItems
    }
  })

  const hasItems = items.length > 0

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!hasItems) {
    return <p>Empty :(</p>
  }

  return (
    <ul className={styles.root}>
      {items.map(({ id, product, brand, price }) => (
        <li className={styles.item} key={id}>
          <p>Product: {product}</p>
          {brand && <p>Brand: {brand}</p>}
          <p>Price: {price}</p>
        </li>
      ))}
    </ul>
  )
}

export default List
