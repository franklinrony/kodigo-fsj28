import React from 'react';
import { Menu } from 'lucide-react';
import { useAuth } from '../../services/AuthService';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="flex items-center space-x-4 ml-auto">
          <span className="text-gray-700">Bienvenido, {user?.name}</span>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;