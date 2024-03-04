import newPrice from '@utils/functions';

import styles from './styles.module.scss';

const Card = ({ id, price, product, brand }) => {
  return (
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
          <span className={`${styles.cardInfoContainer} ${styles.cardInfoNow}`}>
            {product}
          </span>
          <span className={`${styles.cardInfoContainer} ${styles.cardInfoNow}`}>
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
  );
};

export default Card;
