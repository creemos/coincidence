/**
 * API Client с автоматическим добавлением JWT токена в заголовки
 * Централизованная обработка всех запросов к бэкенду
 */

interface ApiRequestOptions extends RequestInit {
  requireAuth?: boolean;
}

// Глобальный обработчик logout для вызова из apiClient
let globalLogoutHandler: (() => void) | null = null;

export function setLogoutHandler(handler: () => void) {
  globalLogoutHandler = handler;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = '/api') {
    this.baseURL = baseURL;
  }

  /**
   * Получить токен из localStorage
   */
  private getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  /**
   * Универсальный метод для выполнения запросов
   */
  private async request<T>(
    endpoint: string, 
    options: ApiRequestOptions = {}
  ): Promise<T> {
    const { requireAuth = true, headers = {}, ...restOptions } = options;

    // Подготовка заголовков
    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(headers as Record<string, string>),
    };

    // Автоматическое добавление JWT токена, если требуется авторизация
    if (requireAuth) {
      const token = this.getToken();
      if (token) {
        requestHeaders['Authorization'] = `Bearer ${token}`;
      }
    }

    const url = `${this.baseURL}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...restOptions,
        headers: requestHeaders,
      });

      // Обработка ошибки 401 (токен истёк или невалиден)
      if (response.status === 401) {
        // Вызываем глобальный logout handler
        if (globalLogoutHandler) {
          globalLogoutHandler();
        } else {
          // Fallback: удаляем токен вручную
          localStorage.removeItem('authToken');
        }
        
        // Редирект на страницу логина (если не на ней)
        if (window.location.pathname !== '/auth') {
          window.location.href = '/auth';
        }
        
        throw new Error('Сессия истекла. Пожалуйста, войдите снова.');
      }

      // Проверка успешности запроса
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Ошибка ${response.status}`);
      }

      // Возвращаем данные
      return await response.json();
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      throw error;
    }
  }

  /**
   * GET запрос
   */
  async get<T>(endpoint: string, options?: ApiRequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  /**
   * POST запрос
   */
  async post<T>(endpoint: string, data?: any, options?: ApiRequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * PUT запрос
   */
  async put<T>(endpoint: string, data?: any, options?: ApiRequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   * DELETE запрос
   */
  async delete<T>(endpoint: string, options?: ApiRequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

// Экспорт единого экземпляра API клиента
export const apiClient = new ApiClient();
