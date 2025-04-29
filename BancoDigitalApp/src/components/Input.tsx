import React from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps } from 'react-native';
import { colors, typography, spacing, globalStyles } from '../styles/globalStyles';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

const CustomInput: React.FC<InputProps> = ({ label, error, style, ...props }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={globalStyles.label}>{label}</Text>}
      <TextInput
        style={[
          globalStyles.input,
          error ? styles.inputError : null,
          style,
        ]}
        placeholderTextColor={colors.textSecondary} // Set placeholder color
        {...props}
      />
      {error && <Text style={globalStyles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: spacing.sm, // Adjust spacing as needed
  },
  inputError: {
    borderColor: colors.error,
  },
});

export default CustomInput;

