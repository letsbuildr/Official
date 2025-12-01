// API client configuration
const BASE_URL = 'https://official-rq05.onrender.com/api/v1';

export interface ApiResponse<T> {
  token: string;
  data?: T;
  message?: string;
  status?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    _id?: string;
    name: string;
    username: string;
    email: string;
    role: string;
    photo?: string;
    activities?: unknown[];
    progress?: number;
    __v?: number;
  };
}

export interface LoginRequest {
  identifier: string; // username or email
  password: string;
}

export interface SignupRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  password: string;
  passwordConfirm: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private getHeaders(): HeadersInit {
    const token = this.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      let errorMessage = errorData.message || response.statusText;

      // Provide specific messages for common HTTP status codes
      if (response.status === 401) {
        errorMessage = errorMessage || 'Invalid credentials. Please check your username/email and password.';
      } else if (response.status === 400) {
        errorMessage = errorMessage || 'Bad request. Please check your input data.';
      } else if (response.status === 403) {
        errorMessage = errorMessage || 'Access forbidden. You do not have permission to perform this action.';
      } else if (response.status === 404) {
        errorMessage = errorMessage || 'Resource not found.';
      } else if (response.status === 500) {
        errorMessage = errorMessage || 'Internal server error. Please try again later.';
      } else {
        errorMessage = errorMessage || `HTTP ${response.status}: ${response.statusText || 'Unknown error'}`;
      }

      throw new Error(errorMessage);
    }

    return response.json();
  }

  // Authentication methods
  async signup(data: SignupRequest): Promise<ApiResponse<AuthResponse>> {
    return this.request('/users/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    return this.request('/users/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async logout(): Promise<ApiResponse<unknown>> {
    return this.request('/users/logout', {
      method: 'GET',
    });
  }

  async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse<unknown>> {
    return this.request('/users/forgotPassword', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async resetPassword(token: string, data: ResetPasswordRequest): Promise<ApiResponse<unknown>> {
    return this.request(`/users/resetPassword/${token}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async getUser(userId: string): Promise<ApiResponse<AuthResponse['user']>> {
    return this.request(`/users/${userId}`, {
      method: 'GET',
    });
  }

  async getCurrentUser(): Promise<ApiResponse<AuthResponse['user']>> {
    return this.request(`/users/me`, {
      method: 'GET',
    });
  }

  // Token management
  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const apiClient = new ApiClient(BASE_URL);