import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import HistoryPage from './pages/HistoryPage';
import TransferPage from './pages/TransferPage';
import { useAuth } from './contexts/AuthContext'; // Import useAuth
import './App.css';

// Updated Protected Route component using useAuth
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // Optional: Show a loading spinner while checking auth
    return <div>Verificando autenticação...</div>; 
  }

  if (!isAuthenticated) {
    // Redirect them to the /login page
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Component for public routes that should redirect if logged in
const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Verificando autenticação...</div>; 
  }

  if (isAuthenticated) {
    // Redirect them to the /dashboard page if already logged in
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public Routes (redirect if logged in) */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route 
          path="/register" 
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/history" 
          element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/transfer" 
          element={
            <ProtectedRoute>
              <TransferPage />
            </ProtectedRoute>
          }
        />

        {/* Default route - redirect based on auth state */}
        <Route 
          path="*" 
          element={
            isLoading ? <div>Carregando...</div> : 
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

