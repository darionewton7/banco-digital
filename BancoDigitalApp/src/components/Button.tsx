import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { colors, typography, spacing, globalStyles } from '../styles/globalStyles';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'primary' | 'secondary' | 'danger'; // Add more variants as needed
}

const CustomButton: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  disabled = false, 
  loading = false, 
  style, 
  textStyle,
  variant = 'primary' 
}) => {

  const getBackgroundColor = () => {
    if (disabled) return colors.secondary; // Use a disabled color
    switch (variant) {
      case 'secondary':
        return colors.secondary;
      case 'danger':
        return colors.error;
      case 'primary':
      default:
        return colors.primary;
    }
  };

  return (
    <TouchableOpacity
      style={[
        globalStyles.button, 
        { backgroundColor: getBackgroundColor() },
        disabled && styles.disabled, 
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text style={[globalStyles.buttonText, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.6,
  },
});

export default CustomButton;

