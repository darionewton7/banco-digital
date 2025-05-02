import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { loginUser } from '@/services/authService'; // Import loginUser API call
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth hook

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await loginUser({ email, password });
      console.log('Login successful:', response);
      
      if (response.user) {
        login(response.user); // Update auth context state
        navigate('/dashboard'); // Redirect to dashboard on successful login
      } else {
        // Should not happen if API is correct, but handle just in case
        setError('Falha no login. Usuário não retornado.');
      }

    } catch (err: any) {
      console.error('Login failed:', err);
      setError(err.response?.data?.error || 'Falha no login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-itau-gray-light">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          {/* Placeholder for Itaú logo? */}
          <CardTitle className="text-2xl font-bold text-itau-orange">Bem-vindo</CardTitle>
          <CardDescription>Acesse sua conta</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="seuemail@exemplo.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                className="border-itau-gray-medium focus:border-itau-orange focus:ring-itau-orange"
                disabled={loading} // Disable input while loading
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Sua senha" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                className="border-itau-gray-medium focus:border-itau-orange focus:ring-itau-orange"
                disabled={loading} // Disable input while loading
              />
            </div>
            {error && (
              <p className="text-sm text-itau-error">{error}</p>
            )}
            <Button 
              type="submit" 
              className="w-full bg-itau-orange hover:bg-opacity-90 text-white" 
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm">
          <p>Não tem uma conta?{' '}
            <a href="/register" className="text-itau-orange hover:underline">
              Cadastre-se
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;

