import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import moxios from 'moxios';
import { useUserService } from '../../services/user.service';
import { User } from '../../types/user.model';

const userService = useUserService();
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

describe('UserService', () => {
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall(axios);
    vi.restoreAllMocks();
  });

  // it('should sign up a user', async () => {
  //   const username = 'testuser';
  //   const email = 'testuser@example.com';
  //   const password = 'password123';
  //   const token = 'fake-token';

  //   moxios.stubRequest(`${apiUrl}/user`, {
  //     status: 201,
  //     response: { token },
  //   });

  //   // vi.spyOn(toast, 'success').mockImplementation((message: string | null) => message);
  //   // vi.spyOn(toast, 'error').mockImplementation((message: string | null) => message);

  //   await userService.signUp(username, email, password);

  //   const request = moxios.requests.mostRecent();
  //   expect(request.config.method).toBe('post');
  //   expect(request.config.data).toEqual({ username, email, password });
  //   expect(localStorage.getItem('token')).toBe(token);
  //   expect(toast.success).toHaveBeenCalledWith('Signed up successfully.');
  // });

  // it('should sign in a user', async () => {
  //   const email = 'testuser@example.com';
  //   const password = 'password123';
  //   const token = 'fake-token';

  //   moxios.stubRequest(`${apiUrl}/user/signin`, {
  //     status: 200,
  //     response: { token },
  //   });

  //   // vi.spyOn(toast, 'success').mockImplementation((message: string | null) => message);
  //   // vi.spyOn(toast, 'error').mockImplementation((message: string | null) => message);

  //   await userService.signIn(email, password);

  //   const request = moxios.requests.mostRecent();
  //   expect(request.config.method).toBe('post');
  //   expect(request.config.data).toEqual({ email, password });
  //   expect(localStorage.getItem('token')).toBe(token);
  //   expect(toast.success).toHaveBeenCalledWith('Signed in successfully.');
  // });

  it('should sign out a user', async () => {
    // vi.spyOn(toast, 'success').mockImplementation((message: string | null) => message);
    // vi.spyOn(toast, 'error').mockImplementation((message: string | null) => message);

    await userService.signOut();

    expect(localStorage.getItem('token')).toBeNull();
    // expect(toast.success).toHaveBeenCalledWith('Signed out successfully.');
  });

  it('should get user profile', async () => {
    const token = 'fake-token';
    const userProfile: User = {
      id: '1',
      username: 'testuser',
      email: 'testuser@example.com',
      following: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      password: 'hashedpassword',
      photoURL: 'http://profile.image',
      role: 'user',
      events: []
    };

    vi.spyOn(localStorage, 'getItem').mockReturnValue(token);

    moxios.stubRequest(`${apiUrl}/user/profile`, {
      status: 200,
      response: userProfile,
    });

    const profile = await userService.getUserProfile(token);

    const request = moxios.requests.mostRecent();
    expect(request.config.method).toBe('get');
    expect(request.config.headers?.Authorization).toBe(`Bearer ${token}`);
    expect(profile).toEqual(userProfile);
  });

  // it('should update user profile', async () => {
  //   const token = 'fake-token';
  //   const updatedProfile: User = {
  //     id: '1',
  //     username: 'testuser',
  //     email: 'testuser@example.com',
  //     following: [],
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     password: 'hashedpassword',
  //     photoURL: 'http://profile.image',
  //     role: 'user',
  //     events: []
  //   };

  //   vi.spyOn(localStorage, 'getItem').mockReturnValue(token);

  //   moxios.stubRequest(`${apiUrl}/user/profile`, {
  //     status: 200,
  //     response: updatedProfile,
  //   });

  //   const profile = await userService.updateProfile({
  //     username: 'updateduser',
  //     profileImage: 'http://updatedprofile.image',
  //   });

  //   const request = moxios.requests.mostRecent();
  //   expect(request.config.method).toBe('patch');
  //   expect(request.config.headers?.Authorization).toBe(`Bearer ${token}`);
  //   expect(profile).toEqual(updatedProfile);
  // });

  // it('should upload profile image', async () => {
  //   const token = 'fake-token';
  //   const formData = new FormData();
  //   formData.append('image', new Blob(), 'image.png');
  //   const updatedProfile: User = {
  //     id: '1',
  //     username: 'testuser',
  //     email: 'testuser@example.com',
  //     following: [],
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     password: 'hashedpassword',
  //     photoURL: 'http://profile.image',
  //     role: 'user',
  //     events: []
  //   };

  //   vi.spyOn(localStorage, 'getItem').mockReturnValue(token);

  //   moxios.stubRequest(`${apiUrl}/user/profile/image`, {
  //     status: 200,
  //     response: updatedProfile,
  //   });

  //   const profile = await userService.uploadProfileImage(formData);

  //   const request = moxios.requests.mostRecent();
  //   expect(request.config.method).toBe('post');
  //   expect(request.config.headers?.Authorization).toBe(`Bearer ${token}`);
  //   expect(request.config.headers?.['Content-Type']).toBe('multipart/form-data');
  //   expect(profile).toEqual(updatedProfile);
  // });

  it('should throw an error if no token is found for getUserProfile', async () => {
    await expect(userService.getUserProfile(null)).rejects.toThrow('No token found');
  });

  it('should throw an error if no token is found for updateProfile', async () => {
    vi.spyOn(localStorage, 'getItem').mockReturnValue(null);
    await expect(userService.updateProfile({ username: 'testuser', profileImage: 'http://profile.image' })).rejects.toThrow('No token found');
  });

  it('should throw an error if no token is found for uploadProfileImage', async () => {
    vi.spyOn(localStorage, 'getItem').mockReturnValue(null);
    const formData = new FormData();
    formData.append('image', new Blob(), 'image.png');
    await expect(userService.uploadProfileImage(formData)).rejects.toThrow('No token found');
  });
});
