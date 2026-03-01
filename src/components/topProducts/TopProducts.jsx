import React from 'react';
import styles from './TopProducts.module.scss';
import { getPopularProducts } from '../../utils/api';
import ProductCard from '../ProductCard/ProductCard';
import ProductSkeleton from '../ProductSkeleton/ProductSkeleton';
import { Link } from 'react-router-dom';

function TopProducts() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadTopProducts = async () => {
      try {
        // Используем специальную функцию для популярных товаров
        const response = await getPopularProducts(4.5, 1);

        // Перемешиваем и берем первые 12
        const shuffled = (response.items || []).sort(
          () => Math.random() - 0.5,
        );
        const limitedProducts = shuffled.slice(0, 12);
        setProducts(limitedProducts);
      } catch (error) {
        console.error('Error loading top products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTopProducts();
  }, []);

  if (products.length === 0 && !loading) return null;

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
          {loading
            ? Array(12)
                .fill(0)
                .map((_, i) => (
                  <ProductSkeleton
                    key={`skeleton-${i}`}
                    className={styles.topProducts__item}
                  />
                ))
            : products.map((product, index) => (
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
