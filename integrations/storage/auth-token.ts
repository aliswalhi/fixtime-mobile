import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const AUTH_TOKEN_KEY = 'fixtime_auth_token';

function canUseBrowserStorage() {
  return (
    typeof window !== 'undefined' &&
    typeof window.localStorage !== 'undefined'
  );
}

export async function saveAuthToken(token: string) {
  if (Platform.OS === 'web') {
    try {
      if (canUseBrowserStorage()) {
        window.localStorage.setItem(AUTH_TOKEN_KEY, token);
      }
      return;
    } catch (error) {
      console.log('SAVE TOKEN WEB ERROR:', error);
      return;
    }
  }

  try {
    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
  } catch (error) {
    console.log('SAVE TOKEN ERROR:', error);
  }
}

export async function getAuthToken() {
  if (Platform.OS === 'web') {
    try {
      if (canUseBrowserStorage()) {
        return window.localStorage.getItem(AUTH_TOKEN_KEY);
      }
      return null;
    } catch (error) {
      console.log('GET TOKEN WEB ERROR:', error);
      return null;
    }
  }

  try {
    return await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
  } catch (error) {
    console.log('GET TOKEN ERROR:', error);
    return null;
  }
}

export async function deleteAuthToken() {
  if (Platform.OS === 'web') {
    try {
      if (canUseBrowserStorage()) {
        window.localStorage.removeItem(AUTH_TOKEN_KEY);
      }
      return;
    } catch (error) {
      console.log('DELETE TOKEN WEB ERROR:', error);
      return;
    }
  }

  try {
    await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
  } catch (error) {
    console.log('DELETE TOKEN ERROR:', error);
  }
}
