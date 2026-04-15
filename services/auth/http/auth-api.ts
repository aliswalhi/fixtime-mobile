import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  UserProfile,
} from '../../types/auth';
import {
  getLoginValidationError,
  getRegisterValidationError,
  sanitizeLoginPayload,
  sanitizeRegisterPayload,
} from '../../validation/auth-validation';
import { AuthApiError, normalizeAuthError } from './auth-errors';
import {
  getCurrentUserProfileRequest,
  loginRequest,
  logoutRequest,
  registerRequest,
} from './auth-service';

function validateRegisterPayload(payload: RegisterPayload) {
  const validationIssue = getRegisterValidationError(payload);

  if (validationIssue) {
    throw new AuthApiError(validationIssue.code, validationIssue.message);
  }
}

function validateLoginPayload(payload: LoginPayload) {
  const validationIssue = getLoginValidationError(payload);

  if (validationIssue) {
    throw new AuthApiError(validationIssue.code, validationIssue.message);
  }
}

export async function register(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  try {
    validateRegisterPayload(payload);
    return await registerRequest(sanitizeRegisterPayload(payload));
  } catch (error) {
    throw normalizeAuthError(error);
  }
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  try {
    validateLoginPayload(payload);
    return await loginRequest(sanitizeLoginPayload(payload));
  } catch (error) {
    throw normalizeAuthError(error);
  }
}

export async function logout(): Promise<void> {
  try {
    await logoutRequest();
  } catch (error) {
    throw normalizeAuthError(error);
  }
}

export async function getCurrentUserProfile(): Promise<UserProfile | null> {
  try {
    return await getCurrentUserProfileRequest();
  } catch (error) {
    throw normalizeAuthError(error);
  }
}