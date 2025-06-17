import React, { useState } from 'react';
import { Menu, Search, Bell, User } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
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
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Bell size={20} />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;