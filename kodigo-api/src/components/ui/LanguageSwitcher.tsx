import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{language.toUpperCase()}</span>
      </button>
      
      <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-1">
          <button
            onClick={() => setLanguage('en')}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
              language === 'en' ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
            }`}
          >
            🇺🇸 English
          </button>
          <button
            onClick={() => setLanguage('es')}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
              language === 'es' ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
            }`}
          >
            🇪🇸 Español
          </button>
        </div>
      </div>
    </div>
  );
};