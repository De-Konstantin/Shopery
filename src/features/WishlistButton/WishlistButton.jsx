import React from 'react';
import styles from './WishlistButton.module.scss';

function WishlistButton({ count }) {
  return (
    <button className={styles.wishlistButton}>
      <div className={`${styles.wishlistButton__icon} icon-heart`}>
        {count > 0 && (
          <span className={styles.wishlistButton__badge}>{count}</span>
        )}
      </div>
    </button>
  );
}

export default WishlistButton;
