import React from 'react';
import styles from './CartButton.module.scss';
function CartButton({ count, totalAmount }) {
  return (
    <div className={styles.cartButton}>
      <button type="button" className={styles.cartButton__button}>
        <div className={`${styles.cartButton__icon} icon-bag`}>
          {count > 0 && (
            <span className={styles.cartButton__badge}>{count}</span>
          )}
        </div>
      </button>
      <div className={styles.cartButton__text}>
        <span> Shopping cart:</span>

        <span className={styles.cartButton__totalAlmount}>
          ${totalAmount.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

export default CartButton;
