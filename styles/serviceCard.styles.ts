import { StyleSheet } from 'react-native';
import { colors } from './theme';

export const serviceCardStyles = StyleSheet.create({
  card: {
    width: '31%',
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    minHeight: 88,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#F6F7FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 18,
  },
  title: {
    fontSize: 10,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    lineHeight: 14,
  },
});