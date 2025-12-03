// API client configuration
const BASE_URL = 'https://official-rq05.onrender.com/api/v1';

export interface ApiResponse<T> {
  token: string;
  data?: T;
  message?: string;
  status?: string;
}

export interface ServicesResponse {
  status: string;
  results: number;
  data: {
    data: Service[];
  };
}

export interface ApiResponseWithServices {
  status: string;
  results: number;
  data: {
    data: Service[];
  };
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
    serviceOrders?: unknown[];
    passwordChangedAt?: string;
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

export interface Service {
  _id: string;
  name: string;
  summary: string;
  description: string;
  slug: string;
  heroImage: string[];
  isRecommended: boolean;
  isMostPopular: boolean;
  heroButtons: {
    primary: string;
    secondary: string;
  };
  whyWork: {
    description: string;
    reasons: Array<{
      title: string;
      description: string;
      image: string;
      _id: string;
    }>;
  };
  process: {
    title: string;
    description: string;
    steps: Array<{
      title: string;
      description: string;
      image: string;
      _id: string;
    }>;
  };
  recentProjects: {
    subtitle: string;
    projects: Array<{
      title: string;
      industry: string;
      image: string;
      _id: string;
    }>;
  };
  pricingPackage: {
    title: string;
    subtitle: string;
    pricingPlans: Array<{
      price: {
        ngn: number;
      };
      duration: {
        minDays: number;
        maxDays: number;
      };
      planTitle: string;
      benefit: string[];
      _id: string;
    }>;
  };
  readySection: {
    readyButton: {
      primary: string;
      secondary: string;
    };
    title: string;
    description: string;
  };
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

      // Log detailed error information for debugging
      console.error('API Error:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        errorData,
        originalMessage: errorMessage
      });

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
        errorMessage = `Internal server error. Please try again later.${errorData.message ? ` Details: ${errorData.message}` : ''}`;
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

  async getAllUsers(): Promise<{ status: string; results: number; data: { data: AuthResponse['user'][] } }> {
    return this.request('/users/', {
      method: 'GET',
    });
  }

  async deleteUser(userId: string): Promise<ApiResponse<unknown>> {
    return this.request(`/users/${userId}`, {
      method: 'DELETE',
    });
  }

  async getAllServices(): Promise<ApiResponse<Service[]>> {
    return this.request('/services/', {
      method: 'GET',
    });
  }

  async getServiceBySlug(slug: string): Promise<ApiResponse<Service>> {
    return this.request(`/services/slug/${slug}`, {
      method: 'GET',
    });
  }

  async getServiceById(id: string): Promise<ApiResponse<Service>> {
    return this.request(`/services/${id}`, {
      method: 'GET',
    });
  }

  async createService(serviceData: Partial<Service>): Promise<ApiResponse<Service>> {
    return this.request('/services/', {
      method: 'POST',
      body: JSON.stringify(serviceData),
    });
  }

  async updateService(id: string, updates: Partial<Service>): Promise<ApiResponse<Service>> {
    return this.request(`/services/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  async deleteService(id: string): Promise<ApiResponse<unknown>> {
    return this.request(`/services/${id}`, {
      method: 'DELETE',
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