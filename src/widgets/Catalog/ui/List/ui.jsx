import { useQuery } from '@tanstack/react-query';

import { SERVER_ERROR, MOCK_CARD } from '@utils/constants';

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
    return (
      <Card
        key={MOCK_CARD.id}
        product={MOCK_CARD.product}
        price={MOCK_CARD.price}
        id={MOCK_CARD.id}
        brand={MOCK_CARD.brand}></Card>
    );
  }

  if (productIDs.isError) {
    return <p>{SERVER_ERROR}</p>;
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
