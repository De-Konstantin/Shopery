import React from 'react';
import styles from './TopProducts.module.scss';

function TopProducts() {
  return (
    <div className={styles.topProducts}>
      <div className={`${styles.topProducts__container} _container`}>
        <h2 className={styles.topProducts__title}>
          Popular Products
        </h2>
        <div className={styles.topProducts__items}></div>
      </div>
    </div>
  );
}

export default TopProducts;
