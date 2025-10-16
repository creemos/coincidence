import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { setLogoutHandler } from '@/lib/apiClient';

interface DecodedToken {
  sub: string;
  exp: number;
  [key: string]: any;
}

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: DecodedToken | null;
  login: (token: string) => void;
  logout: () => void;
  isTokenValid: () => boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provider для управления состоянием авторизации
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Проверка валидности токена
   */
  const isTokenValid = (): boolean => {
    if (!token) return false;

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const currentTime = Date.now() / 1000;

      // Проверяем, не истёк ли токен
      if (decoded.exp && decoded.exp < currentTime) {
        return false;
      }

      return true;
    } catch (error) {
      console.error('Ошибка декодирования токена:', error);
      return false;
    }
  };

  /**
   * Вход - сохранение токена
   */
  const login = (newToken: string) => {
    try {
      const decoded = jwtDecode<DecodedToken>(newToken);
      setToken(newToken);
      setUser(decoded);
      localStorage.setItem('authToken', newToken);
    } catch (error) {
      console.error('Невалидный токен:', error);
    }
  };

  /**
   * Выход - удаление токена
   */
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
  };

  /**
   * Инициализация: проверка токена при загрузке
   */
  useEffect(() => {
    // Регистрируем logout handler для apiClient
    setLogoutHandler(logout);
    
    const savedToken = localStorage.getItem('authToken');

    if (savedToken) {
      try {
        const decoded = jwtDecode<DecodedToken>(savedToken);
        const currentTime = Date.now() / 1000;

        // Проверяем срок действия токена
        if (decoded.exp && decoded.exp > currentTime) {
          setToken(savedToken);
          setUser(decoded);
        } else {
          // Токен истёк - удаляем
          localStorage.removeItem('authToken');
        }
      } catch (error) {
        console.error('Ошибка при проверке токена:', error);
        localStorage.removeItem('authToken');
      }
    }
    
    setIsLoading(false);
  }, []);

  const value = {
    isAuthenticated: isTokenValid(),
    token,
    user,
    login,
    logout,
    isTokenValid,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook для использования AuthContext
 */
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  
  return context;
}
