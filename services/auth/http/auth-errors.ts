import axios from 'axios';
import type { ApiErrorResponse } from '../../types/api';

const authErrorMessages: Record<string, string> = {
  'auth/email-already-in-use':
    'This email is already connected to another account.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/invalid-credential': 'The email or password is incorrect.',
  'auth/unauthorized': 'Your session has ended. Please log in again.',
  'auth/missing-password': 'Please enter your password.',
  'auth/network-request-failed':
    'Network error. Check your internet connection and try again.',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
  'auth/user-not-found': 'No account was found for this email.',
  'auth/weak-password': 'Password should be at least 6 characters.',
  'auth/wrong-password': 'The email or password is incorrect.',
  'permission-denied':
    'You do not have permission to complete this action.',
  unavailable: 'The service is temporarily unavailable. Please try again.',
  'profile/create-failed':
    'Your account could not be completed, so it was rolled back. Please try again.',
  'profile/rollback-failed':
    'Your account was created, but saving your profile failed. Please fix Firestore and remove the incomplete account before trying again.',
  'profile/not-found': 'Your user profile could not be found.',
  'validation/login':
    'Please enter your email and password before logging in.',
  'validation/register': 'Please complete all registration fields.',
  'validation/name': 'Name is required.',
  'validation/phone': 'Please enter a valid phone number.',
  'validation/email': 'Please enter a valid email address.',
  'validation/password': 'Please enter a valid password.',
  'config/firebase-not-configured': 'Firebase is not configured correctly.',
};

export class AuthApiError extends Error {
  code: string;
  details?: unknown;

  constructor(code: string, message: string, details?: unknown) {
    super(message);
    this.name = 'AuthApiError';
    this.code = code;
    this.details = details;
  }
}

export function normalizeAuthError(error: unknown): AuthApiError {
  if (error instanceof AuthApiError) {
    return error;
  }

  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data as ApiErrorResponse | undefined;
    const code = responseData?.code || error.code || 'api/request-failed';
    const message =
      responseData?.message ||
      authErrorMessages[code] ||
      error.message ||
      'Something went wrong. Please try again.';

    return new AuthApiError(code, message, responseData?.details || error);
  }

  const genericError = error as {
    code?: string;
    message?: string;
    details?: unknown;
  };
  const code = genericError?.code || 'unknown/error';
  const message =
    authErrorMessages[code] ||
    genericError?.message ||
    'Something went wrong. Please try again.';

  return new AuthApiError(code, message, genericError?.details || error);
}