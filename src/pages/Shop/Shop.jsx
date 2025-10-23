import React, { useMemo, useState } from 'react';
import Filter from '../../features/Filter/Filter';
import productsData from '../../utils/products.json';
import styles from './Shop.module.scss';
import ProductCard from '../../components/ProductCard/ProductCard';
import ReactPaginate from 'react-paginate';
function Shop() {
  const [filters, setFilters] = useState({
    tags: [],
    price: [],
    rating: null,
    categories: [],
  });

  const itemsPerPage = 12; // Количество товаров на странице
  const [currentPage, setCurrentPage] = useState(0);

  //--- 🧮 Фильтрация товаров на основе выбранных фильтров
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

  //--расчет товаров для текущей страницы
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredProducts.slice(startIndex, endIndex); // плавная прокрутка вверх

  const handlePageChange = (event) => {
    setCurrentPage(event.selected);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // плавная прокрутка вверх
  };
  // --- при смене фильтров возвращаемся на первую страницу
  React.useEffect(() => {
    setCurrentPage(0);
  }, [filters]);

  return (
    <div className={`${styles.shop} _container`}>
      <aside className={styles.sidebar}>
        <Filter
          onFilterChange={setFilters}
          totalCount={filteredProducts.length}
        />
      </aside>
      <main className={styles.main}>
        {/* Отображаем количество */}
        <p className={styles.count}>
          {filteredProducts.length === 0
            ? 'No products found'
            : `${startIndex + 1}–${Math.min(
                endIndex,
                filteredProducts.length,
              )} из ${filteredProducts.length}`}
        </p>
        {/* Список карточек */}
        <div className={styles.products}>
          {currentItems.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* Пагинация */}
        {filteredProducts.length > itemsPerPage && (
          <ReactPaginate
            previousLabel="←"
            nextLabel="→"
            breakLabel="..."
            onPageChange={handlePageChange}
            pageCount={Math.ceil(
              filteredProducts.length / itemsPerPage,
            )}
            containerClassName={styles.pagination}
            activeClassName={styles.active}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
          />
        )}
        {/* {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))} */}
      </main>
    </div>
  );
}

export default Shop;
