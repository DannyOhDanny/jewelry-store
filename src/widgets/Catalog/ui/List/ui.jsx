import { useQuery } from '@tanstack/react-query';

import newPrice from '@utils/functions';

import catalogAPI from '../../api/catalogAPI';

import Loader from '../Loader/ui';

import styles from './styles.module.css';

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
      {items.map(({ id, product, brand, price }) => (
        <article key={id} className={styles.card}>
          <div className={styles.cardImg}>
            <img
              src="https://i.postimg.cc/sgk1QQLb/png-transparent-engagement-ring-diamond-wedding-ring-gold-ring-ring-diamond-gold-Photoroom-png-Photo.png"
              alt=""
            />
          </div>
          <div className={styles.cardName}>
            <p>VALANTIS</p>
          </div>
          <div className={styles.cardInfo}>
            <a href="/" className={styles.cardIcon}>
              <ion-icon name="heart-outline"></ion-icon>
            </a>

            <div className={styles.cardInfoWrapper}>
              <span
                className={`${styles.cardInfoContainer} ${styles.cardInfoNow}`}>
                {product}
              </span>
              <span
                className={`${styles.cardInfoContainer} ${styles.cardInfoNow}`}>
                {brand}
              </span>
              <span
                className={`${styles.cardInfoContainer} ${styles.cardInfoBefore}`}>
                {newPrice(price)}
              </span>
            </div>

            <a href="/" className={styles.cardIcon}>
              <ion-icon name="cart-outline"></ion-icon>
            </a>
          </div>
        </article>
      ))}
    </ul>
  );
};

export default List;
