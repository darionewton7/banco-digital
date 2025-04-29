import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomButton from '../components/Button'; // Import custom button
import { globalStyles, colors, spacing, typography } from '../styles/globalStyles'; // Import global styles
import { RootStackParamList } from '../navigation/AppNavigator';

type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

interface Props {
  navigation: DashboardScreenNavigationProp;
}

const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  // Placeholder data
  const userName = "Dario Newton"; // Replace with actual user data from state/context
  const balance = "1.234,56"; // Replace with actual balance data

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.welcomeText}>Olá, {userName}!</Text>
      
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Saldo disponível</Text>
        <Text style={styles.balanceAmount}>R$ {balance}</Text>
        {/* Add icon to show/hide balance if needed */}
      </View>

      <View style={styles.actionsContainer}>
        {/* Use CustomButton */}
        <CustomButton 
          title="Transferir" 
          onPress={() => navigation.navigate('Transfer')} 
          style={styles.actionButton}
        />
        <CustomButton 
          title="Histórico" 
          onPress={() => navigation.navigate('History')} 
          style={styles.actionButton}
          variant="secondary" // Example of using a different variant
        />
        <CustomButton 
          title="Meu Perfil" 
          onPress={() => navigation.navigate('Profile')} 
          style={styles.actionButton}
          variant="secondary"
        />
      </View>

      {/* Optional: Display recent transactions summary */}
      {/* <View style={styles.recentTransactions}>
        <Text style={styles.sectionTitle}>Últimas Transações</Text>
        {/* List recent transactions here */}
      {/* </View> */}

      <CustomButton 
        title="Sair" 
        onPress={() => navigation.replace('Login')} // Use replace to go back to Login
        variant="danger" // Use danger variant for logout
        style={styles.logoutButton}
      />
    </ScrollView>
  );
};

// Use globalStyles and add specific styles for this screen
const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    paddingBottom: spacing.xl, // Add padding at the bottom
  },
  welcomeText: {
    fontSize: typography.fontSizeLarge,
    fontWeight: typography.fontWeightBold,
    marginBottom: spacing.lg,
    color: colors.text,
  },
  balanceContainer: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: 10,
    marginBottom: spacing.xl,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  balanceLabel: {
    fontSize: typography.fontSizeBase,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  balanceAmount: {
    fontSize: 30, // Make balance stand out
    fontWeight: typography.fontWeightBold,
    color: colors.primary,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
    flexWrap: 'wrap', // Allow buttons to wrap if needed on smaller screens
  },
  actionButton: {
    flexBasis: '30%', // Adjust based on number of buttons, roughly 1/3 width
    marginBottom: spacing.md, // Add margin for wrapped buttons
  },
  sectionTitle: {
    fontSize: typography.fontSizeLarge,
    fontWeight: typography.fontWeightBold,
    marginBottom: spacing.md,
    color: colors.text,
  },
  recentTransactions: {
    // Styles for recent transactions section
  },
  logoutButton: {
    marginTop: spacing.lg,
  },
});

export default DashboardScreen;

