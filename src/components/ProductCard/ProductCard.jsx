import React from 'react';
import styles from './ProductCard.module.scss';
import data from '../../utils/products.json';
function ProductCard({ product1 }) {
  const product = data[0];

  return (
    <div className={styles.productCard}>
      {product.discount ? (
        <span className={styles.productCard__badge}>
          Sale {product.discount}%{' '}
        </span>
      ) : null}
      <img
        src={product.image[0]}
        alt={product.productName}
        className={styles.productCard__image}
      />
      <h3 className={styles.productCard__name}>
        {product.productName}
      </h3>
      <p className={styles.productCard__priceBlock}>
        {product.discount ? (
          <>
            <span className={styles.productCard__price}>
              ${product.discount}
            </span>{' '}
            <span className={styles.productCard__oldPrice}>
              ${product.priceOrigin}
            </span>
          </>
        ) : (
          <span className={styles.productCard__price}>
            ${product.priceOrigin}
          </span>
        )}
      </p>{' '}
      <div className={styles.productCard__rating}>
        {'★'.repeat(Math.floor(product.rating))}
        {'☆'.repeat(5 - Math.floor(product.rating))}
      </div>{' '}
    </div>
  );
}

export default ProductCard;
