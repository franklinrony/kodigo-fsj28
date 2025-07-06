import React, { ReactNode } from 'react';
import { X } from 'lucide-react';
import Spinner from './Spinner';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  loading = false
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        
        <div className={`
          inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl 
          transform transition-all sm:my-8 sm:align-middle w-full ${sizeClasses[size]} relative
        `}>
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center cursor-wait">
              <Spinner />
            </div>
          )}
          <div className={`bg-white px-6 pt-6 pb-4 ${loading ? 'pointer-events-none select-none opacity-60' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;