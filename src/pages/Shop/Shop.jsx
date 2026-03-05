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
  const searchQuery =
    new URLSearchParams(location.search).get('search')?.trim() || '';
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    tags: [],
    price: [],
    rating: null,
    categories: [],
  });
  const [sortBy, setSortBy] = useState('newest');
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
    let isCancelled = false;

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

        // Добавляем сортировку
        if (sortBy !== 'newest') {
          params.sort = sortBy;
        }

        if (searchQuery) {
          params.search = searchQuery;
        }

        // Запрос к API
        const response = await getProducts(params);

        if (isCancelled) {
          return;
        }

        // Обновляем состояние товарами и метаданными пагинации
        setProducts(response.items || []);
        setPagination((prev) => ({
          ...prev,
          total: response.meta?.total || 0,
          totalPages: response.meta?.totalPages || 0,
        }));
      } catch (err) {
        if (isCancelled) {
          return;
        }

        console.error('Error loading products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isCancelled = true;
    };
  }, [
    filters,
    pagination.page,
    pagination.limit,
    sortBy,
    searchQuery,
  ]);

  // При смене фильтров или сортировки возвращаемся на первую страницу
  useEffect(() => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, [filters, sortBy, searchQuery]);

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
      <button
        className={styles.filterToggle}
        onClick={() => setShowFilter(!showFilter)}
        aria-label="Toggle filters"
      >
        {showFilter ? 'Hide Filters' : 'Show Filters'}
      </button>
      <aside
        className={`${styles.sidebar} ${showFilter ? styles.sidebarOpen : ''}`}
      >
        <Filter
          onFilterChange={setFilters}
          totalCount={pagination.total}
        />
      </aside>
      {showFilter && (
        <div
          className={styles.filterOverlay}
          onClick={() => setShowFilter(false)}
        />
      )}
      <main className={styles.main}>
        <div className={styles.topBar}>
          {/* Отображаем количество */}
          <p className={styles.count}>
            {loading
              ? 'Loading...'
              : error
                ? error
                : pagination.total === 0
                  ? 'No products found'
                  : `${startIndex}–${endIndex} of ${pagination.total}`}
          </p>

          {/* Выбор сортировки */}
          <div className={styles.sortContainer}>
            <label htmlFor="sort-select" className={styles.sortLabel}>
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.sortSelect}
            >
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating_desc">Rating</option>
            </select>
          </div>
        </div>

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
          <div className={styles.empty}>No products found</div>
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
