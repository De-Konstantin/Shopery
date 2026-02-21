import {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Загрузка данных пользователя при монтировании
  useEffect(() => {
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  // Загрузить данные пользователя
  const loadUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error('Failed to load user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Регистрация
  const register = async (userData) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/register`,
        userData,
      );
      const { access_token, user: userData } = response.data;

      localStorage.setItem('token', access_token);
      setToken(access_token);
      setUser(userData);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed',
      };
    }
  };

  // Вход
  const login = async (credentials) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/login`,
        credentials,
      );
      const { access_token, user: userData } = response.data;

      localStorage.setItem('token', access_token);
      setToken(access_token);
      setUser(userData);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
      };
    }
  };

  // Выход
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
