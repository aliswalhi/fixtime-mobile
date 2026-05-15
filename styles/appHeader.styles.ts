import { StyleSheet } from 'react-native';

export const appHeaderStyles = StyleSheet.create({
  header: {
    backgroundColor: '#008F45',
    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logo: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  iconButton: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dot: {
    position: 'absolute',
    top: 9,
    right: 10,
    width: 9,
    height: 9,
    borderRadius: 99,
    backgroundColor: '#EF4444',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },

  menuPanel: {
    position: 'absolute',
    top: 82,
    right: 20,
    width: 230,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },

  menuItem: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  menuItemText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },

  languageText: {
    fontSize: 13,
    color: '#6B7280',
  },

  languageBox: {
    backgroundColor: '#F8FAFC',
    paddingVertical: 6,
  },

  languageOption: {
    paddingVertical: 10,
    paddingHorizontal: 28,
  },

  languageActive: {
    color: '#008F45',
    fontWeight: '800',
  },

  languageInactive: {
    color: '#444',
    fontWeight: '500',
  },

  notificationsPanel: {
    position: 'absolute',
    top: 82,
    right: 20,
    width: 320,
    maxHeight: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },

  panelTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 14,
  },

  panelLoadingText: {
    textAlign: 'center',
    marginTop: 16,
    color: '#6B7280',
  },

  panelList: {
    paddingBottom: 12,
  },

  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },

  notificationIconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  notificationIconText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },

  notificationTextWrap: {
    flex: 1,
  },

  notificationTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },

  notificationMessage: {
    fontSize: 13,
    lineHeight: 20,
    color: '#6B7280',
  },

  centerBox: {
    alignItems: 'center',
    marginTop: 16,
  },

  errorText: {
    color: '#DC2626',
    fontWeight: '700',
  },

  retryButton: {
    marginTop: 12,
    backgroundColor: '#008F45',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 14,
  },

  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
});