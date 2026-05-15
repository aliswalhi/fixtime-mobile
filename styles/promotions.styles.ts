import { StyleSheet } from 'react-native';

export const promotionsStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F4F7FB',
  },

  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 18,
    paddingTop: 18,
  },

  pageTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 22,
  },

  textRight: {
    textAlign: 'right',
  },

  centerText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#6B7280',
  },

  errorBox: {
    alignItems: 'center',
    marginTop: 40,
  },

  errorText: {
    color: '#DC2626',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },

  retryBtn: {
    marginTop: 16,
    backgroundColor: '#111827',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
  },

  retryText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  listContent: {
    paddingBottom: 120,
    width: '100%',
  },

  columnWrapper: {
    gap: 18,
  },

  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },

  cardLarge: {
    flex: 1,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },

  cardTextWrap: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111827',
    lineHeight: 25,
  },

  cardDesc: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 22,
    color: '#6B7280',
  },

  tagBadge: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },

  greenTag: {
    backgroundColor: '#DCFCE7',
  },

  blueTag: {
    backgroundColor: '#DBEAFE',
  },

  tagText: {
    fontWeight: '800',
    fontSize: 12,
  },

  greenTagText: {
    color: '#16A34A',
  },

  blueTagText: {
    color: '#2563EB',
  },
});