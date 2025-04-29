import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#0056b3', // Example primary blue
  secondary: '#6c757d', // Example secondary gray
  background: '#f5f5f5',
  white: '#ffffff',
  black: '#000000',
  text: '#333333',
  textSecondary: '#666666',
  border: '#cccccc',
  error: '#dc3545', // Example error red
  success: '#28a745', // Example success green
  inputBackground: '#ffffff',
};

export const typography = {
  fontSizeBase: 16,
  fontSizeLarge: 20,
  fontSizeSmall: 14,
  fontSizeTitle: 24,
  fontWeightBold: 'bold' as 'bold',
  fontWeightNormal: 'normal' as 'normal',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  title: {
    fontSize: typography.fontSizeTitle,
    fontWeight: typography.fontWeightBold,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.fontSizeBase,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  input: {
    height: 50,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.inputBackground,
    fontSize: typography.fontSizeBase,
    marginBottom: spacing.md,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48, // Ensure minimum touch target size
    marginBottom: spacing.md,
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.fontSizeBase,
    fontWeight: typography.fontWeightBold,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.fontSizeSmall,
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  // Add more global styles as needed
});

