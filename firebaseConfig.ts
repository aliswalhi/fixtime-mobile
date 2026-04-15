import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC7tQPs8tefoNm8HOnKh2aEJDJzg_ZwVK0',
  authDomain: 'mobile-team-3bbb9.firebaseapp.com',
  projectId: 'mobile-team-3bbb9',
  storageBucket: 'mobile-team-3bbb9.firebasestorage.app',
  messagingSenderId: '322100695976',
  appId: '1:322100695976:web:759b16fde90b9f37ab839d',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);