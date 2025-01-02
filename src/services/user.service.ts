import { auth, db } from '../config/firebase';
import {
  browserLocalPersistence,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
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
      const user = result.user;
      const role = 'user';
      // Save the user to Firestore
      await this.saveUserToFirestore(user, role);
      toast.success('Signed in successfully.');
      return result.user;
    } catch (error) {
      console.error('Error signing in:', error);
      toast.error('Error signing in.');
      return null;
    }
  }
  async saveUserToFirestore(user: User, role: string) {
    try {
      const userRef = doc(db, 'users', user.uid);
      
      // Check if the user already exists
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        console.log('User already exists in Firestore:', user.uid);
        return; // Don't save the user if they already exist
      }

      // If the user doesn't exist, save them to Firestore
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: role,
        lastLogin: new Date(),
      });
      console.log('User saved to Firestore with role:', user.uid, role);
    } catch (error) {
      console.error('Error saving user to Firestore:', error);
      toast.error('Error saving user to Firestore.');
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
