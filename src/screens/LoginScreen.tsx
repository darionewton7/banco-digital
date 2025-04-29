import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomInput from '../components/Input'; // Import custom input
import CustomButton from '../components/Button'; // Import custom button
import { globalStyles, colors, spacing, typography } from '../styles/globalStyles'; // Import global styles
import { RootStackParamList } from '../navigation/AppNavigator';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateInput = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Por favor, preencha o email ou usuário.');
      isValid = false;
    }
    // Add more specific email validation if needed

    if (!password) {
      setPasswordError('Por favor, preencha a senha.');
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = () => {
    if (!validateInput()) {
      return;
    }

    setLoading(true);
    // Placeholder for actual login logic (API call)
    console.log('Email:', email);
    console.log('Password:', password);

    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
      // Simulate successful login
      if (email && password) { // Replace with actual API response check
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        navigation.replace('Dashboard'); // Use replace to prevent going back to Login
      } else {
        Alert.alert('Erro', 'Email ou senha inválidos.');
      }
    }, 1500); // Simulate 1.5 second delay
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Banco Digital</Text>
      <CustomInput
        label="Email ou Usuário"
        placeholder="Digite seu email ou usuário"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        error={emailError}
      />
      <CustomInput
        label="Senha"
        placeholder="Digite sua senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        error={passwordError}
      />
      <CustomButton 
        title="Entrar" 
        onPress={handleLogin} 
        loading={loading}
        disabled={loading}
        style={styles.loginButton}
      />
      {/* Add links for 'Forgot Password?' or 'Sign Up' if needed */}
      {/* Example:
      <TouchableOpacity onPress={() => alert('Forgot Password?')}>
        <Text style={styles.linkText}>Esqueceu a senha?</Text>
      </TouchableOpacity>
      */}
    </View>
  );
};

// Use globalStyles and add specific styles for this screen
const styles = StyleSheet.create({
  container: {
    ...globalStyles.container, // Apply global container styles
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...globalStyles.title, // Apply global title styles
    marginBottom: spacing.xl, // Increase bottom margin
    textAlign: 'center',
  },
  loginButton: {
    marginTop: spacing.md, // Add margin top to the button
    width: '100%', // Make button full width
  },
  linkText: {
    marginTop: spacing.md,
    color: colors.primary,
    fontSize: typography.fontSizeSmall,
  },
});

export default LoginScreen;

