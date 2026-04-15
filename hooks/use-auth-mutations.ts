import { useMutation } from '@tanstack/react-query';
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from '../types/auth';
import { login, register } from '../services/auth/auth-api';
import type { AuthApiError } from '../services/auth/auth-errors';
import { useAuth } from './use-auth';

export function useLoginMutation() {
  const { setAuthenticatedSession } = useAuth();

  return useMutation<LoginResponse, AuthApiError, LoginPayload>({
    mutationFn: login,
    onSuccess: async (response) => {
      await setAuthenticatedSession(response);
    },
  });
}

export function useRegisterMutation() {
  return useMutation<RegisterResponse, AuthApiError, RegisterPayload>({
    mutationFn: register,
  });
}
