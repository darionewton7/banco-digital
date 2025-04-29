import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomInput from '../components/Input'; // Import custom input
import CustomButton from '../components/Button'; // Import custom button
import { globalStyles, colors, spacing, typography } from '../styles/globalStyles'; // Import global styles
import { RootStackParamList } from '../navigation/AppNavigator';

type TransferScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Transfer'>;

interface Props {
  navigation: TransferScreenNavigationProp;
}

const TransferScreen: React.FC<Props> = ({ navigation }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [transferType, setTransferType] = useState('email'); // 'email', 'phone', 'qrcode'
  const [loading, setLoading] = useState(false);
  const [recipientError, setRecipientError] = useState('');
  const [amountError, setAmountError] = useState('');

  const validateInput = () => {
    let isValid = true;
    setRecipientError('');
    setAmountError('');

    if (!recipient && transferType !== 'qrcode') {
      setRecipientError('Por favor, informe o destinatário.');
      isValid = false;
    }
    // Add more specific recipient validation based on type if needed

    const numericAmount = parseFloat(amount.replace(',', '.'));
    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      setAmountError('Por favor, informe um valor válido.');
      isValid = false;
    }

    return isValid;
  };

  const handleTransfer = () => {
    if (!validateInput()) {
      return;
    }

    setLoading(true);

    // Simulate transfer confirmation and API call
    Alert.alert(
      'Confirmar Transferência',
      `Você está transferindo R$ ${amount} para ${recipient || 'Destinatário QR Code'}. Confirma?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
          onPress: () => setLoading(false),
        },
        {
          text: 'Confirmar',
          onPress: () => {
            // Simulate API call delay
            setTimeout(() => {
              setLoading(false);
              // In a real app, check API response
              Alert.alert('Sucesso', 'Transferência realizada com sucesso!');
              navigation.navigate('Dashboard');
            }, 1500);
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={globalStyles.title}>Nova Transferência</Text>
      
      {/* Transfer Type Selection - Could be improved with a custom SegmentedControl */}
      <View style={styles.transferTypeContainer}>
        <CustomButton 
          title="Email" 
          onPress={() => setTransferType('email')} 
          style={[styles.typeButton, transferType === 'email' && styles.typeButtonActive]}
          textStyle={[styles.typeButtonText, transferType === 'email' && styles.typeButtonTextActive]}
          variant={transferType === 'email' ? 'primary' : 'secondary'}
        />
        <CustomButton 
          title="Telefone" 
          onPress={() => setTransferType('phone')} 
          style={[styles.typeButton, transferType === 'phone' && styles.typeButtonActive]}
          textStyle={[styles.typeButtonText, transferType === 'phone' && styles.typeButtonTextActive]}
          variant={transferType === 'phone' ? 'primary' : 'secondary'}
        />
        <CustomButton 
          title="QR Code" 
          onPress={() => setTransferType('qrcode')} 
          style={[styles.typeButton, transferType === 'qrcode' && styles.typeButtonActive]}
          textStyle={[styles.typeButtonText, transferType === 'qrcode' && styles.typeButtonTextActive]}
          variant={transferType === 'qrcode' ? 'primary' : 'secondary'}
        />
      </View>

      {transferType !== 'qrcode' && (
        <CustomInput
          label={transferType === 'email' ? 'Email do destinatário' : 'Telefone do destinatário'}
          placeholder={transferType === 'email' ? 'exemplo@email.com' : '(00) 00000-0000'}
          value={recipient}
          onChangeText={setRecipient}
          keyboardType={transferType === 'email' ? 'email-address' : 'phone-pad'}
          autoCapitalize="none"
          error={recipientError}
        />
      )}
      
      {transferType === 'qrcode' && (
        <View style={styles.qrPlaceholder}>
          <Text style={styles.qrText}>Câmera para QR Code</Text>
          {/* In a real app, integrate a camera component like react-native-camera */}
          <CustomButton title="Simular Leitura" onPress={() => setRecipient('usuario_qrcode')} variant="secondary" />
        </View>
      )}

      <CustomInput
        label="Valor (R$)"
        placeholder="0,00"
        value={amount}
        onChangeText={setAmount}
        keyboardType="decimal-pad"
        error={amountError}
      />

      <CustomInput
        label="Descrição (opcional)"
        placeholder="Ex: Pagamento de aluguel"
        value={description}
        onChangeText={setDescription}
        multiline
        style={styles.descriptionInput} // Apply specific style for multiline
      />

      <View style={styles.buttonContainer}>
        <CustomButton 
          title="Transferir" 
          onPress={handleTransfer} 
          loading={loading} 
          disabled={loading} 
        />
        <CustomButton 
          title="Cancelar" 
          onPress={() => navigation.goBack()} 
          variant="secondary" 
          disabled={loading}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    flexGrow: 1,
  },
  transferTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  typeButton: {
    flex: 1, // Make buttons take equal width
    marginHorizontal: spacing.xs, // Add small space between buttons
  },
  typeButtonActive: {
    // Optional: Add specific style for active button if needed beyond variant
  },
  typeButtonText: {
    // Optional: Style for button text
  },
  typeButtonTextActive: {
    // Optional: Style for active button text
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: 'top', // Align text to top for multiline
    paddingTop: spacing.sm, // Adjust padding for multiline
  },
  qrPlaceholder: {
    width: '100%',
    height: 200,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background, // Use background color
  },
  qrText: {
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  buttonContainer: {
    marginTop: spacing.lg,
  },
});

export default TransferScreen;

