import { StyleSheet } from 'react-native';
import { colors, commonStyles } from './theme';

export const workersStyles = StyleSheet.create({
  ...commonStyles,

  filtersWrapper: {
    height: 50,
    marginBottom: 8,
    justifyContent: 'center',
  },
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
  },
  filterChip: {
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    height: 34,
    borderRadius: 10,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeFilterChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  activeFilterText: {
    color: colors.text,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingTop: 4,
    paddingBottom: 24,
  },
  emptyBox: {
    marginTop: 20,
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