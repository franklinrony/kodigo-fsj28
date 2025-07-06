import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { API_BASE_URL } from '../main';
import axios from '../interceptor/httpInterceptor';
import { getUsers } from './UsersService';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export const AuthService = React.createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthService);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/V1/login`, { email, password }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = response.data;
      // Buscar el usuario real por email
      const users = await getUsers();
      const matchedUser = users.find((u: any) => u.email === data.user);
      const userData = matchedUser ? {
        id: matchedUser.id,
        email: matchedUser.email,
        name: matchedUser.name,
        token: data.token,
      } : {
        id: data.user,
        email: data.user,
        name: data.user.split('@')[0],
        token: data.token,
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', data.token);
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthService.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthService.Provider>
  );
};