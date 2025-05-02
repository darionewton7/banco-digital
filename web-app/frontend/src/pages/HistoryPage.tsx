import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth
import { getMyAccounts } from '@/services/accountService';
import { getTransactions } from '@/services/transactionService';

// Define interface for Transaction
interface Transaction {
  id: number;
  type: string;
  amount: string;
  description: string | null;
  timestamp: string;
}

const HistoryPage: React.FC = () => {
  const { user, logout } = useAuth(); // Get user and logout
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError('');
      try {
        // Fetch account ID first, then transactions
        const accounts = await getMyAccounts();
        if (accounts && accounts.length > 0) {
          const accountId = accounts[0].id; // Assuming first account
          const transactionsData = await getTransactions(accountId);
          setTransactions(transactionsData);
        } else {
          setError('Nenhuma conta encontrada.');
        }
      } catch (err: any) {
        console.error('Failed to fetch transactions:', err);
        setError('Erro ao carregar histórico de transações.');
        if (err.response?.status === 401) {
          await logout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user, logout]);

  const formatCurrency = (value: string) => {
    try {
      const number = parseFloat(value);
      if (isNaN(number)) return '0,00';
      // Use Math.abs for display, sign is handled by '+' or '-'
      return Math.abs(number).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } catch {
      return 'Valor inválido';
    }
  };

  const formatDate = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleDateString('pt-BR');
    } catch {
      return 'Data inválida';
    }
  };

  return (
    <div className="min-h-screen bg-itau-gray-light p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6 flex items-center">
           <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2 text-itau-orange">
             {/* Replace with a proper back icon */}
             &lt;
           </Button>
          <h1 className="text-2xl font-semibold text-itau-gray-darker">Histórico de Transações</h1>
        </header>

        {loading && <p className="text-center">Carregando histórico...</p>}
        {error && <p className="text-center text-itau-error">{error}</p>}

        {!loading && !error && (
          <Card className="bg-white shadow-sm">
            <CardContent className="pt-6"> 
              {transactions.length > 0 ? (
                <ul className="space-y-4">
                  {transactions.map((tx) => (
                    <li key={tx.id} className="flex justify-between items-center pb-4 border-b border-itau-gray-medium last:border-b-0">
                      <div>
                        <p className="text-base font-medium text-itau-gray-darker">{tx.description || tx.type}</p>
                        <p className="text-sm text-itau-gray-dark">{formatDate(tx.timestamp)}</p>
                      </div>
                      <p className={`text-base font-semibold ${tx.type.includes('credit') || tx.type.includes('in') ? 'text-itau-success' : 'text-itau-error'}`}>
                        {tx.type.includes('credit') || tx.type.includes('in') ? '+' : '-'} R$ {formatCurrency(tx.amount)}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-itau-gray-dark py-8">Nenhuma transação encontrada.</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;

