import styles from './ProductCard.module.scss';

import ButtonRound from '../buttons/ButtonRound/ButtonRound';
import { useCart } from 'react-use-cart';
// import data from '../../utils/products.json';
function ProductCard({ product, className }) {
  const { addItem } = useCart();

  // Защита и нормализация входных данных
  const priceOrigin = Number(product.priceOrigin) || 0;
  const discount = Number(product.discount) || 0;

  // Вычисляем финальную цену при рендере — используем её и для отображения, и для корзины
  const discountedPrice =
    discount > 0
      ? +(priceOrigin * (1 - discount / 100)).toFixed(2)
      : priceOrigin;

  const handleAdd = () => {
    // const discountedPrice =
    //   product.discount > 0
    //     ? product.priceOrigin * (1 - product.discount / 100)
    //     : product.priceOrigin;

    addItem({
      id: product.id,
      name: product.productName,
      image: Array.isArray(product.image)
        ? product.image[0]
        : product.image,
      price: discountedPrice, // ← используем финальную цену
      // discount: product.discount, // если нужно показать в корзине
    });
  };
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
                    ${discountedPrice.toFixed(2)}
                  </span>{' '}
                  <span className={styles.productCard__oldPrice}>
                    ${priceOrigin.toFixed(2)}
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

          <ButtonRound
            onClick={handleAdd}
            type="cart"
            size="medium"
            color="light"
          >
            <span className="icon-bag"></span>
          </ButtonRound>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
