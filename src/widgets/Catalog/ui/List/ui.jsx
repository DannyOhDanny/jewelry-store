import { useQuery } from '@tanstack/react-query';

import catalogAPI from '../../api/catalogAPI';

import Loader from '../Loader/ui';
import Card from '../Card/ui';

import styles from './styles.module.scss';

const List = props => {
  const { productIDs = [] } = props;

  const { isLoading, data: items = [] } = useQuery({
    queryKey: ['catalog-get-items', productIDs],
    queryFn: () => catalogAPI.getItems(productIDs),
    select: items => {
      const mappedItems = new Map(items.map(item => [item.id, item]));
      const uniqueItems = [...mappedItems.values()];

      return uniqueItems;
    }
  });

  const hasItems = items.length > 0;

  if (isLoading) {
    return <Loader></Loader>;
  }

  if (!hasItems) {
    return <p>По вашему запросу ничего не найдено</p>;
  }

  return (
    <ul className={styles.grid}>
      {items.map(({ product, price, id, brand }) => (
        <Card
          key={id}
          product={product}
          price={price}
          id={id}
          brand={brand}></Card>
      ))}
    </ul>
  );
};

export default List;
