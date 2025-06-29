import api from './api';

export interface User {
  id: number;
  userName: string;
  email: string;
  userType: string;
}

class UserService {
  async getAllUsers(): Promise<User[]> {
    const response = await api.get('/users');
    return response.data;
  }

  async getUserById(id: number): Promise<User> {
    const response = await api.get(`/users/${id}`);
    return response.data;
  }
}

const userService = new UserService();
export default userService; 