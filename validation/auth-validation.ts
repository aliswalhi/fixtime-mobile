import type { LoginPayload, RegisterPayload } from '../types/auth';

type ValidationResult = true | string;

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_PATTERN = /^\+?\d{8,15}$/;
export const PASSWORD_MIN_LENGTH = 6;
export const NAME_MIN_LENGTH = 2;

export type ValidationIssue = {
  code: string;
  message: string;
};

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function normalizePhone(value: string) {
  return value.trim().replace(/[\s-]/g, '');
}

export function validateNameValue(value: string): ValidationResult {
  const cleanValue = value.trim();

  if (!cleanValue) {
    return 'Name is required.';
  }

  if (cleanValue.length < NAME_MIN_LENGTH) {
    return 'Name must be at least 2 characters.';
  }

  return true;
}

export function validatePhoneValue(value: string): ValidationResult {
  const cleanValue = normalizePhone(value);

  if (!cleanValue) {
    return 'Phone number is required.';
  }

  if (!PHONE_PATTERN.test(cleanValue)) {
    return 'Phone number must be 8 to 15 digits.';
  }

  return true;
}

export function validateEmailValue(value: string): ValidationResult {
  const cleanValue = normalizeEmail(value);

  if (!cleanValue) {
    return 'Email is required.';
  }

  if (!EMAIL_PATTERN.test(cleanValue)) {
    return 'Please enter a valid email address.';
  }

  return true;
}

export function validatePasswordValue(value: string): ValidationResult {
  if (!value) {
    return 'Password is required.';
  }

  if (value.length < PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`;
  }

  return true;
}

export function sanitizeRegisterPayload(
  payload: RegisterPayload
): RegisterPayload {
  return {
    name: payload.name.trim(),
    phone: normalizePhone(payload.phone),
    email: normalizeEmail(payload.email),
    password: payload.password,
  };
}

export function sanitizeLoginPayload(payload: LoginPayload): LoginPayload {
  return {
    email: normalizeEmail(payload.email),
    password: payload.password,
  };
}

export function getRegisterValidationError(
  payload: RegisterPayload
): ValidationIssue | null {
  const cleanPayload = sanitizeRegisterPayload(payload);
  const validations: Array<[string, ValidationResult]> = [
    ['validation/name', validateNameValue(cleanPayload.name)],
    ['validation/phone', validatePhoneValue(cleanPayload.phone)],
    ['validation/email', validateEmailValue(cleanPayload.email)],
    ['validation/password', validatePasswordValue(cleanPayload.password)],
  ];

  const failedValidation = validations.find(([, result]) => result !== true);

  if (!failedValidation) {
    return null;
  }

  return {
    code: failedValidation[0],
    message: failedValidation[1] as string,
  };
}

export function getLoginValidationError(
  payload: LoginPayload
): ValidationIssue | null {
  const cleanPayload = sanitizeLoginPayload(payload);
  const validations: Array<[string, ValidationResult]> = [
    ['validation/email', validateEmailValue(cleanPayload.email)],
    ['validation/password', validatePasswordValue(cleanPayload.password)],
  ];

  const failedValidation = validations.find(([, result]) => result !== true);

  if (!failedValidation) {
    return null;
  }

  return {
    code: failedValidation[0],
    message: failedValidation[1] as string,
  };
}
