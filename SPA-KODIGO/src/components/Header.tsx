import React, { useState } from 'react';
import { Menu, Search, Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './auth/AuthModal';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { currentUser, userProfile, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserMenu(false);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <>
      <header className="bg-black/20 backdrop-blur-xl border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Menu size={20} />
            </button>
            
            <div className="relative hidden md:block">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar canciones, artistas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-80 pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-full 
                           text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                           focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Bell size={20} />
                </button>
                
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {currentUser.photoURL ? (
                      <img
                        src={currentUser.photoURL}
                        alt="Avatar"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                        <User size={16} />
                      </div>
                    )}
                    <span className="hidden md:block text-sm font-medium">
                      {userProfile?.displayName || currentUser.displayName || 'Usuario'}
                    </span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-slate-800/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl z-60">
                      <div className="p-3 border-b border-white/10">
                        <p className="text-sm font-medium text-white">
                          {userProfile?.displayName || currentUser.displayName}
                        </p>
                        <p className="text-xs text-gray-400">{currentUser.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-left text-red-400 hover:bg-white/10 transition-colors"
                      >
                        <LogOut size={16} />
                        <span>Cerrar Sesión</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default Header;