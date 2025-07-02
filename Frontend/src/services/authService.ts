import api from './api';

export interface LoginCredentials {
  userName: string;
  password: string;
}

export interface User {
  id: number;
  userName: string;
  email: string;
  userType: 'ADMIN' | 'USER';
}

export interface RegisterRequest {
  userName: string;
  email: string;
  password: string;
  userType: 'ADMIN' | 'USER';
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      // For HTTP Basic Auth, we test by accessing a protected endpoint
      // We'll use the /api/users/username/{userName} endpoint to verify credentials
      const response = await api.get(`/users/username/${credentials.userName}`, {
        auth: {
          username: credentials.userName,
          password: credentials.password
        }
      });
      
      // If we get here, authentication was successful
      const user = response.data;
      
      // Store password for future requests (in a real app, you'd use tokens)
      localStorage.setItem('password', credentials.password);
      
      return user;
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  }

  async register(userData: RegisterRequest): Promise<User> {
    const response = await api.post('/users/register', userData);
    return response.data;
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const user = localStorage.getItem('user');
      if (!user) return null;
      
      const userData = JSON.parse(user);
      const response = await api.get(`/users/${userData.id}`);
      return response.data;
    } catch (error) {
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('password');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('user') !== null;
  }
}

export default new AuthService(); 