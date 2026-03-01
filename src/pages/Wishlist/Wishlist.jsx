import { useWishlist } from '../../contexts/WishlistContext';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/buttons/Button/Button';
import WishlistButton from '../../components/WishlistButton/WishlistButton';
import styles from './Wishlist.module.scss';

export default function Wishlist() {
  const { wishlist, clearWishlist } = useWishlist();
  const navigate = useNavigate();

  if (wishlist.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>
          <h1>Your Wishlist is Empty</h1>
          <p>Save your favorite products to view them later</p>
          <Button onClick={() => navigate('/shop')} variant="fill">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          My Wishlist ({wishlist.length})
        </h1>
        <Button
          onClick={() => {
            if (window.confirm('Clear entire wishlist?')) {
              clearWishlist();
            }
          }}
          variant="outline"
          size="small"
        >
          Clear All
        </Button>
      </div>

      <div className={styles.grid}>
        {wishlist.map((product) => (
          <div key={product.id} className={styles.card}>
            <div className={styles.imageContainer}>
              {product.images && product.images[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.productName}
                  className={styles.image}
                  onClick={() => navigate(`/product/${product.id}`)}
                />
              ) : (
                <div className={styles.placeholder}>No Image</div>
              )}
              <div className={styles.wishlistIcon}>
                <WishlistButton product={product} variant="icon" />
              </div>
            </div>

            <div className={styles.info}>
              <h3 className={styles.name}>{product.productName}</h3>
              <div className={styles.category}>
                {product.category || 'Uncategorized'}
              </div>
              <div className={styles.footer}>
                <div className={styles.price}>
                  ${(product.priceOrigin ?? 0).toFixed(2)}
                </div>
                <div className={styles.actions}>
                  <Button
                    onClick={() => navigate(`/product/${product.id}`)}
                    variant="fill"
                    size="small"
                  >
                    View Product
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
