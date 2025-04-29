import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons'; // Example using Ionicons
import { colors, typography, spacing } from '../styles/globalStyles';
import { RootStackParamList } from '../navigation/AppNavigator'; // Assuming RootStackParamList is exported from AppNavigator

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  // Add other props like right-side icons/buttons if needed
}

type NavigationProps = StackNavigationProp<RootStackParamList>;

const CustomHeader: React.FC<HeaderProps> = ({ title, showBackButton = true }) => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.container}>
      {showBackButton && navigation.canGoBack() && (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      {/* Placeholder for right-side elements */}
      <View style={styles.rightPlaceholder} /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60, // Standard header height
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: spacing.sm,
    marginRight: spacing.md,
  },
  title: {
    fontSize: typography.fontSizeLarge,
    fontWeight: typography.fontWeightBold,
    color: colors.text,
    textAlign: 'center',
    flex: 1, // Allow title to take available space and center
  },
  rightPlaceholder: {
    width: 40, // Match back button width for balance if needed
  },
});

export default CustomHeader;

