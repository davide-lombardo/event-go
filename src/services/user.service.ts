import { auth } from '../config/firebase';
import { browserLocalPersistence, GoogleAuthProvider, setPersistence, signInWithPopup, signOut, User } from 'firebase/auth';
import toast from 'react-hot-toast';

export default class UserService {
  private googleProvider: GoogleAuthProvider;

  constructor() {
    this.googleProvider = new GoogleAuthProvider();
  }

  async signInWithGoogle(): Promise<User | null> {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithPopup(auth, this.googleProvider);
      toast.success('Signed in successfully.');
      return result.user;
    } catch (error) {
      console.error('Error signing in:', error);
      toast.error('Error signing in.');
      return null;
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(auth);
      toast.success('Signed out successfully.');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error signing out.');
    }
  }
}

export { auth };
