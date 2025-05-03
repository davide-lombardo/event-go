import toast from 'react-hot-toast';
import { User } from '../types/user.model';
import axiosInstance from '../utils/axiosInstance';

const userService = {
  async signUp(
    username: string,
    email: string,
    password: string
  ): Promise<void> {
    try {
      const response = await axiosInstance.post('/user', {
        username,
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token);

      toast.success('Signed up successfully.');
    } catch (error: any) {
      console.error('Error signing up:', error);
      
      toast.error('Error signing up:', error.message);
    }
  },

  async signIn(email: string, password: string): Promise<void> {
    try {
      const response = await axiosInstance.post(`/user/signin`, {
        email,
        password,
      });

      const { accessToken } = response.data;

      // Store tokens
      localStorage.setItem('token', accessToken);

      toast.success('Signed in successfully.');
    } catch (error) {
      console.error('Error signing in:', error);
      toast.error('Error signing in.');
    }
  },

  async signOut(): Promise<void> {
    try {
      await axiosInstance.post(`/user/logout`);
      localStorage.removeItem('token');

      toast.success('Signed out successfully.');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error signing out.');
    }
  },

  // Function to refresh access token
  async refreshAccessToken(): Promise<string | null> {
    const refreshToken = this.getRefreshTokenFromCookie();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await axiosInstance.post(`/user/refresh-token`, {
        refreshToken,
      });
      const { accessToken } = response.data;

      // Store the new access token
      localStorage.setItem('token', accessToken);
      return accessToken;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      return null;
    }
  },

  // Function to get the refresh token from cookies
  getRefreshTokenFromCookie(): string | null {
    const match = document.cookie.match(
      new RegExp('(^| )refreshToken=([^;]+)')
    );
    return match ? match[2] : null;
  },

  async getUserProfile(token: string | null): Promise<User> {
    if (!token) {
      throw new Error('No token found');
    }
    try {
      const response = await axiosInstance.get(`/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  async updateProfile(data: {
    username: string;
    profileImage: string;
  }): Promise<User> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    try {
      const response = await axiosInstance.patch(`/user/profile`, data, {
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
      const response = await axiosInstance.post(`/user/profile/image`, data, {
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
