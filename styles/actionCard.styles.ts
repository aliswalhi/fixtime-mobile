import { StyleSheet } from 'react-native';
import { colors } from './theme';

export const actionCardStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 12,
    color: colors.subtext,
  },

  arrow: {
    fontSize: 22,
    color: '#9CA3AF',
  },
});