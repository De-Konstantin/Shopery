import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Filter from '../../features/Filter/Filter';
import { getProducts } from '../../utils/api';
import ProductSkeleton from '../../components/ProductSkeleton/ProductSkeleton';
import styles from './Shop.module.scss';
import ProductCard from '../../components/ProductCard/ProductCard';
import ReactPaginate from 'react-paginate';

function Shop() {
  const location = useLocation();
  const [filters, setFilters] = useState({
    tags: [],
    price: [],
    rating: null,
    categories: [],
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryFromQuery = searchParams.get('category');

    if (categoryFromQuery) {
      setFilters((prev) => ({
        ...prev,
        categories: [categoryFromQuery],
      }));
    }
  }, [location.search]);

  // Загрузка товаров с API с учетом фильтров и пагинации
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        // Формируем параметры запроса на основе фильтров
        const params = {
          page: pagination.page,
          limit: pagination.limit,
        };

        // Добавляем фильтры, если они установлены
        if (filters.categories?.length > 0) {
          params.category = filters.categories.join(',');
        }

        if (filters.tags?.length > 0) {
          params.tags = filters.tags.join(',');
        }

        if (filters.price?.length === 2) {
          params.minPrice = filters.price[0];
          params.maxPrice = filters.price[1];
        }

        if (filters.rating && filters.rating.length > 0) {
          const ratingValues = filters.rating.map((r) => r.min);
          params.rating = ratingValues.join(',');
        }
        // Запрос к API
        const response = await getProducts(params);

        // Обновляем состояние товарами и метаданными пагинации
        setProducts(response.items || []);
        setPagination((prev) => ({
          ...prev,
          total: response.meta?.total || 0,
          totalPages: response.meta?.totalPages || 0,
        }));
      } catch (err) {
        console.error('Error loading products:', err);
        setError(
          'Ошибка загрузки товаров. Пожалуйста, попробуйте позже.',
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [filters, pagination.page, pagination.limit]);

  // При смене фильтров возвращаемся на первую страницу
  useEffect(() => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, [filters]);

  // Обработчик смены страницы
  const handlePageChange = (event) => {
    setPagination((prev) => ({ ...prev, page: event.selected + 1 }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Вычисляем индексы для отображения счетчика
  const startIndex = (pagination.page - 1) * pagination.limit + 1;
  const endIndex = Math.min(
    pagination.page * pagination.limit,
    pagination.total,
  );

  return (
    <div className={`${styles.shop} _container`}>
      <aside className={styles.sidebar}>
        <Filter
          onFilterChange={setFilters}
          totalCount={pagination.total}
        />
      </aside>
      <main className={styles.main}>
        {/* Отображаем количество */}
        <p className={styles.count}>
          {loading
            ? 'Загрузка...'
            : error
              ? error
              : pagination.total === 0
                ? 'Товары не найдены'
                : `${startIndex}–${endIndex} из ${pagination.total}`}
        </p>

        {/* Список карточек */}
        {loading ? (
          <div className={styles.products}>
            {Array(pagination.limit)
              .fill(0)
              .map((_, i) => (
                <ProductSkeleton key={`skeleton-${i}`} />
              ))}
          </div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : products.length === 0 ? (
          <div className={styles.empty}>Товары не найдены</div>
        ) : (
          <div className={styles.products}>
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {/* Пагинация */}
        {!loading && !error && pagination.totalPages > 1 && (
          <ReactPaginate
            previousLabel="←"
            nextLabel="→"
            breakLabel="..."
            onPageChange={handlePageChange}
            pageCount={pagination.totalPages}
            forcePage={pagination.page - 1}
            containerClassName={styles.pagination}
            activeClassName={styles.active}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
          />
        )}
      </main>
    </div>
  );
}

export default Shop;
