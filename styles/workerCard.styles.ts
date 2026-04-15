import { StyleSheet } from 'react-native';
import { colors } from './theme';

export const workerCardStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 14,
    marginRight: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarIcon: {
    fontSize: 28,
  },
  info: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
    marginRight: 8,
  },
  badge: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  service: {
    fontSize: 13,
    color: colors.subtext,
    marginTop: 4,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 6,
  },
  meta: {
    fontSize: 12,
    color: '#4B5563',
    marginRight: 10,
    marginBottom: 4,
  },
  infoButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 4,
    marginBottom: 8,
  },
  infoButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4338CA',
  },
  ratingSection: {
    marginTop: 6,
  },
  ratingLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  starButton: {
    marginRight: 6,
  },
  starText: {
    fontSize: 22,
    color: '#D1D5DB',
  },
  activeStarText: {
    color: '#FBBF24',
  },
  userRatingText: {
    fontSize: 12,
    color: colors.subtext,
  },
});