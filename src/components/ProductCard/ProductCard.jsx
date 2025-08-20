import React from 'react';
import styles from './ProductCard.module.scss';

import ButtonRound from '../buttons/ButtonRound/ButtonRound';
// import data from '../../utils/products.json';
function ProductCard({ product, className }) {
  //   const product = data[0];

  return (
    <div className={`${styles.productCard} ${className || ''}`}>
      {product.discount ? (
        <span className={styles.productCard__badge}>
          Sale {product.discount}%
        </span>
      ) : null}
      <div className={styles.productCard__imageContainer}>
        <img
          src={product.image[0]}
          alt={product.productName}
          className={styles.productCard__image}
        />
      </div>
      <div className={styles.productCard__content}>
        <h3 className={styles.productCard__name}>
          {product.productName}
        </h3>
        <div className={styles.productCard__bottom}>
          <div className={styles.productCard__right}>
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

          <ButtonRound type="cart" size="medium" color="light">
            <span className="icon-bag"></span>
          </ButtonRound>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
