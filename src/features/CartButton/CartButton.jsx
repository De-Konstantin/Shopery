import React from 'react';
import styles from './CartButton.module.scss';
import { Link } from 'react-router-dom';
import { useCart } from 'react-use-cart';
function CartButton() {
  const { cartTotal, totalItems } = useCart();

  return (
    <div className={styles.cartButton}>
      <Link
        to={'/cart'}
        type="button"
        className={styles.cartButton__button}
      >
        <div className={`${styles.cartButton__icon} icon-bag`}>
          {totalItems > 0 && (
            <span className={styles.cartButton__badge}>
              {totalItems}
            </span>
          )}
        </div>
      </Link>
      <div className={styles.cartButton__text}>
        <span> Shopping cart:</span>

        <span className={styles.cartButton__totalAlmount}>
          ${cartTotal.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

export default CartButton;
