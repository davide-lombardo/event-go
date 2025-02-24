import axios from 'axios';
import toast from 'react-hot-toast';
import { User } from '../types/user.model';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const userService = {
  async signUp(username: string, email: string, password: string): Promise<void> {
    try {
      const response = await axios.post(`${apiUrl}/user`, {
        username,
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      toast.success('Signed up successfully.');
    } catch (error: any) {
      console.error('Error signing up:', error);
      console.log(error);
      toast.error('Error signing up:', error.message);
    }
  },

  async signIn(email: string, password: string): Promise<void> {
    try {
      const response = await axios.post(`${apiUrl}/user/signin`, {
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
  },

  async signOut(): Promise<void> {
    try {
      localStorage.removeItem('token');
      toast.success('Signed out successfully.');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error signing out.');
    }
  },

  async getUserProfile(token: string | null): Promise<User> {
    if (!token) {
      throw new Error('No token found');
    }
    try {
      const response = await axios.get(`${apiUrl}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  async updateProfile(data: { username: string; profileImage: string }): Promise<User> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    try {
      const response = await axios.patch(`${apiUrl}/user/profile`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  async uploadProfileImage(data: FormData): Promise<User> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    try {
      const response = await axios.post(`${apiUrl}/user/profile/image`, data, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading profile image:', error);
      throw error;
    }
  },

};

export const useUserService = () => userService;