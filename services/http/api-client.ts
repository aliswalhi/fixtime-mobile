import axios from 'axios';
import { localApiAdapter } from '../../integrations/api/local-api-adapter';

export const apiClient = axios.create({
  adapter: localApiAdapter,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function setApiClientAuthToken(token: string | null) {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
    return;
  }

  delete apiClient.defaults.headers.common.Authorization;
}
