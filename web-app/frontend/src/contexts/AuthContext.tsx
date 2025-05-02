import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { getCurrentUser as fetchCurrentUser } from '@/services/authService';
import { logoutUser as apiLogout } from '@/services/authService';

// Define the shape of the user object and context
interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User) => void; // Function to update user state on login
  logout: () => Promise<void>; // Function to handle logout
  checkAuth: () => Promise<void>; // Function to check auth status on load
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start loading until auth check is done

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const userData = await fetchCurrentUser();
      setUser(userData);
    } catch (error) {
      console.log('Not authenticated or error fetching user:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Check authentication status when the provider mounts
  useEffect(() => {
    checkAuth();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await apiLogout();
    } catch (error) {
      console.error('Logout API call failed:', error);
      // Still proceed with client-side logout
    } finally {
      setUser(null);
      setIsLoading(false);
      // Optionally redirect to login page here or let ProtectedRoute handle it
      // window.location.href = '/login'; 
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

