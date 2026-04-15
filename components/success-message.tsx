import { StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';

type SuccessMessageProps = {
  title: string;
  message: string;
};

export default function SuccessMessage({
  title,
  message,
}: SuccessMessageProps) {
  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>SUCCESS</Text>
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.successBackground,
    borderWidth: 1,
    borderColor: colors.successBorder,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 22,
  },
  badge: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 12,
  },
  badgeText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  title: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: 6,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textLight,
    textAlign: 'center',
  },
});
