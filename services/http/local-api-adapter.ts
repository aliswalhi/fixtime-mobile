import {
  AxiosError,
  AxiosHeaders,
  type AxiosAdapter,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import {
  getCurrentUserProfileFromFirebase,
  loginWithFirebase,
  logoutFromFirebase,
  registerWithFirebase,
} from '../../integrations/firebase/auth-provider';
import type { ApiErrorResponse } from '../../types/api';

type RouteHandler = (payload?: unknown) => Promise<unknown>;

const protectedRoutes = new Set(['POST /auth/logout', 'GET /auth/me']);

const routeHandlers: Record<string, RouteHandler> = {
  'POST /auth/register': (payload) => registerWithFirebase(payload as any),
  'POST /auth/login': (payload) => loginWithFirebase(payload as any),
  'POST /auth/logout': () => logoutFromFirebase(),
  'GET /auth/me': () => getCurrentUserProfileFromFirebase(),
};

function parseRequestData(config: InternalAxiosRequestConfig) {
  if (!config.data) {
    return undefined;
  }

  if (typeof config.data === 'string') {
    try {
      return JSON.parse(config.data);
    } catch {
      return config.data;
    }
  }

  return config.data;
}

function buildSuccessResponse(
  config: InternalAxiosRequestConfig,
  data: unknown,
  status = 200
): AxiosResponse {
  return {
    config,
    data,
    headers: new AxiosHeaders(),
    request: null,
    status,
    statusText: 'OK',
  };
}

function buildErrorResponse(
  config: InternalAxiosRequestConfig,
  error: any
): Promise<never> {
  const responseData: ApiErrorResponse = {
    code: error?.code || 'api/request-failed',
    message: error?.message || 'Request failed.',
    details: error?.details,
  };

  const response: AxiosResponse<ApiErrorResponse> = {
    config,
    data: responseData,
    headers: new AxiosHeaders(),
    request: null,
    status: getStatusCode(responseData.code),
    statusText: 'Request Failed',
  };

  return Promise.reject(
    new AxiosError(
      responseData.message,
      responseData.code,
      config,
      null,
      response
    )
  );
}

function getStatusCode(code: string) {
  if (code === 'auth/unauthorized') {
    return 401;
  }

  if (code.startsWith('validation/')) {
    return 422;
  }

  return 400;
}

function getAuthorizationHeader(config: InternalAxiosRequestConfig) {
  const headers = config.headers as any;

  if (!headers) {
    return '';
  }

  if (typeof headers.get === 'function') {
    return headers.get('Authorization') || headers.get('authorization') || '';
  }

  return headers.Authorization || headers.authorization || '';
}

export const localApiAdapter: AxiosAdapter = async (config) => {
  const routeKey = `${config.method?.toUpperCase()} ${config.url}`;
  const handler = routeHandlers[routeKey];

  if (!handler) {
    return buildErrorResponse(config, {
      code: 'api/route-not-found',
      message: `No local API route found for ${routeKey}.`,
    });
  }

  if (protectedRoutes.has(routeKey) && !getAuthorizationHeader(config)) {
    return buildErrorResponse(config, {
      code: 'auth/unauthorized',
      message: 'Authentication token is missing.',
    });
  }

  try {
    const data = await handler(parseRequestData(config));
    return buildSuccessResponse(config, data);
  } catch (error) {
    return buildErrorResponse(config, error);
  }
};
