import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import styles from './ProductPage.module.css';
import { getProductById } from '../../utils/api';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true); // состояние загрузки
  const [error, setError] = useState(null); // состояние ошибки

  useEffect(() => {
    // Загрузка товара из API
    const loadProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProductById(id); // запрос к API
        // ✅ ОТЛАДКА: смотрим структуру данных
        console.log('Product data from API:', data);
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

  // ✅ ЗАЩИТА: нормализация данных под реальную структуру бэкенда
  const productImages = Array.isArray(product.images)
    ? product.images
    : [product.images || '/placeholder.jpg'];

  const mainImage = productImages[0] || '/placeholder.jpg';
  const gallery = productImages.slice(1);

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
  const priceDiscounted = priceOrigin * (1 - discount / 100);
  return (
    <div className={styles.productPage}>
      <div className={styles.gallery}>
        <img
          src={mainImage}
          alt={product.productName || product.name}
          className={styles.mainImage}
        />
        <div className={styles.thumbnails}>
          {gallery.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${product.productName || product.name}-${i}`}
            />
          ))}
        </div>
      </div>

      <div className={styles.info}>
        <h1>{product.productName || product.name}</h1>
        <div className={styles.stock}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </div>
        <div className={styles.reviews}>
          {'★'.repeat(productRating)} {'☆'.repeat(5 - productRating)}{' '}
          ({product.reviews} Reviews)
        </div>
        <div className={styles.price}>
          <span className={styles.old}>
            ${priceOrigin.toFixed(2)}
          </span>
          <span className={styles.new}>
            ${priceDiscounted.toFixed(2)}
          </span>
          <span className={styles.discount}>{discount}</span>
        </div>

        {/* <p className={styles.brand}>
          Brand: <span>{product.brand || 'N/A'}</span>
        </p> */}
        <p className={styles.shortDesc}>
          {product.shortDescription ||
            product.description ||
            'No description'}
        </p>

        <div className={styles.quantity}>
          <button onClick={handleDecrease}>-</button>
          <span>{quantity}</span>
          <button onClick={handleIncrease}>+</button>
        </div>

        <div className={styles.actions}>
          <button className={styles.addToCart}>Add to Cart</button>
          <button className={styles.wishlist}>♡</button>
        </div>

        <div className={styles.meta}>
          <p>
            Category: <span>{product.category || 'N/A'}</span>
          </p>
          <p>
            Tags: <span>{productTags.join(', ') || 'N/A'}</span>
          </p>
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
  );
}
