import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import styles from './ProductPage.module.scss';
import { getProductById } from '../../utils/api';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/image-gallery.css';
import Button from '../../components/buttons/Button/Button';
import ButtonRound from '../../components/buttons/ButtonRound/ButtonRound';
import { useCart } from 'react-use-cart';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addItem, items, updateItemQuantity } = useCart();

  useEffect(() => {
    // Загрузка товара из API
    const loadProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error('Error loading product:', err);
        setError('Не удалось загрузить товар');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  // Показываем индикатор загрузки
  if (loading)
    return <div className={styles.loading}>Загрузка товара...</div>;

  // Показываем ошибку
  if (error) return <div className={styles.error}>{error}</div>;

  // Показываем "не найдено"
  if (!product)
    return <div className={styles.notFound}>Product not found</div>;

  const handleIncrease = () => setQuantity((q) => q + 1);
  const handleDecrease = () =>
    setQuantity((q) => (q > 1 ? q - 1 : 1));

  // Нормализация данных под реальную структуру бэкенда
  const productImages = Array.isArray(product.images)
    ? product.images
    : [product.images || '/placeholder.jpg'];

  const handleAddToCart = () => {
    const productId = product._id || product.id;
    const mainImage = productImages[0] || '/placeholder.jpg';

    const cartItem = {
      id: productId,
      name: product.productName || product.name || 'Unnamed',
      price: priceDiscounted,
      image: mainImage,
    };

    // ✅ Проверяем, есть ли товар уже в корзине
    const existingItem = items.find((item) => item.id === productId);

    if (existingItem) {
      // ✅ Если товар есть, добавляем к существующему количеству
      updateItemQuantity(productId, existingItem.quantity + quantity);
    } else {
      // ✅ Если товара нет, добавляем с выбранным количеством
      addItem(cartItem, quantity);
    }

    alert(
      `${quantity} × ${product.productName || product.name} added to cart!`,
    );
    setQuantity(1);
  };
  const productRating = Math.round(Number(product.rating) || 0);
  const productTags = Array.isArray(product.tags)
    ? product.tags
    : typeof product.tags === 'string' && product.tags.trim() !== ''
      ? product.tags.split(',').map((tag) => tag.trim())
      : [];
  const productDescription = Array.isArray(product.description)
    ? product.description
    : product.description
      ? [product.description]
      : ['No description available'];

  // Вычисляем цену со скидкой
  const priceOrigin = Number(product.priceOrigin) || 0;
  const discount = Number(product.discount) || 0;
  const hasDiscount = discount > 0;
  const priceDiscounted = hasDiscount
    ? priceOrigin * (1 - discount / 100)
    : priceOrigin;

  const galleryImages = productImages.map((img) => {
    // Картинки из папки public (frontend), не добавляем API_BASE_URL
    const imageUrl = img.startsWith('http') ? img : img;

    return {
      original: imageUrl,
      thumbnail: imageUrl,
    };
  });

  return (
    <div className={styles.productPage}>
      <div className="_container">
        <div className={styles.top}>
          <div className={styles.gallery}>
            <ImageGallery
              items={galleryImages}
              showPlayButton={false}
              showFullscreenButton={true}
              showNav={true}
              thumbnailPosition="left"
              showThumbnails={true}
            />
          </div>

          <div className={styles.info}>
            <h1 className={styles.productName}>
              {product.productName || product.name}
            </h1>
            <div className={styles.stock}>
              {product.isAvailable ? 'In Stock' : 'Out of Stock'}
            </div>
            <div className={styles.reviews}>
              {'★'.repeat(productRating)}{' '}
              {'☆'.repeat(5 - productRating)}
              <span className={styles.reviewCount}>
                ({product.rating})
              </span>
            </div>
            <div className={styles.price}>
              {hasDiscount && (
                <span className={styles.old}>
                  ${priceOrigin.toFixed(2)}
                </span>
              )}
              <span className={styles.new}>
                ${priceDiscounted.toFixed(2)}
              </span>
              {''}
              {hasDiscount && (
                <span className={styles.discount}>
                  {discount}% off
                </span>
              )}
            </div>

            {/* <p className={styles.brand}>
          Brand: <span>{product.brand || 'N/A'}</span>
        </p> */}
            <p className={styles.shortDesc}>
              {product.shortDescription ||
                product.description ||
                'No description'}
            </p>
            <div className={styles.actions}>
              <div className={styles.quantity}>
                <button onClick={handleDecrease}>-</button>
                <span>{quantity}</span>
                <button onClick={handleIncrease}>+</button>
              </div>

              <Button
                size="small"
                width="long"
                onClick={handleAddToCart}
              >
                <span className={styles.addToCart}></span>
                Add to Cart
              </Button>
              <ButtonRound size="large" type="cart">
                <span className={styles.wishlist}>♡</span>
              </ButtonRound>
            </div>

            <div className={styles.meta}>
              <p>
                <b> Category:</b>{' '}
                <span>{product.category || 'N/A'}</span>
              </p>
              <p>
                <b>Tags:</b>{' '}
                <span>{productTags.join(', ') || 'N/A'}</span>
              </p>
            </div>
          </div>
        </div>
        <Tabs className={styles.tabs}>
          <TabList>
            <Tab>Descriptions</Tab>
            <Tab>Additional Information</Tab>
            <Tab>Customer Feedback</Tab>
          </TabList>

          <TabPanel>
            <ul>
              {productDescription.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </TabPanel>
          <TabPanel>
            <p>Here will be product specifications...</p>
          </TabPanel>
          <TabPanel>
            <p>Here will be customer feedback...</p>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}
