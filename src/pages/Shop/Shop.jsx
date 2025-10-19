import React, { useMemo, useState } from 'react';
import Filter from '../../features/Filter/Filter';
import productsData from '../../utils/products.json';
import styles from './Shop.module.scss';
import ProductCard from '../../components/ProductCard/ProductCard';
function Shop() {
  const [filters, setFilters] = useState({
    tags: [],
    price: [],
    rating: null,
  });
  const filteredProducts = useMemo(() => {
    return productsData.filter((p) => {
      const price = p.priceOrigin;

      const productTags = (p.tags || '')
        .split(',')
        .map((t) => t.trim().toLowerCase()); // приводим все теги к нижнему регистру

      const hasTag =
        filters.tags.length === 0 ||
        filters.tags.some((tag) => productTags.includes(tag)); // сравнение в нижнем регистре

      const productCategories = (p.category || '')
        .split(',')
        .map((c) => c.trim().toLowerCase());

      const inCategory =
        !filters.categories?.length ||
        filters.categories.some((cat) =>
          productCategories.includes(cat),
        );

      const inRating =
        !filters.rating ||
        (p.rating >= filters.rating.min &&
          p.rating <= filters.rating.max);

      return (
        price >= filters.price[0] &&
        price <= filters.price[1] &&
        hasTag &&
        inCategory &&
        inRating
      );
    });
  }, [filters]);

  return (
    <div className={`${styles.shop} _container`}>
      <aside className={styles.sidebar}>
        <Filter
          onFilterChange={setFilters}
          totalCount={filteredProducts.length}
        />
      </aside>
      <main className={styles.products}>
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </main>
    </div>
  );
}

export default Shop;
