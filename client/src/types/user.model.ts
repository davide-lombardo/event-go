import { EventData } from "./event.model";

export interface User {
  id: string;
  email: string;
  photoURL?: string;
  following: string[];
  createdAt: Date;
  updatedAt: Date;
  password: string;
  username: string;
  role: string;
  events: EventData[];
}

export interface UserResponse {
  user: User;
  token: string;
}

export interface UserRequest {
  email: string;
  password: string;
  username: string;
  photoURL?: string;
}

export interface UserUpdateRequest {
  email?: string;
  password?: string;
  username?: string;
  photoURL?: string;
}

export interface UserFollowRequest {
  userId: string;
}

export interface UserUnfollowRequest {
  userId: string;
}