import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { registerUser } from '@/services/authService'; // Import registerUser API call

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    // Add more validation if needed (e.g., password strength)

    setLoading(true);

    try {
      const response = await registerUser({ username, email, password });
      console.log('Registration successful:', response);

      // Redirect to login page after successful registration
      // Optionally show a success message first
      navigate('/login?registered=true'); // Add query param to show message on login page if desired

    } catch (err: any) {
      console.error('Registration failed:', err);
      setError(err.response?.data?.error || 'Falha no cadastro. Verifique os dados ou tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-itau-gray-light">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-itau-orange">Criar Conta</CardTitle>
          <CardDescription>Preencha os dados para se cadastrar</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Nome de Usuário</Label>
              <Input 
                id="username" 
                type="text" 
                placeholder="Seu nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required 
                className="border-itau-gray-medium focus:border-itau-orange focus:ring-itau-orange"
                disabled={loading}
              />
            </div>
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
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Crie uma senha (mín. 6 caracteres)" // Add hint
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                minLength={6} // Add basic validation
                className="border-itau-gray-medium focus:border-itau-orange focus:ring-itau-orange"
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required 
                className="border-itau-gray-medium focus:border-itau-orange focus:ring-itau-orange"
                disabled={loading}
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
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm">
          <p>Já tem uma conta?{' '}
            <a href="/login" className="text-itau-orange hover:underline">
              Faça login
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;

