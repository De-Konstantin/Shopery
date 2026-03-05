import React from 'react';
import styles from './WishlistButton.module.scss';

function WishlistButton({ count, onClick }) {
  return (
    <button
      type="button"
      className={styles.wishlistButton}
      aria-label="Wishlist"
      onClick={onClick}
    >
      <div className={`${styles.wishlistButton__icon} icon-heart`}>
        {count > 0 && (
          <span className={styles.wishlistButton__badge}>
            {count}
          </span>
        )}
      </div>
    </button>
  );
}

export default WishlistButton;
