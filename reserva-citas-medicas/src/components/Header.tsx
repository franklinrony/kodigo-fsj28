import React from 'react';
import { Stethoscope } from 'lucide-react';

interface HeaderProps {
  userRole: 'patient' | 'doctor';
  onRoleChange: (role: 'patient' | 'doctor') => void;
}

const Header: React.FC<HeaderProps> = ({ userRole, onRoleChange }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">MediCitas</h1>
              <p className="text-sm text-gray-500">
                Sistema de gestión de citas médicas
              </p>
            </div>
          </div>
          
          {/* Selector de Rol */}
          <div className="flex items-center">
            <label htmlFor="role-select" className="text-sm font-medium text-gray-700 mr-2">Vista:</label>
            <select
              id="role-select"
              value={userRole}
              onChange={(e) => onRoleChange(e.target.value as 'patient' | 'doctor')}
              className="text-sm border-gray-300 rounded-lg focus:ring-blue-500"
            >
              <option value="patient">Paciente</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;