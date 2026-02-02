import styles from './ProductCard.module.scss';
import { useNavigate } from 'react-router-dom';
import ButtonRound from '../buttons/ButtonRound/ButtonRound';
import { useCart } from 'react-use-cart';

// import data from '../../utils/products.json';
function ProductCard({ product = {}, className }) {
  const { addItem } = useCart();
  const navigate = useNavigate();

  // Нормализация и защита от отсутствующих полей
  const priceOrigin = Number(product.priceOrigin) || 0;
  const discount = Number(product.discount) || 0;
  const rating = Math.max(
    0,
    Math.min(5, Number(product.rating) || 0),
  );

  // Унификация изображений (backend может отдавать images[] или image)
  const images = Array.isArray(product.images)
    ? product.images
    : Array.isArray(product.image)
      ? product.image
      : product.image
        ? [product.image]
        : [];
  const primaryImage = images[0] || '/no-image.png'; // TODO: добавить нормальный placeholder

  const productName =
    product.productName || product.name || 'Unnamed';

  const discountedPrice =
    discount > 0
      ? +(priceOrigin * (1 - discount / 100)).toFixed(2)
      : priceOrigin;

  // Обработчик клика на карточку
  const handleCardClick = (e) => {
    // Предотвращаем переход если кликнули на кнопку или ссылку
    if (e.target.closest('button') || e.target.closest('a')) {
      return;
    }
    // ✅ ИСПРАВЛЕНИЕ: безопасное получение ID
    const productId = product._id || product.id || product.productId;

    if (!productId) {
      console.error('❌ Product ID not found:', product);
      return;
    }

    // Переходим на страницу товара
    navigate(`/product/${productId}`);
  };

  const handleAdd = (e) => {
    e.stopPropagation(); //  предотвращаем всплытие клика к карточке
    addItem({
      id: product._id || product.id || product.slug || productName,
      name: productName,
      image: primaryImage,
      price: discountedPrice,
    });
  };
  return (
    <div
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }} // ✅ ДОБАВИТЬ: показываем что карточка кликабельна
      role="button" // ✅ ДОБАВИТЬ: для доступности
      tabIndex={0} // ✅ ДОБАВИТЬ: для навигации клавиатурой
      className={`${styles.productCard} ${className || ''}`}
    >
      {product.discount ? (
        <span className={styles.productCard__badge}>
          Sale {product.discount}%
        </span>
      ) : null}
      <div className={styles.productCard__imageContainer}>
        <img
          src={primaryImage}
          alt={productName}
          className={styles.productCard__image}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = '/no-image.png';
          }}
        />
      </div>
      <div className={styles.productCard__content}>
        <h3 className={styles.productCard__name}>
          {product.productName}
        </h3>
        <div className={styles.productCard__bottom}>
          <div className={styles.productCard__right}>
            <p className={styles.productCard__priceBlock}>
              {discount > 0 ? (
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
                  ${priceOrigin.toFixed(2)}
                </span>
              )}
            </p>{' '}
            <div className={styles.productCard__rating}>
              {'★'.repeat(Math.floor(rating))}
              {'☆'.repeat(5 - Math.floor(rating))}
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
