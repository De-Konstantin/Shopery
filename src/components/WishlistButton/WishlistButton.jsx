import { useWishlist } from '../../contexts/WishlistContext';
import styles from './WishlistButton.module.scss';

export default function WishlistButton({
  product,
  variant = 'icon',
}) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  return (
    <button
      className={`${styles.button} ${variant === 'icon' ? styles.iconButton : ''}`}
      onClick={() => toggleWishlist(product)}
      title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      type="button"
    >
      {variant === 'icon' ? (
        <span className={styles.heart}>
          {inWishlist ? '♥' : '♡'}
        </span>
      ) : (
        <>{inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}</>
      )}
    </button>
  );
}
