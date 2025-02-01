import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import UserService from '../services/user.service';

interface User {
  id: string;
  username: string;
  email: string;
  photoURL?: string;
  role?: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  role: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

const userService = new UserService();

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await userService.getUserProfile(token);
          setUser(response.data);
          setRole(response.data.role);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);


  return (
    <UserContext.Provider value={{ user, setUser, loading, role }}>
      {children}
    </UserContext.Provider>
  );
};