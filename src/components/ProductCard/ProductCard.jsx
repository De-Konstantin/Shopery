import React from 'react';
import styles from './ProductCard.module.scss';
function ProductCard({ product }) {
  return (
    <div className={styles.productCard}>
      {product.discount && (
        <span className={styles.productCard__badge}>
          Sale {product.discount}%
        </span>
      )}
      <img
        src={product.image}
        alt={product.name}
        className={styles.productCard__image}
      />
      <h3 className={styles.productCard__name}>{product.name}</h3>
      <p className={styles.productCard__priceBlock}>
        {product.discountPrice ? (
          <>
            <span className={styles.productCard__price}>
              ${product.discountPrice}
            </span>
            <span className={styles.productCard__oldPrice}>
              ${product.price}
            </span>
          </>
        ) : (
          <span className={styles.productCard__price}>
            ${product.price}
          </span>
        )}
      </p>
      <div className={styles.productCard__rating}>
        {'★'.repeat(Math.floor(product.rating))}
        {'☆'.repeat(5 - Math.floor(product.rating))}
      </div>
    </div>
  );
}

export default ProductCard;
