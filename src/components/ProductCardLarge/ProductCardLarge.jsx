import React from 'react';
import styles from './ProductCardLarge.module.scss';
import Button from '../buttons/Button/Button';
import ButtonRound from '../buttons/ButtonRound/ButtonRound';
import Countdown from '../../features/Countdown/Countdown';

function ProductCardLarge({ product, className }) {
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
        <div className={styles.productCardLarge__buttons}>
          <ButtonRound type="cart">
            <span className="icon-heart"></span>
          </ButtonRound>
          <Button>
            Add to Cart <span className="icon-bag"></span>
          </Button>
          <ButtonRound type="cart">
            <span className="icon-eye"></span>
          </ButtonRound>
        </div>
        <h3 className={styles.productCardLarge__name}>
          {product.productName}
        </h3>
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
        </p>
        <div className={styles.productCardLarge__rating}>
          <span className={styles.productCardLarge__stars}>
            {' '}
            {'★'.repeat(Math.floor(product.rating))}
            {'☆'.repeat(5 - Math.floor(product.rating))}
          </span>

          <span className={styles.productCardLarge__ratingNumber}>
            {product.rating.toFixed(1)}
          </span>
          <span className={styles.productCardLarge__coments}>
            {' '}
            (524 Feedback)
          </span>
        </div>{' '}
        <div className={styles.productCardLarge__taimer}>
          <p>Hurry up! Offer ends In:</p>
          <Countdown targetDate="2028-12-31T23:59:59" />
        </div>
      </div>
    </div>
  );
}

export default ProductCardLarge;
