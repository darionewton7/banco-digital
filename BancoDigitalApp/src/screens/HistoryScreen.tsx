import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { globalStyles, colors, spacing, typography } from '../styles/globalStyles'; // Import global styles
import { RootStackParamList } from '../navigation/AppNavigator';

type HistoryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'History'>;

interface Props {
  navigation: HistoryScreenNavigationProp;
}

// Placeholder data for transactions
const transactions = [
  { id: '1', date: '28/04/2025', description: 'Transferência Recebida - João S.', amount: 150.00, type: 'credit' },
  { id: '2', date: '27/04/2025', description: 'Pagamento Supermercado ABC', amount: -85.50, type: 'debit' },
  { id: '3', date: '26/04/2025', description: 'Transferência Enviada - Maria L.', amount: -50.00, type: 'debit' },
  { id: '4', date: '25/04/2025', description: 'Depósito Salário', amount: 2500.00, type: 'credit' },
  { id: '5', date: '24/04/2025', description: 'Pagamento Conta de Luz', amount: -120.30, type: 'debit' },
  { id: '6', date: '23/04/2025', description: 'Compra Online - Loja XYZ', amount: -45.99, type: 'debit' },
  // Add more transactions as needed
];

interface TransactionItemProps {
  item: typeof transactions[0];
}

const TransactionItem: React.FC<TransactionItemProps> = ({ item }) => (
  <View style={styles.transactionItem}>
    <View style={styles.transactionDetails}>
      <Text style={styles.transactionDescription}>{item.description}</Text>
      <Text style={styles.transactionDate}>{item.date}</Text>
    </View>
    <Text 
      style={[
        styles.transactionAmount,
        item.type === 'credit' ? styles.creditAmount : styles.debitAmount
      ]}
    >
      {item.type === 'credit' ? '+' : '-'} R$ {Math.abs(item.amount).toFixed(2).replace('.', ',')}
    </Text>
  </View>
);

const HistoryScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={globalStyles.container}> {/* Use global container style */}
      <Text style={globalStyles.title}>Histórico de Transações</Text> {/* Use global title style */}
      <FlatList
        data={transactions}
        renderItem={({ item }) => <TransactionItem item={item} />}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma transação encontrada.</Text>}
        contentContainerStyle={styles.listContent}
      />
      {/* Add filter options if needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: spacing.md, // Add padding at the bottom of the list
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border, // Use color from global styles
  },
  transactionDetails: {
    flex: 1,
    marginRight: spacing.sm,
  },
  transactionDescription: {
    fontSize: typography.fontSizeBase,
    color: colors.text, // Use color from global styles
    marginBottom: spacing.xs,
  },
  transactionDate: {
    fontSize: typography.fontSizeSmall,
    color: colors.textSecondary, // Use color from global styles
  },
  transactionAmount: {
    fontSize: typography.fontSizeBase,
    fontWeight: typography.fontWeightBold,
  },
  creditAmount: {
    color: colors.success, // Use success color from global styles
  },
  debitAmount: {
    color: colors.error, // Use error color from global styles
  },
  emptyText: {
    textAlign: 'center',
    marginTop: spacing.xl * 2,
    fontSize: typography.fontSizeBase,
    color: colors.textSecondary,
  },
});

export default HistoryScreen;

