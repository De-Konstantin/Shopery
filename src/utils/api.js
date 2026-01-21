/**
 * API сервис для работы с backend Shopery
 * Содержит все функции для CRUD операций с товарами
 */

// базовый URL backend'а
const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000';

// ============================================
// PRODUCTS API
// ============================================

/**
 * Получить все товары с фильтрацией, сортировкой и пагинацией
 * @param {Object} params - параметры запроса
 * @param {number} params.page - номер страницы (по умолчанию 1)
 * @param {number} params.limit - количество элементов на странице (по умолчанию 10)
 * @param {string} params.search - поиск по названию/описанию
 * @param {number} params.minPrice - минимальная цена
 * @param {number} params.maxPrice - максимальная цена
 * @param {string} params.category - фильтр по категории
 * @param {string} params.tags - фильтр по тегам (CSV: "tag1,tag2")
 * @param {number} params.rating - минимальный рейтинг
 * @param {string} params.sort - сортировка (price_asc, price_desc, rating_desc, newest)
 * @returns {Promise<Object>} { items: Product[], meta: { page, limit, total, totalPages, hasNextPage, hasPreviousPage } }
 */
export const getProducts = async (params = {}) => {
  try {
    // объединяем дефолтные параметры с переданными
    // const queryParams = new URLSearchParams({
    //   page: params.page || 1,
    //   limit: params.limit || 10,
    //   ...(params.search && { search: params.search }),
    //   ...(params.minPrice && { minPrice: params.minPrice }),
    //   ...(params.maxPrice && { maxPrice: params.maxPrice }),
    //   ...(params.category && { category: params.category }),
    //   ...(params.tags && { tags: params.tags }),
    //   ...(params.rating && { rating: params.rating }),
    //   ...(params.sort && { sort: params.sort }),
    // });

    const queryParams = new URLSearchParams();

    // Базовые параметры
    queryParams.append('page', params.page || 1);
    queryParams.append('limit', params.limit || 10);

    // Опциональные параметры
    if (params.search) queryParams.append('search', params.search);
    if (params.minPrice)
      queryParams.append('minPrice', params.minPrice);
    if (params.maxPrice)
      queryParams.append('maxPrice', params.maxPrice);
    if (params.category)
      queryParams.append('category', params.category);
    if (params.tags) queryParams.append('tags', params.tags);
    if (params.sort) queryParams.append('sort', params.sort);

    // Рейтинг — поддержка диапазона
    if (params.rating) {
      if (Array.isArray(params.rating)) {
        const ratingValues = params.rating.map((r) => r.min);
        ratingValues.forEach((val) =>
          queryParams.append('rating', val),
        );
      } else if (typeof params.rating === 'string') {
        // Уже строка типа "5,4,3"
        params.rating
          .split(',')
          .forEach((val) => queryParams.append('rating', val.trim()));
      } else if (typeof params.rating === 'number') {
        queryParams.append('rating', params.rating);
      }
    }
    // Для обратной совместимости (если rating — число)
    else if (
      params.rating !== undefined &&
      typeof params.rating === 'number'
    ) {
      queryParams.append('rating', params.rating);
    }
    // выполняем GET запрос с параметрами
    const response = await fetch(
      `${API_BASE_URL}/products?${queryParams}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      },
    );

    // проверяем статус ответа
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // парсим и возвращаем JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Получить товар по ID
 * @param {number} id - ID товара
 * @returns {Promise<Object>} объект товара
 */
export const getProductById = async (id) => {
  try {
    // выполняем GET запрос к конкретному товару
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    // проверяем статус ответа
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // парсим и возвращаем JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

/**
 * Создать новый товар
 * @param {Object} product - объект товара
 * @param {string} product.productName - название товара
 * @param {string} product.slug - уникальный идентификатор в URL
 * @param {string[]} product.images - массив URL изображений
 * @param {string} product.category - категория товара
 * @param {string} product.tags - теги (CSV: "tag1,tag2")
 * @param {number} product.priceOrigin - оригинальная цена
 * @param {number} product.weight - вес товара (в кг)
 * @param {string} product.description - описание товара
 * @param {number} product.quantity - количество на складе
 * @param {number} product.discount - скидка в процентах
 * @param {number} product.rating - рейтинг товара
 * @param {boolean} product.isAvailable - доступен ли товар
 * @returns {Promise<Object>} созданный товар с ID
 */
export const createProduct = async (product) => {
  try {
    // валидируем обязательные поля
    if (!product.productName || !product.slug) {
      throw new Error('productName and slug are required');
    }

    // выполняем POST запрос с данными товара
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      // преобразуем объект в JSON строку
      body: JSON.stringify(product),
    });

    // проверяем статус ответа
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // парсим и возвращаем созданный товар
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

/**
 * Обновить товар
 * @param {number} id - ID товара
 * @param {Object} updates - объект с полями для обновления (частичное обновление)
 * @returns {Promise<Object>} обновленный товар
 */
export const updateProduct = async (id, updates) => {
  try {
    // валидируем ID
    if (!id) {
      throw new Error('Product ID is required');
    }

    // выполняем PATCH запрос с частичными обновлениями
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      // преобразуем обновления в JSON строку
      body: JSON.stringify(updates),
    });

    // проверяем статус ответа
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // парсим и возвращаем обновленный товар
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error updating product ${id}:`, error);
    throw error;
  }
};

