import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useUserService } from '../services/user.service';
import { EventData } from '../types/event.model';

interface User {
  id: string;
  username: string;
  email: string;
  photoURL?: string;
  role?: string;
  events?: EventData[];
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  updateUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  role: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const userService = useUserService(); // Move this inside the component
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [role, setRole] = useState<string | null>(null);

  const updateUser: React.Dispatch<React.SetStateAction<User | null>> = (updatedUser) => {
    if (typeof updatedUser === 'function') {
      setUser(updatedUser);
    } else {
      setUser(updatedUser);
    }
  };

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
          localStorage.removeItem('token'); // Clear invalid token
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, updateUser, loading, role }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};