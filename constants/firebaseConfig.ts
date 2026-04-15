import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp } from 'firebase/app';
import * as FirebaseAuth from 'firebase/auth';
import { getAuth, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: 'AIzaSyC7tQPs8tefoNm8HOnKh2aEJDJzg_ZwVK0',
  authDomain: 'mobile-team-3bbb9.firebaseapp.com',
  projectId: 'mobile-team-3bbb9',
  storageBucket: 'mobile-team-3bbb9.firebasestorage.app',
  messagingSenderId: '322100695976',
  appId: '1:322100695976:web:759b16fde90b9f37ab839d',
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.storageBucket &&
    firebaseConfig.messagingSenderId &&
    firebaseConfig.appId
);

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

function createFirebaseAuth() {
  if (Platform.OS === 'web') {
    return getAuth(app);
  }

  try {
    const { getReactNativePersistence } = FirebaseAuth as typeof FirebaseAuth & {
      getReactNativePersistence: (storage: typeof AsyncStorage) => unknown;
    };

    return initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage) as never,
    });
  } catch {
    return getAuth(app);
  }
}

export const auth = createFirebaseAuth();
export const db = getFirestore(app);
