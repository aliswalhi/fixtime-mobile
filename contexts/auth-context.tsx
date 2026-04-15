import {
  createContext,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCurrentUserProfile } from '../services/auth/auth-api';
import type { LoginResponse, RegisterResponse, UserProfile } from '../types/auth';
import {
  deleteAuthToken,
  getAuthToken,
  saveAuthToken,
} from '../integrations/storage/auth-token';
import { waitForFirebaseAuthReady } from '../integrations/firebase/auth-provider';

export const AUTH_PROFILE_QUERY_KEY = ['auth', 'profile'] as const;

type AuthContextValue = {
  token: string | null;
  isAuthenticated: boolean;
  isReady: boolean;
  profile: UserProfile | null;
  isProfileLoading: boolean;
  setAuthenticatedSession: (
    session: LoginResponse | RegisterResponse
  ) => Promise<void>;
  clearAuthenticatedSession: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  const persistToken = useCallback(async (nextToken: string | null) => {
    if (nextToken) {
      await saveAuthToken(nextToken);
    } else {
      await deleteAuthToken();
    }

    setToken(nextToken);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function bootstrapSession() {
      try {
        const storedToken = await getAuthToken();

        await waitForFirebaseAuthReady().catch((error: unknown) => {
          console.log('FIREBASE READY ERROR:', error);
          return undefined;
        });

        if (!isMounted) {
          return;
        }

        setToken(storedToken);
      } catch (error) {
        console.log('BOOTSTRAP SESSION ERROR:', error);

        if (!isMounted) {
          return;
        }

        setToken(null);
      } finally {
        if (isMounted) {
          setIsReady(true);
        }
      }
    }

    bootstrapSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const profileQuery = useQuery<UserProfile | null>({
    queryKey: AUTH_PROFILE_QUERY_KEY,
    queryFn: getCurrentUserProfile,
    enabled: isReady && Boolean(token),
    staleTime: 60 * 1000,
  });

  const setAuthenticatedSession = useCallback(
    async (session: LoginResponse | RegisterResponse) => {
      await persistToken(session.token);
      queryClient.setQueryData<UserProfile | null>(
        AUTH_PROFILE_QUERY_KEY,
        session.profile ?? null
      );
    },
    [persistToken, queryClient]
  );

  const clearAuthenticatedSession = useCallback(async () => {
    await persistToken(null);
    queryClient.removeQueries({ queryKey: AUTH_PROFILE_QUERY_KEY });
  }, [persistToken, queryClient]);

  useEffect(() => {
    const errorCode = (profileQuery.error as { code?: string } | null)?.code;

    if (errorCode === 'auth/unauthorized' && token) {
      clearAuthenticatedSession().catch(() => undefined);
    }
  }, [clearAuthenticatedSession, profileQuery.error, token]);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      isReady,
      profile: profileQuery.data ?? null,
      isProfileLoading: profileQuery.isLoading || profileQuery.isFetching,
      setAuthenticatedSession,
      clearAuthenticatedSession,
    }),
    [
      clearAuthenticatedSession,
      isReady,
      profileQuery.data,
      profileQuery.isFetching,
      profileQuery.isLoading,
      setAuthenticatedSession,
      token,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
