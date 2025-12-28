// API client configuration
const BASE_URL = 'https://official-rq05.onrender.com/api/v1';

interface ErrorResponse {
  message?: string;
  error?: string;
  rawResponse?: string;
}

export class ApiError extends Error {
  public status: number;
  public statusText: string;
  public url: string;
  public endpoint: string;
  public method: string;
  public errorData: ErrorResponse;
  public responseText: string;

  constructor(
    message: string,
    details: {
      status: number;
      statusText: string;
      url: string;
      endpoint: string;
      method: string;
      errorData: ErrorResponse;
      responseText: string;
    }
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = details.status;
    this.statusText = details.statusText;
    this.url = details.url;
    this.endpoint = details.endpoint;
    this.method = details.method;
    this.errorData = details.errorData;
    this.responseText = details.responseText;
  }
}

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
        usd: number;
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

    let response: Response;
    try {
      response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...options.headers,
        },
      });
    } catch (error) {
      console.error('Network error during API request:', error);
      throw new Error('Network error: Unable to connect to the server. Please check your internet connection.');
    }

    if (!response.ok) {
      let errorData: ErrorResponse = {};
      let errorMessage = '';
      let responseText = '';

      try {
        // Try to get the response text first
        responseText = await response.text();

        // Try to parse as JSON if responseText is not empty
        if (responseText.trim()) {
          errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorData.error || '';
        } else {
          errorData = { rawResponse: responseText };
          errorMessage = response.statusText || 'Unknown error';
        }
      } catch (parseError) {
        // If JSON parsing fails, use the raw text
        errorData = { rawResponse: responseText };
        errorMessage = responseText.trim() || response.statusText || 'Unknown error';
        console.warn('Failed to parse error response as JSON:', parseError);
      }

      // Log detailed error information for debugging
      console.error('API Error Details:', JSON.stringify({
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        endpoint,
        method: options.method || 'GET',
        errorData,
        errorMessage,
        responseText
      }, null, 2));

      // Provide specific messages for common HTTP status codes
      if (response.status === 401) {
        errorMessage = errorMessage || 'Invalid credentials. Please check your username/email and password.';
      } else if (response.status === 403) {
        errorMessage = errorMessage || 'Access forbidden. You do not have permission to perform this action.';
      } else if (response.status === 404) {
        errorMessage = errorMessage || `Endpoint not found: ${endpoint}`;
      } else if (response.status === 500) {
        errorMessage = errorMessage || `Internal server error. Please try again later.`;
      } else if (!errorMessage) {
        errorMessage = `HTTP ${response.status}: ${response.statusText || 'Unknown error'}`;
      }

      throw new ApiError(errorMessage, {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        endpoint,
        method: options.method || 'GET',
        errorData,
        responseText,
      });
    }

    // Handle empty responses (e.g., DELETE requests)
    const contentLength = response.headers.get('content-length');
    const contentType = response.headers.get('content-type');

    if (contentLength === '0' || !contentLength || !contentType?.includes('application/json')) {
      return {} as T;
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

  async getAllServices(): Promise<ServicesResponse> {
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

  async getAdminOverview(): Promise<{
    status: string;
    data: {
      stats: {
        totalUsers: number;
        newUsersThisMonth: number;
        totalServices: number;
        activeServiceUsers: number;
        scheduledConsultations: number;
        totalRevenue: number;
      };
    };
  }> {

    try {
      const result = await this.request('/admin/overview', {
        method: 'GET',
      }) as {
        status: string;
        data: {
          stats: {
            totalUsers: number;
            newUsersThisMonth: number;
            totalServices: number;
            activeServiceUsers: number;
            scheduledConsultations: number;
            totalRevenue: number;
          };
          activityLog: Array<{
            user: string;
            type: string;
            createdAt: string;
          }>;
          topServices: Array<{
            _id: {
              _id: string;
            };
            revenue: number;
            sales: number;
          }>;
        };
      };
      return result;
    } catch (error) {
      console.error('Admin overview fetch failed:', error);
      throw error;
    }
  }

  async getPricingOverview(): Promise<{
    status: string;
    count: number;
    data: Array<{
      serviceId: string;
      name: string;
      pricingPlans: Array<{
        price: {
          usd: number;
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
      sales: number;
      trend: string;
      lastPriceUpdate: string;
    }>;
  }> {
    return this.request('/admin/pricingOverview', {
      method: 'GET',
    });
  }

  async updateServicePrice(serviceId: string, plans: Array<{
    _id: string;
    price: {
      usd?: number;
      ngn?: number;
    };
  }>): Promise<ApiResponse<unknown>> {
    return this.request(`/admin/updateServicePrice/${serviceId}`, {
      method: 'PATCH',
      body: JSON.stringify({ plans }),
    });
  }

  async applyInflationAdjustment(data: {
    percentage: number;
    currency: 'all' | 'usd' | 'ngn';
    reason?: string;
  }): Promise<ApiResponse<unknown>> {
    return this.request('/admin/applyInflationAdjustment', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async addUnavailableDate(data: {
    date: string;
    reason: string;
    type: 'holiday' | 'maintenance' | 'personal' | 'other';
  }): Promise<ApiResponse<unknown>> {
    return this.request('/bookings/addUnavailableDate', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateBookingDuration(data: { duration: number }): Promise<ApiResponse<unknown>> {
    return this.request('/bookings/updateBookingDuration', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async updateBookingStatus(data: { bookingId: string; status: string }): Promise<ApiResponse<unknown>> {
    return this.request('/bookings/updateBookingStatus', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async initializeBooking(): Promise<{
    status: string;
    loggedIn: boolean;
    fullname: string;
    email: string;
    userId: string;
    services: Array<{
      _id: string;
      name: string;
    }>;
    availableSlots: { [date: string]: string[] };
  }> {
    return this.request('/bookings/init', {
      method: 'GET',
    });
  }

  async createBooking(data: {
    fullname: string;
    email: string;
    date: string;
    time: string;
    service: string;
  }): Promise<ApiResponse<{
    bookingId: string;
    message: string;
  }>> {
    return this.request('/bookings/createBooking', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async verifyBooking(data: {
    bookingId: string;
    otp: string;
  }): Promise<ApiResponse<{
    booking: {
      _id: string;
      fullname: string;
      email: string;
      date: string;
      time: string;
      service: string;
      status: string;
      createdAt: string;
    };
    message: string;
  }>> {
    return this.request('/bookings/verify', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async regenerateBookingOtp(data: { bookingId: string }): Promise<ApiResponse<{
    message: string;
  }>> {
    return this.request('/bookings/regenerateOtp', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async cancelBooking(data: { bookingId: string }): Promise<ApiResponse<{
    message: string;
  }>> {
    return this.request('/bookings/cancel', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async startPayment(data: {
    serviceId: string;
    planType: string;
    currency: string;
  }): Promise<ApiResponse<{
    checkoutUrl: string;
    reference: string;
  }>> {
    return this.request('/payments/start', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getPendingConsultations(range: number = 60): Promise<{
    status: string;
    range: number;
    count: number;
    data: Array<{
      _id: string;
      fullName: string;
      email: string;
      user: {
        _id: string;
        name: string;
        email: string;
        id: string;
      };
      service: {
        _id: string;
        name: string;
      } | null;
      date: string;
      time: string;
      timeZone: string;
      isVerified: boolean;
      isCancelled: boolean;
      status: string;
      createdAt: string;
      __v: number;
    }>;
  }> {
    return this.request(`/admin/pendingConsultations?range=${range}`, {
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