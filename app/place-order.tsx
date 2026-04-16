import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '../contexts/LanguageContext';

export default function PlaceOrderScreen() {
  const { t, isRTL } = useLanguage();

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <Text style={[styles.title, isRTL && styles.textRight]}>{t.placeOrder}</Text>
        <Text style={[styles.subtitle, isRTL && styles.textRight]}>
          {t.placeOrderComingSoon}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 20,
    color: '#6B7280',
  },
  textRight: {
    textAlign: 'right',
  },
});
