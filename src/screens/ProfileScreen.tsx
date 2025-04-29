import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomButton from '../components/Button'; // Import custom button
import { globalStyles, colors, spacing, typography } from '../styles/globalStyles'; // Import global styles
import { RootStackParamList } from '../navigation/AppNavigator';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  // Placeholder user data
  const userData = {
    name: "Dario Newton",
    email: "darionewton7@gmail.com",
    phone: "(11) 98765-4321",
    address: "Rua Exemplo, 123, São Paulo, SP",
    memberSince: "01/01/2024",
  };

  const handleLogout = () => {
    // In a real app, clear user session/token
    Alert.alert(
      "Confirmação",
      "Tem certeza que deseja sair?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { 
          text: "Sim", 
          onPress: () => {
            Alert.alert("Logout", "Você foi desconectado.");
            navigation.replace('Login'); // Navigate back to Login screen using replace
          }
        }
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={globalStyles.title}>Meu Perfil</Text>

      <View style={styles.profileCard}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>{userData.name.charAt(0)}</Text>
        </View>
        <Text style={styles.userName}>{userData.name}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Informações Pessoais</Text>
        
        <View style={styles.infoItem}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{userData.email}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.label}>Telefone:</Text>
          <Text style={styles.value}>{userData.phone}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.label}>Endereço:</Text>
          <Text style={styles.value}>{userData.address}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.label}>Cliente desde:</Text>
          <Text style={styles.value}>{userData.memberSince}</Text>
        </View>
      </View>

      {/* Add buttons for editing profile, changing password, settings, etc. */}
      <View style={styles.buttonContainer}>
        <CustomButton 
          title="Editar Perfil" 
          onPress={() => Alert.alert('Funcionalidade', 'Editar perfil não implementado neste MVP.')} 
          style={styles.actionButton}
        />
        <CustomButton 
          title="Alterar Senha" 
          onPress={() => Alert.alert('Funcionalidade', 'Alterar senha não implementado neste MVP.')} 
          style={styles.actionButton}
          variant="secondary"
        />
        <CustomButton 
          title="Configurações" 
          onPress={() => Alert.alert('Funcionalidade', 'Configurações não implementadas neste MVP.')} 
          style={styles.actionButton}
          variant="secondary"
        />
        <CustomButton 
          title="Sair" 
          onPress={handleLogout} 
          variant="danger" 
          style={styles.logoutButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    paddingBottom: spacing.xl,
  },
  profileCard: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.xl,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    color: colors.white,
    fontSize: 36,
    fontWeight: typography.fontWeightBold,
  },
  userName: {
    fontSize: typography.fontSizeLarge,
    fontWeight: typography.fontWeightBold,
    color: colors.text,
  },
  sectionTitle: {
    fontSize: typography.fontSizeLarge,
    fontWeight: typography.fontWeightBold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  infoSection: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoItem: {
    marginBottom: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  label: {
    fontSize: typography.fontSizeSmall,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  value: {
    fontSize: typography.fontSizeBase,
    color: colors.text,
  },
  buttonContainer: {
    marginTop: spacing.md,
  },
  actionButton: {
    marginBottom: spacing.md,
  },
  logoutButton: {
    marginTop: spacing.md,
  },
});

export default ProfileScreen;
