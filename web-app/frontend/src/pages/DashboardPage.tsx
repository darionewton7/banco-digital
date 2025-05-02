import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRightLeft, History, UserCircle, LogOut } from 'lucide-react'; // Added LogOut icon
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth
import { getMyAccounts } from '@/services/accountService';
import { getTransactions } from '@/services/transactionService';

// Define interfaces for data types
interface Account {
  id: number;
  account_number: string;
  balance: string;
}

interface Transaction {
  id: number;
  type: string;
  amount: string;
  description: string | null;
  timestamp: string;
}

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth(); // Get user and logout from context
  const [account, setAccount] = useState<Account | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true); // Start loading true
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        // Should be handled by ProtectedRoute, but as a safeguard
        setLoading(false);
        return;
      }
      setLoading(true);
      setError('');
      try {
        const accountsData = await getMyAccounts();
        if (accountsData && accountsData.length > 0) {
          const currentAccount = accountsData[0]; // Assuming one account
          setAccount(currentAccount);
          const transactionsData = await getTransactions(currentAccount.id);
          setTransactions(transactionsData.slice(0, 5)); // Show recent 5
        } else {
          setError('Nenhuma conta encontrada.');
        }
      } catch (err: any) {
        console.error('Failed to fetch dashboard data:', err);
        setError('Erro ao carregar dados do dashboard.');
        if (err.response?.status === 401) {
          // If unauthorized, trigger logout which might redirect via ProtectedRoute
          await logout(); 
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, logout]); // Depend on user and logout

  const handleLogout = async () => {
    await logout();
    // Navigation should be handled by ProtectedRoute after context updates
    // navigate('/login'); 
  };

  const formatCurrency = (value: string) => {
    try {
      const number = parseFloat(value);
      if (isNaN(number)) return '0,00';
      return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
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
      {loading && <p className="text-center">Carregando...</p>}
      {error && <p className="text-center text-itau-error">{error}</p>}
      
      {!loading && !error && user && account && (
        <div className="max-w-4xl mx-auto space-y-6">
          <header className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-itau-gray-darker">Olá, {user.username}!</h1>
            <Button variant="ghost" size="icon" onClick={handleLogout} title="Sair">
              <LogOut className="h-5 w-5 text-itau-orange" />
            </Button>
          </header>

          {/* Balance Card */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-normal text-itau-gray-dark">Saldo disponível</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-itau-orange">{formatCurrency(account.balance)}</p>
              <p className="text-xs text-itau-gray-dark mt-1">Conta {account.account_number}</p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-24 border-itau-gray-medium bg-white text-itau-gray-darker hover:bg-itau-gray-light"
              onClick={() => navigate('/transfer')}
            >
              <ArrowRightLeft className="h-6 w-6 mb-1 text-itau-orange" />
              Transferir
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-24 border-itau-gray-medium bg-white text-itau-gray-darker hover:bg-itau-gray-light"
              onClick={() => navigate('/history')}
            >
              <History className="h-6 w-6 mb-1 text-itau-orange" />
              Histórico
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-24 border-itau-gray-medium bg-white text-itau-gray-darker hover:bg-itau-gray-light"
              onClick={() => alert('Perfil ainda não implementado')}
            >
              <UserCircle className="h-6 w-6 mb-1 text-itau-orange" />
              Perfil
            </Button>
          </div>

          {/* Recent Transactions */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-itau-gray-darker">Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent>
              {transactions.length > 0 ? (
                <ul className="space-y-3">
                  {transactions.map((tx) => (
                    <li key={tx.id} className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-itau-gray-darker">{tx.description || tx.type}</p>
                        <p className="text-xs text-itau-gray-dark">{formatDate(tx.timestamp)}</p>
                      </div>
                      <p className={`text-sm font-semibold ${tx.type.includes('credit') || tx.type.includes('in') ? 'text-itau-success' : 'text-itau-error'}`}>
                        {tx.type.includes('credit') || tx.type.includes('in') ? '+' : '-'} {formatCurrency(tx.amount)}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-itau-gray-dark">Nenhuma atividade recente.</p>
              )}
              {transactions.length > 0 && (
                 <Button variant="link" className="mt-4 px-0 text-itau-orange" onClick={() => navigate('/history')}>Ver histórico completo</Button>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;

