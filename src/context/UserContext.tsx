import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import UserService from '../services/user.service';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

interface UserContextProps {
  user: User | null;
  loading: boolean;
  role: string | null; // Add role
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

const fetchUserRole = async (userId: string): Promise<string | null> => {
  const userRef = doc(db, 'users', userId);
  const docSnap = await getDoc(userRef); 

  if (docSnap.exists()) {
    return docSnap.data().role || null;
  } else {
    return null;
  }
};
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
  const [role, setRole] = useState<string | null>(null);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const user = await userService.signInWithGoogle();
      setUser(user);

      if (user) {
        const fetchedRole = await fetchUserRole(user.uid);
        setRole(fetchedRole);
      }
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
      setRole(null);
    } catch (error) {
      console.error("Error during sign-out:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        setUser(currentUser);
        const fetchedRole = await fetchUserRole(currentUser.uid);
        setRole(fetchedRole);
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, signInWithGoogle, signOut, role }}>
      {children}
    </UserContext.Provider>
  );
};