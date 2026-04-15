import { useMutation } from '@tanstack/react-query';
import { login, register } from '../services/auth/auth-api';
import { useAuth } from './use-auth';

export function useLoginMutation() {
  const { setAuthenticatedSession } = useAuth();

  return useMutation({
    mutationFn: login,
    onSuccess: async (response) => {
      await setAuthenticatedSession(response);
    },
  });
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: register,
  });
}
