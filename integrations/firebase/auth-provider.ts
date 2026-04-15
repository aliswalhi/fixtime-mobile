import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '../../constants/firebaseConfig';
import type {
  AuthUser,
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

type ProviderError = Error & {
  code: string;
  details?: unknown;
};

const USERS_COLLECTION = 'users';

function createProviderError(
  code: string,
  message: string,
  details?: unknown
): ProviderError {
  const error = new Error(message) as ProviderError;
  error.code = code;
  error.details = details;
  return error;
}

function ensureFirebaseReady() {
  if (!isFirebaseConfigured) {
    throw createProviderError(
      'config/firebase-not-configured',
      'Firebase is not configured correctly.'
    );
  }
}

function mapAuthUser(user: User): AuthUser {
  return {
    uid: user.uid,
    email: user.email,
  };
}

function buildUserProfile(payload: RegisterPayload, uid: string): UserProfile {
  return {
    uid,
    name: payload.name,
    phone: payload.phone,
    email: payload.email,
    role: 'user',
    createdAt: new Date().toISOString(),
  };
}

async function saveUserProfile(profile: UserProfile) {
  await setDoc(doc(db, USERS_COLLECTION, profile.uid), profile);
}

async function getUserProfileByUid(uid: string): Promise<UserProfile | null> {
  const snapshot = await getDoc(doc(db, USERS_COLLECTION, uid));

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as UserProfile;
}

export async function registerWithFirebase(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  ensureFirebaseReady();

  const validationIssue = getRegisterValidationError(payload);

  if (validationIssue) {
    throw createProviderError(validationIssue.code, validationIssue.message);
  }

  const cleanPayload = sanitizeRegisterPayload(payload);

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    cleanPayload.email,
    cleanPayload.password
  );

  const profile = buildUserProfile(cleanPayload, userCredential.user.uid);

  try {
    await saveUserProfile(profile);
  } catch (profileError) {
    try {
      await deleteUser(userCredential.user);
    } catch (rollbackError) {
      await signOut(auth).catch(() => undefined);
      throw createProviderError(
        'profile/rollback-failed',
        'Your account was created, but saving your profile failed. Please fix Firestore and remove the incomplete account before trying again.',
        {
          profileError,
          rollbackError,
        }
      );
    }

    throw createProviderError(
      'profile/create-failed',
      'Your account could not be completed, so it was rolled back. Please try again.',
      { cause: profileError }
    );
  }

  return {
    token: await userCredential.user.getIdToken(),
    user: mapAuthUser(userCredential.user),
    profile,
  };
}

export async function loginWithFirebase(
  payload: LoginPayload
): Promise<LoginResponse> {
  ensureFirebaseReady();

  const validationIssue = getLoginValidationError(payload);

  if (validationIssue) {
    throw createProviderError(validationIssue.code, validationIssue.message);
  }

  const cleanPayload = sanitizeLoginPayload(payload);

  const userCredential = await signInWithEmailAndPassword(
    auth,
    cleanPayload.email,
    cleanPayload.password
  );

  const profile = await getUserProfileByUid(userCredential.user.uid);

  return {
    token: await userCredential.user.getIdToken(),
    user: mapAuthUser(userCredential.user),
    profile,
  };
}

export async function logoutFromFirebase(): Promise<void> {
  ensureFirebaseReady();
  await signOut(auth);
}

export async function getCurrentUserProfileFromFirebase(): Promise<UserProfile | null> {
  ensureFirebaseReady();

  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw createProviderError(
      'auth/unauthorized',
      'Your session has ended. Please log in again.'
    );
  }

  return getUserProfileByUid(currentUser.uid);
}

export async function waitForFirebaseAuthReady() {
  ensureFirebaseReady();

  if (typeof auth.authStateReady === 'function') {
    await Promise.race([
      auth.authStateReady(),
      new Promise<void>((resolve) => {
        setTimeout(resolve, 2500);
      }),
    ]);
    return;
  }

  await Promise.race([
    new Promise<void>((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, () => {
        unsubscribe();
        resolve();
      });
    }),
    new Promise<void>((resolve) => {
      setTimeout(resolve, 2500);
    }),
  ]);
}
