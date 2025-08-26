import React from 'react';
import styles from './ProductCardLarge.module.scss';
import Button from '../buttons/Button/Button';

function ProductCardLarge({ product, className }) {
  console.log(product);

  return (
    <div className={`${styles.productCardLarge} ${className || ''}`}>
      {product.discount ? (
        <span className={styles.productCardLarge__badge}>
          Sale {product.discount}%
        </span>
      ) : null}
      <div className={styles.productCardLarge__imageContainer}>
        <img
          src={product.image[0]}
          alt={product.productName}
          className={styles.productCardLarge__image}
        />
      </div>
      <div className={styles.productCardLarge__content}>
        <h3 className={styles.productCardLarge__name}>
          {product.productName}
        </h3>
        <div className={styles.productCardLarge__bottom}>
          <div className={styles.productCardLarge__right}>
            <p className={styles.productCardLarge__priceBlock}>
              {product.discount ? (
                <>
                  <span className={styles.productCardLarge__price}>
                    ${product.discount}
                  </span>{' '}
                  <span className={styles.productCardLarge__oldPrice}>
                    ${product.priceOrigin}
                  </span>
                </>
              ) : (
                <span className={styles.productCardLarge__price}>
                  ${product.priceOrigin}
                </span>
              )}
            </p>{' '}
            <div className={styles.productCardLarge__rating}>
              {'★'.repeat(Math.floor(product.rating))}
              {'☆'.repeat(5 - Math.floor(product.rating))}
            </div>{' '}
          </div>

          <Button type="cart" size="medium" color="light">
            <span className="icon-bag"></span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductCardLarge;
