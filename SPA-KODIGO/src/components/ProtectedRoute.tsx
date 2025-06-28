import React from 'react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './auth/AuthModal';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center space-y-6 p-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Kodigo Music
          </h1>
          <p className="text-xl text-gray-300">
            Inicia sesión para acceder a tu música
          </p>
          <AuthModal isOpen={true} onClose={() => {}} />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;