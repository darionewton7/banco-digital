import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth
import { getMyAccounts } from '@/services/accountService';
import { createTransfer } from '@/services/transactionService';

// Define interface for Account
interface Account {
  id: number;
  account_number: string;
  balance: string;
}

const TransferPage: React.FC = () => {
  const { user, logout } = useAuth(); // Get user and logout
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [sourceAccountId, setSourceAccountId] = useState<string>('');
  const [destinationAccountNumber, setDestinationAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false); // For general page loading
  const [submitting, setSubmitting] = useState(false); // For form submission loading
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccounts = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError('');
      try {
        const accountsData = await getMyAccounts();
        setAccounts(accountsData);
        if (accountsData && accountsData.length > 0) {
          setSourceAccountId(accountsData[0].id.toString()); // Default to first account
        } else {
          setError('Nenhuma conta de origem encontrada.');
        }
      } catch (err: any) {
        console.error('Failed to fetch accounts:', err);
        setError('Erro ao carregar contas.');
        if (err.response?.status === 401) {
          await logout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [user, logout]);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    if (!sourceAccountId) {
      setError('Selecione a conta de origem.');
      return;
    }

    const numericAmount = parseFloat(amount.replace(',', '.'));
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError('Valor inválido. Use vírgula como separador decimal.');
      return;
    }
    if (!destinationAccountNumber) {
      setError('Informe a conta de destino.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await createTransfer(parseInt(sourceAccountId), {
        destination_account_number: destinationAccountNumber,
        amount: numericAmount.toFixed(2), // Ensure two decimal places as string
        description
      });
      
      setSuccessMessage(response.message || 'Transferência realizada com sucesso!');
      // Clear form after successful transfer
      setDestinationAccountNumber('');
      setAmount('');
      setDescription('');
      // Optionally, navigate back or refresh data after a delay
      // setTimeout(() => navigate('/dashboard'), 2000);

    } catch (err: any) {
      console.error('Transfer failed:', err);
      setError(err.response?.data?.error || 'Falha na transferência. Verifique os dados e o saldo.');
    } finally {
      setSubmitting(false);
    }
  };

  // Find the balance of the selected source account
  const selectedAccountBalance = accounts.find(acc => acc.id.toString() === sourceAccountId)?.balance || '0';

  return (
    <div className="min-h-screen bg-itau-gray-light p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <header className="mb-6 flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2 text-itau-orange">
            &lt;
          </Button>
          <h1 className="text-2xl font-semibold text-itau-gray-darker">Realizar Transferência</h1>
        </header>

        {loading && <p className="text-center">Carregando contas...</p>}
        {error && !loading && <p className="text-center text-itau-error">{error}</p>}

        {!loading && accounts.length > 0 && (
          <Card className="bg-white shadow-sm">
            <CardContent className="pt-6">
              <form onSubmit={handleTransfer} className="space-y-6">
                {/* Source Account Selection */}
                <div className="space-y-2">
                  <Label htmlFor="sourceAccount">Conta de Origem</Label>
                  <Select value={sourceAccountId} onValueChange={setSourceAccountId} disabled={accounts.length <= 1}>
                    <SelectTrigger id="sourceAccount" className="border-itau-gray-medium focus:border-itau-orange focus:ring-itau-orange">
                      <SelectValue placeholder="Selecione a conta" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map((acc) => (
                        <SelectItem key={acc.id} value={acc.id.toString()}>
                          Conta {acc.account_number} (Saldo: R$ {parseFloat(acc.balance).toLocaleString('pt-BR', { minimumFractionDigits: 2 })})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {sourceAccountId && (
                     <p className="text-xs text-itau-gray-dark mt-1">Saldo disponível: R$ {parseFloat(selectedAccountBalance).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  )}
                </div>

                {/* Destination Account */}
                <div className="space-y-2">
                  <Label htmlFor="destinationAccount">Conta de Destino</Label>
                  <Input 
                    id="destinationAccount" 
                    type="text" 
                    placeholder="Número da conta"
                    value={destinationAccountNumber}
                    onChange={(e) => setDestinationAccountNumber(e.target.value)}
                    required 
                    className="border-itau-gray-medium focus:border-itau-orange focus:ring-itau-orange"
                    disabled={submitting}
                  />
                </div>

                {/* Amount */}
                <div className="space-y-2">
                  <Label htmlFor="amount">Valor (R$)</Label>
                  <Input 
                    id="amount" 
                    type="text" 
                    inputMode="decimal" 
                    placeholder="0,00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value.replace(/[^0-9,]/g, ''))} 
                    required 
                    className="border-itau-gray-medium focus:border-itau-orange focus:ring-itau-orange"
                    disabled={submitting}
                  />
                </div>

                {/* Description (Optional) */}
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição (Opcional)</Label>
                  <Input 
                    id="description" 
                    type="text" 
                    placeholder="Ex: Aluguel"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border-itau-gray-medium focus:border-itau-orange focus:ring-itau-orange"
                    disabled={submitting}
                  />
                </div>

                {error && (
                  <p className="text-sm text-itau-error text-center">{error}</p>
                )}
                {successMessage && (
                  <p className="text-sm text-itau-success text-center">{successMessage}</p>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-itau-orange hover:bg-opacity-90 text-white" 
                  disabled={submitting || !sourceAccountId}
                >
                  {submitting ? 'Transferindo...' : 'Confirmar Transferência'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TransferPage;

