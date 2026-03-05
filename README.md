# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# Shopery

---

## 💳 Stripe Payment Integration (Demo Mode)

Проект использует **Stripe Test Mode** для демонстрации функционала оплаты картой.

### Тестовые карты

Для проверки оплаты используйте следующие тестовые карты:

| Сценарий | Номер карты | CVV | Дата |
|----------|-------------|-----|------|
| ✅ **Успешная оплата** | `4242 4242 4242 4242` | Любой (123) | Любая будущая |
| ❌ **Ошибка оплаты** | `4000 0000 0000 0002` | Любой | Любая будущая |
| 🔐 **Требует аутентификацию** | `4000 0025 0000 3155` | Любой | Любая будущая |

### Как протестировать

1. Добавьте товары в корзину
2. Перейдите на страницу Checkout
3. Выберите **"Оплата картой (Stripe)"**
4. Введите тестовую карту `4242 4242 4242 4242`
5. CVV: `123`, Дата: `12/28` (любая будущая)
6. Нажмите "Оплатить"

### Настройка Stripe ключей

Backend использует тестовые ключи из `.env`:

`nv
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
`

Для получения собственных тестовых ключей:
1. Зарегистрируйтесь на [stripe.com](https://stripe.com)
2. Переключитесь в Test Mode
3. Скопируйте ключи из [Dashboard → API Keys](https://dashboard.stripe.com/test/apikeys)

---
