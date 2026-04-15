import { StyleSheet } from 'react-native';
import { colors, commonStyles } from './theme';

export const menuStyles = StyleSheet.create({
  ...commonStyles,

  listContent: {
    paddingBottom: 24,
  },
  item: {
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  arrow: {
    fontSize: 20,
    color: '#9CA3AF',
  },
});