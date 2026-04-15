import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const colors = {
  background: '#F3F4F8',
  white: '#FFFFFF',
  primary: '#D9FF1F',
  text: '#111827',
  subtext: '#6B7280',
  border: '#ECECEC',
  cardBorder: '#F0F0F0',
  successBg: '#EAF8EE',
  successText: '#22A45D',
  dangerBg: '#FDECEC',
  dangerText: '#D9534F',
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 20,
};

export const radius = {
  sm: 10,
  md: 14,
  lg: 18,
};

export const typography = {
  title: 26,
  section: 16,
  body: 13,
  small: 12,
};

export const layout = {
  screenWidth: width,
  isSmallDevice: width < 360,
  horizontalPadding: 16,
};

export const commonStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: layout.horizontalPadding,
    paddingTop: 10,
  },
  pageTitle: {
    fontSize: typography.title,
    fontWeight: '800',
    color: colors.text,
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 14,
    fontSize: typography.body,
    color: colors.subtext,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: radius.sm,
    paddingHorizontal: 14,
    height: 42,
    fontSize: 13,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
});