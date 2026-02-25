import {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import axiosInstance from '../utils/axiosInstance';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  /**
   * Загрузить данные пользователя при монтировании компонента
   * или при изменении токена
   */
  useEffect(() => {
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  /**
   * Загрузить профиль пользователя с backend
   */
  const loadUser = async () => {
    try {
      const response = await axiosInstance.get('/auth/me');
      setUser(response.data);
    } catch (error) {
      console.error('Failed to load user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  /**
   * Регистрация нового пользователя
   * @param {Object} userData - { email, password, firstName, lastName }
   * @returns {Object} { success: boolean, error?: string }
   */
  const register = async (userData) => {
    try {
      const response = await axiosInstance.post(
        '/auth/register',
        userData,
      );
      const { access_token, user: newUser } = response.data;

      // Сохраняем токен в localStorage
      localStorage.setItem('token', access_token);
      setToken(access_token);
      setUser(newUser);

      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Registration failed';
      console.error('Registration error:', errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    }
  };

  /**
   * Вход пользователя
   * @param {Object} credentials - { email, password }
   * @returns {Object} { success: boolean, error?: string }
   */
  const login = async (credentials) => {
    try {
      const response = await axiosInstance.post(
        '/auth/login',
        credentials,
      );
      const { access_token, user: userData } = response.data;

      // Сохраняем токен в localStorage
      localStorage.setItem('token', access_token);
      setToken(access_token);
      setUser(userData);

      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Login failed';
      console.error('Login error:', errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    }
  };

  /**
   * Выход пользователя (логаут)
   */
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  /**
   * Значение контекста с методами и состоянием
   */
  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook для использования AuthContext в компонентах
 * @returns {Object} значение контекста
 * @throws {Error} если использован вне AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
