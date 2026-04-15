import { router } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../../components/primary-button';
import SuccessMessage from '../../components/success-message';
import colors from '../../constants/colors';
import { useAuth } from '../../hooks/use-auth';
import { logout } from '../../services/auth/auth-api';
import showAlert from '../../utils/show-alert';

export default function HomePage() {
  const { profile, clearAuthenticatedSession } = useAuth();

  async function handleLogout() {
    try {
      await logout();
      await clearAuthenticatedSession();
      router.replace('/login');
    } catch (error: any) {
      showAlert('Logout Failed', error.message);
    }
  }

  const userName = profile?.name || 'FixTime User';

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.logoWrapper}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <SuccessMessage
          title="Login Successful"
          message="Your account is ready and you are now inside FixTime."
        />

        <Text style={styles.title}>Welcome, {userName}</Text>
        <Text style={styles.subtitle}>
          You can now continue to the next part of your app from this home
          screen.
        </Text>

        <PrimaryButton title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 22,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: colors.card,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingHorizontal: 24,
    paddingVertical: 30,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  logoWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.socialButtonBackground,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 95,
    height: 95,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 6,
  },
});
