export type UserRole = 'user';

export interface AuthUser {
  uid: string;
  email: string | null;
}

export interface UserProfile {
  uid: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface RegisterPayload {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterResponse {
  token: string;
  user: AuthUser;
  profile: UserProfile;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
  profile: UserProfile | null;
}