/**
 * Удалить товар (soft delete)
 * @param {number} id - ID товара
 * @returns {Promise<Object>} удаленный товар
 */
export const deleteProduct = async (id) => {
  try {
    // валидируем ID
    if (!id) {
      throw new Error('Product ID is required');
    }

    // выполняем DELETE запрос
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
      },
    });

    // проверяем статус ответа
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // парсим и возвращаем результат
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    throw error;
  }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Получить товары с поиском
 * @param {string} searchTerm - поисковый запрос
 * @param {number} page - номер страницы
 * @returns {Promise<Object>} результаты поиска
 */
export const searchProducts = async (searchTerm, page = 1) => {
  return getProducts({
    search: searchTerm,
    page,
    limit: 10,
  });
};

/**
 * Получить товары по категории
 * @param {string} category - название категории
 * @param {number} page - номер страницы
 * @returns {Promise<Object>} товары в категории
 */
export const getProductsByCategory = async (category, page = 1) => {
  return getProducts({
    category,
    page,
    limit: 10,
  });
};

/**
 * Получить товары в диапазоне цен
 * @param {number} minPrice - минимальная цена
 * @param {number} maxPrice - максимальная цена
 * @param {number} page - номер страницы
 * @returns {Promise<Object>} товары в диапазоне цен
 */
export const getProductsByPriceRange = async (
  minPrice,
  maxPrice,
  page = 1,
) => {
  return getProducts({
    minPrice,
    maxPrice,
    page,
    limit: 10,
  });
};

/**
 * Получить популярные товары (по рейтингу)
 * @param {number} minRating - минимальный рейтинг
 * @param {number} page - номер страницы
 * @returns {Promise<Object>} популярные товары
 */
export const getPopularProducts = async (
  minRating = 4.5,
  page = 1,
) => {
  return getProducts({
    rating: minRating,
    sort: 'rating_desc',
    page,
    limit: 10,
  });
};

/**
 * Получить новейшие товары
 * @param {number} page - номер страницы
 * @returns {Promise<Object>} новые товары
 */
export const getNewestProducts = async (page = 1) => {
  return getProducts({
    sort: 'newest',
    page,
    limit: 10,
  });
};

/**
 * Получить товары по тегам
 * @param {string|string[]} tags - теги (строка или массив)
 * @param {number} page - номер страницы
 * @returns {Promise<Object>} товары с нужными тегами
 */
export const getProductsByTags = async (tags, page = 1) => {
  // если массив — преобразуем в CSV
  const tagString = Array.isArray(tags) ? tags.join(',') : tags;
  return getProducts({
    tags: tagString,
    page,
    limit: 10,
  });
};

// ============================================
// FILTER METADATA (CACHED)
// ============================================
/**
 * Кэш метаданных фильтров, чтобы не дергать API повторно (особенно в StrictMode)
 */
let _filterMetadataCache = null;

