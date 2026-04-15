import { StyleSheet } from 'react-native';
import { colors, commonStyles } from './theme';

export const promotionsStyles = StyleSheet.create({
  ...commonStyles,

  listContent: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
    marginRight: 8,
  },
  tagBadge: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '700',
  },
  cardDesc: {
    fontSize: 12,
    color: colors.subtext,
    lineHeight: 17,
  },
});