import { User as FirebaseUser } from 'firebase/auth';

export interface CustomUser extends FirebaseUser {
  following: string[];
}