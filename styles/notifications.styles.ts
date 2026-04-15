import { StyleSheet } from 'react-native';
import { colors, commonStyles } from './theme';

export const notificationsStyles = StyleSheet.create({
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
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  iconText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '800',
  },
  textWrap: {
    flex: 1,
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 3,
  },
  cardMessage: {
    fontSize: 12,
    color: colors.subtext,
    lineHeight: 16,
  },
  timeText: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 2,
  },
});