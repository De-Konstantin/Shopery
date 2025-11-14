# Интеграция с Backend API

## Настройка

### 1. Конфигурация API URL

Создайте файл `.env` в корне проекта (скопируйте `.env.example`):

```bash
cp .env.example .env
```

Укажите URL вашего backend API:

```env
VITE_API_URL=http://localhost:3000
```

### 2. Убедитесь, что backend запущен

Ваш backend должен быть доступен по указанному URL (например, через Docker).

Проверьте доступность в Postman:

```
GET http://localhost:3000/products
```

### 3. Настройка CORS на backend

Backend должен разрешать запросы с фронтенда. Убедитесь, что в вашем backend настроен CORS:

```javascript
// Пример для Express.js
const cors = require('cors');
app.use(
  cors({
    origin: 'http://localhost:5173', // URL вашего Vite dev server
    credentials: true,
  }),
);
```

## Структура API

### Получение товаров с фильтрацией

**Endpoint:** `GET /products`

**Query параметры:**

- `page` (number) - номер страницы (по умолчанию 1)
- `limit` (number) - количество товаров на странице (по умолчанию 10)
- `search` (string) - поиск по названию/описанию
- `minPrice` (number) - минимальная цена
- `maxPrice` (number) - максимальная цена
- `category` (string) - фильтр по категории (или несколько через запятую)
- `tags` (string) - фильтр по тегам (CSV: "tag1,tag2")
- `rating` (number) - минимальный рейтинг
- `sort` (string) - сортировка: `price_asc`, `price_desc`, `rating_desc`, `newest`

**Ответ:**

```json
{
  "items": [
    {
      "id": 1,
      "productName": "Green Apple",
      "slug": "green-apple",
      "images": ["url1", "url2"],
      "category": "fruits",
      "tags": "organic,fresh",
      "priceOrigin": 4.99,
      "weight": 0.5,
      "description": "Fresh green apples",
      "quantity": 100,
      "discount": 10,
      "rating": 4.5,
      "isAvailable": true
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

### Получение товара по ID

**Endpoint:** `GET /products/:id`

**Ответ:**

```json
{
  "id": 1,
  "productName": "Green Apple"
  // ... все поля товара
}
```

## Использование в компонентах

### Пример: Shop.jsx

```javascript
import { useState, useEffect } from 'react';
import { getProducts } from '../../utils/api';

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await getProducts({ page: 1, limit: 12 });
        setProducts(response.items);
      } catch (err) {
        setError('Ошибка загрузки товаров');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // ... остальной код
}
```

## Доступные функции API

Все функции находятся в `src/utils/api.js`:

### Основные операции

- `getProducts(params)` - получить список товаров с фильтрацией
- `getProductById(id)` - получить один товар
- `createProduct(product)` - создать товар
- `updateProduct(id, updates)` - обновить товар
- `deleteProduct(id)` - удалить товар (soft delete)

### Вспомогательные функции

- `searchProducts(searchTerm, page)` - поиск товаров
- `getProductsByCategory(category, page)` - товары по категории
- `getProductsByPriceRange(minPrice, maxPrice, page)` - товары в ценовом диапазоне
- `getPopularProducts(minRating, page)` - популярные товары
- `getNewestProducts(page)` - новые товары
- `getProductsByTags(tags, page)` - товары по тегам

## Обработка ошибок

Все функции API выбрасывают ошибки при неудачных запросах. Используйте `try-catch` для их обработки:

```javascript
try {
  const data = await getProducts(params);
  // работаем с данными
} catch (error) {
  console.error('Error:', error);
  // показываем пользователю сообщение об ошибке
}
```

## Состояния загрузки

Рекомендуется использовать три состояния:

1. `loading` - идет загрузка
2. `error` - произошла ошибка
3. `data` - данные успешно загружены

```javascript
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [products, setProducts] = useState([]);
```

## Пагинация

Backend возвращает метаданные пагинации:

```javascript
const [pagination, setPagination] = useState({
  page: 1,
  limit: 12,
  total: 0,
  totalPages: 0,
});

// После получения данных обновляем:
setPagination((prev) => ({
  ...prev,
  total: response.meta.total,
  totalPages: response.meta.totalPages,
}));
```

## Фильтрация

Фильтры передаются как параметры запроса:

```javascript
const params = {
  page: 1,
  limit: 12,
  category: 'fruits,vegetables', // несколько категорий через запятую
  tags: 'organic,fresh', // несколько тегов через запятую
  minPrice: 0,
  maxPrice: 100,
  rating: 4,
  sort: 'price_asc',
};

const data = await getProducts(params);
```

## Troubleshooting

### Проблема: CORS ошибка

**Решение:** Настройте CORS на backend для разрешения запросов с `http://localhost:5173`

### Проблема: Backend не отвечает

**Решение:**

- Проверьте, что Docker контейнер запущен
- Проверьте URL в `.env` файле
- Проверьте доступность через Postman

### Проблема: Данные не отображаются

**Решение:**

- Откройте консоль браузера (F12) и проверьте ошибки
- Проверьте Network tab для просмотра запросов к API
- Убедитесь, что структура ответа от backend соответствует ожидаемой

### Проблема: Товары не загружаются после фильтрации

**Решение:** Убедитесь, что backend корректно обрабатывает query параметры фильтрации
