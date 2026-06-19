import api from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: AdminUser;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    console.log('\n🔐 [Admin] Attempting login...');
    console.log('Email:', credentials.email);
    console.log('API URL:', process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api');
    
    try {
      console.log('Sending POST request to /admin/auth/login');
      const response = await api.post<AuthResponse>('/admin/auth/login', credentials);
      
      console.log('✓ Response received:', {
        status: response.status,
        hasToken: !!response.data.token,
        hasUser: !!response.data.user,
        success: response.data.success
      });

      // Handle both formats: with or without success field
      const hasToken = response.data.token;
      const hasUser = response.data.user;
      
      if (hasToken && hasUser) {
        console.log('✓ Storing token and user in localStorage');
        localStorage.setItem('admin_token', response.data.token);
        localStorage.setItem('admin_user', JSON.stringify(response.data.user));
        console.log('✓ Login successful!');
      } else {
        console.warn('⚠️ Missing token or user in response');
      }
      
      return {
        success: response.data.success ?? true,
        token: response.data.token,
        user: response.data.user,
      };
    } catch (error: any) {
      console.error('❌ [Admin] Login error:');
      console.error('Error type:', error.constructor.name);
      console.error('Error message:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
      throw error;
    }
  },

  async logout(): Promise<void> {
    try {
      await api.post('/admin/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
    }
  },

  getUser(): AdminUser | null {
    if (typeof window === 'undefined') return null;
    
    const userStr = localStorage.getItem('admin_user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('admin_token');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
