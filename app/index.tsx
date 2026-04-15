import { router } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/primary-button';
import colors from '../constants/colors';

export default function SplashPage() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoBox}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.appName}>FixTime</Text>
        <Text style={styles.subtitle}>Get Help Anytime</Text>
      </View>

      <PrimaryButton title="Get Started" onPress={() => router.push('/login')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.splashBackground,
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBox: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: colors.overlayWhite,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 130,
    height: 130,
  },
  appName: {
    fontSize: 34,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.textDark,
    textAlign: 'center',
  },
});
