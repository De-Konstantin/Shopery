import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import styles from './ProductPage.module.css';
import products from '../../data/products.json'; // массив всех товаров

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const found = products.find((p) => p.id === Number(id));
    setProduct(found || null);
  }, [id]);

  if (!product) return <div>Product not found</div>;

  const handleIncrease = () => setQuantity((q) => q + 1);
  const handleDecrease = () =>
    setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <div className={styles.productPage}>
      <div className={styles.gallery}>
        <img
          src={product.images.main}
          alt={product.name}
          className={styles.mainImage}
        />
        <div className={styles.thumbnails}>
          {product.images.gallery.map((img, i) => (
            <img key={i} src={img} alt={`${product.name}-${i}`} />
          ))}
        </div>
      </div>

      <div className={styles.info}>
        <h1>{product.name}</h1>
        <div className={styles.stock}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </div>
        <div className={styles.reviews}>
          {'★'.repeat(product.rating)}{' '}
          {'☆'.repeat(5 - product.rating)} ({product.reviews} Reviews)
        </div>
        <div className={styles.price}>
          <span className={styles.old}>
            ${product.priceOld.toFixed(2)}
          </span>
          <span className={styles.new}>
            ${product.priceNew.toFixed(2)}
          </span>
          <span className={styles.discount}>{product.discount}</span>
        </div>

        <p className={styles.brand}>
          Brand: <span>{product.brand}</span>
        </p>
        <p className={styles.shortDesc}>{product.shortDesc}</p>

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
            Category: <span>{product.category}</span>
          </p>
          <p>
            Tags: <span>{product.tags.join(', ')}</span>
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
            {product.description.map((d, i) => (
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
