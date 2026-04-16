import { apiClient } from './api-client';
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  UserProfile,
} from '../../../types/auth';

export async function registerRequest(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  const response = await apiClient.post<RegisterResponse>('/auth/register', payload);
  return response.data;
}

export async function loginRequest(
  payload: LoginPayload
): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>('/auth/login', payload);
  return response.data;
}

export async function logoutRequest(): Promise<void> {
  await apiClient.post('/auth/logout');
}

export async function getCurrentUserProfileRequest(): Promise<UserProfile | null> {
  const response = await apiClient.get<UserProfile | null>('/auth/me');
  return response.data;
}
