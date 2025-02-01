import axios from 'axios';
import toast from 'react-hot-toast';

export default class UserService {
  private apiUrl: string;

  constructor() {
    this.apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  }

  async signUp(username: string, email: string, password: string): Promise<void> {
    try {
      const response = await axios.post(`${this.apiUrl}/user`, {
        username,
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      toast.success('Signed up successfully.');
    } catch (error) {
      console.error('Error signing up:', error);
      toast.error('Error signing up.');
    }
  }

  async signIn(email: string, password: string): Promise<void> {
    try {
      const response = await axios.post(`${this.apiUrl}/signin`, {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      toast.success('Signed in successfully.');
    } catch (error) {
      console.error('Error signing in:', error);
      toast.error('Error signing in.');
    }
  }

  
  async signOut(): Promise<void> {
    try {
      localStorage.removeItem('token');
      toast.success('Signed out successfully.');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error signing out.');
    }
  }

  async getUserProfile(token: string | null): Promise<any> {
    if (!token) {
      throw new Error('No token found');
    }
    try {
      const response = await axios.get(`${this.apiUrl}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }
}
