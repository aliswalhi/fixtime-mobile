import { StyleSheet } from 'react-native';

export const workersStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F4FBF6',
  },
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  hero: {
    backgroundColor: '#EAF8EE',
    borderRadius: 26,
    padding: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#102A1D',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: '#374151',
    fontWeight: '600',
  },
  textRight: {
    textAlign: 'right',
  },
  searchInput: {
    marginTop: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 15,
    color: '#111827',
  },
  filtersWrapper: {
    marginBottom: 16,
  },
  filtersContainer: {
    gap: 10,
    flexDirection: 'row',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  filterChip: {
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeFilterChip: {
    backgroundColor: '#008F45',
    borderColor: '#008F45',
  },
  filterText: {
    color: '#6B7280',
    fontWeight: '900',
    fontSize: 14,
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 30,
    color: '#6B7280',
  },
  errorBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginTop: 20,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#DC2626',
  },
  errorText: {
    marginTop: 8,
    color: '#6B7280',
  },
  listContent: {
    paddingBottom: 120,
  },
  emptyBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    marginTop: 20,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111827',
  },
  emptyText: {
    marginTop: 8,
    color: '#6B7280',
  },
});