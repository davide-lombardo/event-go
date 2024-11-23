import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from 'firebase/auth';
import UserService from '../services/user.service';

interface UserContextProps {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

// Instantiate the UserService
const userService = new UserService();

// Provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const user = await userService.signInWithGoogle();
      setUser(user);
    } catch (error) {
      console.error("Error during sign-in:", error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await userService.signOut();
      setUser(null);
    } catch (error) {
      console.error("Error during sign-out:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>
      {children}
    </UserContext.Provider>
  );
};