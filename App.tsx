import { QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View } from 'react-native';
import AuthProvider from './contexts/auth-context';
import colors from './constants/colors';
import { useAuth } from './hooks/use-auth';
import { queryClient } from './hooks/query-client';
import HomeScreen from './screens/home-screen';
import LoginScreen from './screens/login-screen';
import RegisterScreen from './screens/register-screen';
import SplashScreen from './screens/splash-screen';

const Stack = createNativeStackNavigator();

function AppLoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <View style={styles.loadingLogoBox}>
        <Image
          source={require('./assets/logo.png')}
          style={styles.loadingLogo}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.loadingTitle}>FixTime</Text>
      <Text style={styles.loadingSubtitle}>Checking your session...</Text>
    </View>
  );
}

function AppNavigator() {
  const { isAuthenticated, isReady } = useAuth();

  if (!isReady) {
    return <AppLoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        key={isAuthenticated ? 'app-stack' : 'auth-stack'}
        id="main-stack"
        screenOptions={{ headerShown: false }}
      >
        {isAuthenticated ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  loadingLogoBox: {
    width: 132,
    height: 132,
    borderRadius: 66,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  loadingLogo: {
    width: 96,
    height: 96,
  },
  loadingTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 8,
  },
  loadingSubtitle: {
    fontSize: 15,
    color: colors.textLight,
  },
});
