import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { EventData } from "../types/event.model";
import toast from "react-hot-toast";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const initAuth = () => {
  const googleProvider = new GoogleAuthProvider();
  return [
    async () => {
      await setPersistence(auth, browserLocalPersistence);
      return await signInWithPopup(auth, googleProvider) && toast.success('Signed in successfully.');
    },
  ];
};

const logout = () => {
  signOut(auth) ;
  toast.success('Signed out successfully.');
};

const [signInWithGoogle] = initAuth();

export const addEventToFirestore = async (eventData: EventData) => {
  try {
    const eventsCollection = collection(db, 'events');
    await addDoc(eventsCollection, eventData);
    console.log('Event added successfully:', eventData);
  } catch (error) {
    console.error('Error adding event:', error);
  }
};

export const getEventsFromFirestore = async (): Promise<EventData[]> => {
  try {
    const eventsCollection = collection(db, 'events');
    const snapshot = await getDocs(eventsCollection);

    // Map through documents, casting each document's data as EventData
    const eventsList = snapshot.docs.map(doc => ({
      ...doc.data() as EventData,  // Type assertion to ensure fields match EventData
      id: doc.id, // Firestore auto-generated ID
    }));
    return eventsList;
  } catch (error) {
    console.error('Error retrieving events:', error);
    return [];
  }
};

export { auth, db, signInWithGoogle, logout };