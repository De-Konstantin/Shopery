import React from 'react';
import styles from './HotDeals.module.scss';
import { getProducts } from '../../utils/api';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import ProductCardLarge from '../ProductCardLarge/ProductCardLarge';

function HotDeals() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadHotDeals = async () => {
      try {
        // Получаем товары с высокой скидкой (можно передать minDiscount если backend поддерживает)
        const response = await getProducts({
          page: 1,
          limit: 12,
          sort: 'newest', // или другая сортировка
        });

        // Фильтруем на клиенте товары со скидкой >= 35%
        const highDiscount = (response.items || []).filter(
          (product) => product.discount >= 35,
        );

        // Перемешиваем и берем первые 12
        const shuffled = highDiscount.sort(() => Math.random() - 0.5);
        const limitedProducts = shuffled.slice(0, 12);
        setProducts(limitedProducts);
      } catch (error) {
        console.error('Error loading hot deals:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHotDeals();
  }, []);

  if (loading) return null; // или показать скелетон
  if (products.length === 0) return null; // пока нет товаров — ничего не рендерим

  const featuredIndex = 5;
  const featuredProduct = products[featuredIndex];
  const otherProducts = products.filter(
    (_, i) => i !== featuredIndex,
  );

  return (
    <div className={styles.hotDeals}>
      <div className={`${styles.hotDeals__container} _container`}>
        <div className={styles.hotDeals__top}>
          <h2 className={styles.hotDeals__title}>Popular Products</h2>
          <Link className={styles.hotDeals__view}>
            View All <span className="icon-arr-r"></span>
          </Link>
        </div>
        <div className={styles.hotDeals__items}>
          {featuredProduct && (
            <ProductCardLarge
              className={styles.hotDeals__item}
              product={featuredProduct}
            />
          )}
          {otherProducts.map((product, index) => (
            <ProductCard
              className={styles.hotDeals__item}
              key={index}
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HotDeals;
