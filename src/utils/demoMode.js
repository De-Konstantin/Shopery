/**
 * Demo Mode - Локальное управление демо-товарами для demo-админа
 * Все изменения сохраняются только в sessionStorage и исчезают при закрытии вкладки
 */

const DEMO_PRODUCTS_KEY = '__SHOPERY_DEMO_PRODUCTS__';
const DEMO_MODE_FLAG = '__SHOPERY_IS_DEMO_SESSION__';

/**
 * Установить флаг, что текущая сессия - демо
 */
export const setDemoSession = () => {
  sessionStorage.setItem(DEMO_MODE_FLAG, 'true');
};

/**
 * Проверить, является ли текущая сессия демо
 */
export const isDemoSession = () => {
  return sessionStorage.getItem(DEMO_MODE_FLAG) === 'true';
};

/**
 * Получить все демо-товары
 */
export const getAllDemoProducts = () => {
  try {
    const data = sessionStorage.getItem(DEMO_PRODUCTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting demo products:', error);
    return [];
  }
};

/**
 * Добавить новый демо-товар
 * @param {Object} product - объект товара
 * @returns {Object} добавленный товар с фиктивным ID
 */
export const addDemoProduct = (product) => {
  try {
    const demoProducts = getAllDemoProducts();

    // Генерируем временный ID (отрицательный, чтобы отличить от реальных)
    const tempId = -(Date.now() + Math.random());

    const demoProduct = {
      ...product,
      id: tempId,
      isDemoProduct: true,
      createdAt: new Date().toISOString(),
    };

    demoProducts.push(demoProduct);
    sessionStorage.setItem(
      DEMO_PRODUCTS_KEY,
      JSON.stringify(demoProducts),
    );

    return demoProduct;
  } catch (error) {
    console.error('Error adding demo product:', error);
    throw error;
  }
};

/**
 * Обновить демо-товар
 * @param {number} id - ID товара
 * @param {Object} updates - изменения
 */
export const updateDemoProduct = (id, updates) => {
  try {
    const demoProducts = getAllDemoProducts();
    const index = demoProducts.findIndex((p) => p.id === id);

    if (index === -1) {
      throw new Error('Demo product not found');
    }

    demoProducts[index] = {
      ...demoProducts[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    sessionStorage.setItem(
      DEMO_PRODUCTS_KEY,
      JSON.stringify(demoProducts),
    );
    return demoProducts[index];
  } catch (error) {
    console.error('Error updating demo product:', error);
    throw error;
  }
};

/**
 * Удалить демо-товар
 * @param {number} id - ID товара
 */
export const deleteDemoProduct = (id) => {
  try {
    const demoProducts = getAllDemoProducts();
    const filtered = demoProducts.filter((p) => p.id !== id);
    sessionStorage.setItem(
      DEMO_PRODUCTS_KEY,
      JSON.stringify(filtered),
    );
  } catch (error) {
    console.error('Error deleting demo product:', error);
    throw error;
  }
};

/**
 * Проверить, является ли товар демо-товаром
 * @param {number} id - ID товара
 */
export const isDemoProduct = (id) => {
  return Number(id) < 0; // Демо-товары имеют отрицательные ID
};

/**
 * Получить демо-товары из корзины
 * @param {Array} cartItems - товары в корзине
 */
export const getDemoProductsInCart = (cartItems = []) => {
  return cartItems.filter((item) => isDemoProduct(item.id));
};

/**
 * Мержить реальные товары с демо-товарами
 * @param {Array} realProducts - реальные товары из API
 * @returns {Array} объединённый список
 */
export const mergeWithDemoProducts = (realProducts = []) => {
  if (!isDemoSession()) {
    return realProducts;
  }

  const demoProducts = getAllDemoProducts();
  return [...realProducts, ...demoProducts];
};

/**
 * Очистить все демо-товары (при logout или закрытии сессии)
 */
export const clearDemoSession = () => {
  try {
    sessionStorage.removeItem(DEMO_PRODUCTS_KEY);
    sessionStorage.removeItem(DEMO_MODE_FLAG);
  } catch (error) {
    console.error('Error clearing demo session:', error);
  }
};

/**
 * Получить статистику демо-сессии
 */
export const getDemoSessionStats = () => {
  const demoProducts = getAllDemoProducts();
  return {
    isActive: isDemoSession(),
    totalDemoProducts: demoProducts.length,
    products: demoProducts,
  };
};

export default {
  setDemoSession,
  isDemoSession,
  getAllDemoProducts,
  addDemoProduct,
  updateDemoProduct,
  deleteDemoProduct,
  isDemoProduct,
  getDemoProductsInCart,
  mergeWithDemoProducts,
  clearDemoSession,
  getDemoSessionStats,
};
