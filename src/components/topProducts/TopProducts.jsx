import React from 'react';
import styles from './TopProducts.module.scss';
import productData from '../../utils/products.json';
import ProductCard from '../ProductCard/ProductCard';
import { Link } from 'react-router-dom';

function TopProducts() {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const highRated = productData.filter(
      (product) => product.rating >= 4.5,
    );
    const shuffled = highRated.sort(() => Math.random() - 0.5);
    const limitedProducts = shuffled.slice(0, 12); // or 12
    setProducts(limitedProducts);
  }, []);

  return (
    <div className={styles.topProducts}>
      <div className={`${styles.topProducts__container} _container`}>
        <div className={styles.topProducts__top}>
          <h2 className={styles.topProducts__title}>
            Popular Products
          </h2>
          <Link className={styles.topProducts__view}>
            View All <span className="icon-arr-r"></span>
          </Link>
        </div>
        <div className={styles.topProducts__items}>
          {products.map((product, index) => (
            <ProductCard
              className={styles.topProducts__item}
              key={index}
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopProducts;
