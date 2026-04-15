import { StyleSheet } from 'react-native';
import { colors, commonStyles } from './theme';

export const ordersStyles = StyleSheet.create({
  ...commonStyles,

  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tabButton: {
    alignItems: 'center',
    marginHorizontal: 18,
  },
  tabText: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '600',
    paddingBottom: 10,
  },
  activeTabText: {
    color: colors.text,
  },
  activeLine: {
    height: 2,
    width: '100%',
    backgroundColor: colors.text,
    borderRadius: 2,
  },
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
  cardTextWrap: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: colors.subtext,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  timeText: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  emptyBox: {
    marginTop: 30,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 13,
    color: colors.subtext,
  },
});