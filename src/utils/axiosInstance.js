import axios from 'axios';

// Базовый URL API
const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Создаем instance axios с предварительными настройками
 * Используется для запросов, требующих JWT (auth, orders, reviews и т.д.)
 */
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor для запроса: добавляем JWT токен в заголовки
 * Если токен есть в localStorage, добавляем его ко всем запросам
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * Interceptor для ответа: обработка ошибок авторизации
 * Если сервер вернул 401 (Unauthorized), удаляем токен и редиректим на signin
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Токен истек или невалиден
      console.warn(
        'Token expired or invalid. Redirecting to SignIn...',
      );
      localStorage.removeItem('token');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