/**
 * Получить метаданные для фильтров (категории, теги, ценовой диапазон).
 * Стратегия:
 *  1. Делаем первичный запрос с маленьким лимитом (например 1 или 50), чтобы узнать meta.total / meta.totalPages.
 *  2. Ограничиваем максимальное число товаров, используемых для анализа (например 500), чтобы не перегружать backend.
 *  3. Пагинированно загружаем товары порциями (limit = PAGE_LIMIT) пока не соберем достаточно.
 *  4. На любой ошибке – возвращаем то, что успели собрать (graceful degradation).
 *  5. Кэшируем результат в памяти процесса.
 * @returns {Promise<{categories: string[], tags: string[], priceRange: {min:number, max:number}}>} метаданные
 */
export const getFilterMetadata = async () => {
  // Возвращаем из кэша если уже получено
  if (_filterMetadataCache) return _filterMetadataCache;

  const PAGE_LIMIT = 50; // безопасный limit, который backend поддерживает
  const MAX_ANALYZED_ITEMS = 500; // верхняя граница анализа (защита от огромной БД)

  try {
    // Первичный запрос — узнаем общую мету
    const first = await getProducts({ page: 1, limit: PAGE_LIMIT });
    const meta = first.meta || {};
    const total = meta.total || first.items?.length || 0;
    const totalPages = meta.totalPages || 1;

    // Инициализируем коллекции
    const categoriesSet = new Set();
    const tagsMap = {};
    let prices = [];

    // Функция обработки пачки товаров
    const processItems = (items = []) => {
      for (const p of items) {
        if (!p) continue;
        if (p.category) {
          p.category
            .split(',')
            .map((c) => c.trim().toLowerCase())
            .filter(Boolean)
            .forEach((cat) => categoriesSet.add(cat));
        }
        if (p.tags) {
          p.tags
            .split(',')
            .map((t) => t.trim().toLowerCase())
            .filter(Boolean)
            .forEach((tag) => {
              tagsMap[tag] = (tagsMap[tag] || 0) + 1;
            });
        }
        const discount = Number(p.discount) || 0;
        const basePrice = Number(p.priceOrigin) || 0;
        const finalPrice = basePrice * (1 - discount / 100);
        if (!isNaN(finalPrice) && finalPrice > 0)
          prices.push(finalPrice);
      }
    };

    // Обрабатываем первую страницу
    processItems(first.items);

    // Сколько ещё нужно страниц для анализа
    const targetItems = Math.min(total, MAX_ANALYZED_ITEMS);
    const pagesNeeded = Math.min(
      Math.ceil(targetItems / PAGE_LIMIT),
      totalPages,
    );

    // Загружаем остальные страницы (начиная со 2й)
    for (let page = 2; page <= pagesNeeded; page++) {
      try {
        const resp = await getProducts({ page, limit: PAGE_LIMIT });
        processItems(resp.items);
        if (prices.length >= targetItems) break; // достаточно данных
      } catch (pageErr) {
        console.warn(
          'Partial metadata: error loading page',
          page,
          pageErr,
        );
        break; // прекращаем дальнейшие попытки
      }
    }

    // Вычисляем диапазон цен
    const minPrice = prices.length ? Math.min(...prices) : 0;
    const maxPrice = prices.length ? Math.max(...prices) : 100;

    // Сортируем теги по популярности
    const sortedTags = Object.entries(tagsMap)
      .sort(([, a], [, b]) => b - a)
      .map(([tag]) => tag);

    _filterMetadataCache = {
      categories: Array.from(categoriesSet).sort(),
      tags: sortedTags,
      priceRange: {
        min: Math.floor(minPrice * 10) / 10,
        max: Math.ceil(maxPrice * 10) / 10,
      },
    };

    return _filterMetadataCache;
  } catch (error) {
    console.error('Error fetching filter metadata (fatal):', error);
    // Возвращаем дефолт чтобы UI не падал
    _filterMetadataCache = {
      categories: [],
      tags: [],
      priceRange: { min: 0, max: 100 },
    };
    return _filterMetadataCache;
  }
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductsByCategory,
  getProductsByPriceRange,
  getPopularProducts,
  getNewestProducts,
  getProductsByTags,
  getFilterMetadata,
};
