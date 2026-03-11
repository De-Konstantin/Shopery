# 🛒 Shopery Frontend

**React 19 + Vite 6 + React Router 7 + Stripe**

Современный e-commerce интерфейс с поддержкой корзины, платежей и демо-режима.

---

## 📋 Оглавление

- [Требования](#требования)
- [Быстрый старт](#быстрый-старт)
- [Переменные окружения](#переменные-окружения)
- [Тестирование](#тестирование)
- [Build & Deploy](#build--deploy)

---

## 💻 Требования

- **Node.js** 20+
- **npm** 10+
- **Backend API** запущен на http://localhost:3000

---

## 🚀 Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка environment

```bash
# Скопируй .env.example в .env.local
cp .env.example .env.local

# Отредактируй .env.local:
# VITE_API_URL=http://localhost:3000
# VITE_DEMO_MODE=false
```

### 3. Запуск dev сервера

```bash
npm run dev
```

Приложение откроется на **http://localhost:5173**

---

## 🔐 Переменные окружения

Создай `.env.local` файл:

```env
# Backend API URL
VITE_API_URL=http://localhost:3000

# Demo mode (блокирует реальные действия)
VITE_DEMO_MODE=false

# Demo учетные данные
VITE_DEMO_USER_EMAIL=demo@shopery.dev
VITE_DEMO_USER_PASSWORD=demo12345
VITE_DEMO_ADMIN_EMAIL=admin@shopery.dev
VITE_DEMO_ADMIN_PASSWORD=admin12345

# Stripe Public Key (опционально)
# VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

---

## 🧪 Тестирование

### Playwright E2E тесты

```bash
# Установка Playwright (если еще не установлен)
npm install

# Запустить все тесты
npm run test:e2e

# Интерактивный UI (рекомендуется)
npm run test:e2e:ui

# Debug режим
npm run test:e2e:debug
```

**Что тестируется:**

- ✅ Auth: регистрация, вход с demo-аккаунтом
- ✅ Shop: каталог, фильтры, открытие товара
- ✅ Checkout: добавление в корзину, оформление заказа
- ✅ Demo Mode: блокировка демо-товаров
- ✅ Navigation: все страницы доступны
- ✅ Console: нет критичных ошибок

**Покрытие:** 40+ тестовых сценариев на Chromium, Firefox, WebKit и Mobile Chrome

---

## 📦 Build & Deploy

### Production build

```bash
npm run build
```

Результат в папке `dist/`

### Preview production build

```bash
npm run preview
```

### Lint & Format

```bash
# Проверка кода
npm run lint

# Форматирование
npm run format
```

---

## 🎭 Demo режим

Для тестирования приложения используйте **демо-аккаунты**:

### Demo User (покупатель)

- **Email:** `demo@shopery.dev`
- **Password:** `demo12345`
- Доступ к корзине, оформлению заказов, профилю

### Admin User (администратор)

- **Email:** `admin@shopery.dev`
- **Password:** `admin12345`
- Доступ ко всем функциям (включая управление товарами)

### Ограничения demo-режима

- ❌ Нельзя оставлять/редактировать/удалять отзывы (API возвращает 403)
- ❌ Демо-товары (с отрицательным ID) не создают реальные заказы
- ✅ Можно просматривать каталог, добавлять в корзину
- ✅ Можно оформлять заказы с обычными товарами

---

## 💳 Stripe Payment (Тестовые карты)

Для проверки оплаты используйте **Stripe Test Mode** карты:

| Сценарий               | Номер карты           | CVV         | Дата          |
| ---------------------- | --------------------- | ----------- | ------------- |
| ✅ **Успешная оплата** | `4242 4242 4242 4242` | Любой (123) | Любая будущая |
| ❌ **Ошибка оплаты**   | `4000 0000 0000 0002` | Любой       | Любая будущая |
| 🔐 **3D Secure**       | `4000 0025 0000 3155` | Любой       | Любая будущая |

> **Примечание:** Все тестовые транзакции безопасны и не списывают реальные деньги.

---

## 🔗 Links

- **Backend Repository:** [GitHub - Shopery Backend](https://github.com/your-username/shopery-backend)
- **API Documentation:** См. `backend/README.md`
- **Root Documentation:** См. `/README.md` в корне проекта

---

## 📚 Структура проекта

```
Shopery/
├── src/
│   ├── components/      # UI компоненты (ProductCard, Hero, Filter)
│   ├── features/        # Функциональные компоненты (CartButton, Search)
│   ├── layouts/         # Layouts (Header, Footer)
│   ├── pages/           # Страницы (Home, Shop, ProductPage)
│   ├── router/          # React Router конфигурация
│   ├── utils/           # Утилиты (api.js)
│   └── widgets/         # Сложные виджеты (HeroSlider)
├── tests/               # Playwright E2E тесты
├── public/              # Статические файлы (images)
└── playwright.config.js # Конфигурация тестов
```

---

## 🛠️ Troubleshooting

### Backend недоступен

```bash
# Проверь статус backend
curl http://localhost:3000/health

# Если не работает - запусти backend
cd ../backend/backend-app
npm run start:dev
