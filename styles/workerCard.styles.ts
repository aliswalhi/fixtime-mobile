import { StyleSheet } from 'react-native';

export const workerCardStyles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#EEF2F7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 6,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  rowReverse: {
    flexDirection: 'row-reverse',
  },

  textRight: {
    textAlign: 'right',
  },

  avatarBox: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarIcon: {
    fontSize: 34,
  },

  info: {
    flex: 1,
  },

  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },

  name: {
    flex: 1,
    fontSize: 21,
    fontWeight: '900',
    color: '#111827',
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },

  availableBadge: {
    backgroundColor: '#DCFCE7',
  },

  busyBadge: {
    backgroundColor: '#FEE2E2',
  },

  badgeText: {
    fontSize: 12,
    fontWeight: '800',
  },

  availableText: {
    color: '#16A34A',
  },

  busyText: {
    color: '#DC2626',
  },

  service: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: '600',
    color: '#6366F1',
  },

  metaRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    flexWrap: 'wrap',
  },

  meta: {
    color: '#6B7280',
    fontWeight: '600',
  },

  detailsRow: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 10,
  },

  detailBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 18,
    padding: 12,
  },

  detailLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '700',
  },

  detailValue: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: '900',
    color: '#111827',
  },

  ratingBox: {
    marginTop: 16,
    backgroundColor: '#0F172A',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },

  ratingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  ratingTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  ratingSubtitle: {
    color: '#CBD5E1',
    fontSize: 12,
    marginTop: 2,
  },

  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },

  star: {
    fontSize: 28,
    color: '#64748B',
  },

  activeStar: {
    color: '#FBBF24',
  },
});