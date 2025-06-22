import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Bootcamp } from '../../types/bootcamp';
import { PreregistrationModal } from './PreregistrationModal';
import { Button } from '../ui/Button';
import { Calendar, Users, Clock, DollarSign, Star, UserPlus } from 'lucide-react';
import Swal from 'sweetalert2';

interface BootcampCardProps {
  bootcamp: Bootcamp;
  showDetails?: boolean;
}

export const BootcampCard: React.FC<BootcampCardProps> = ({ 
  bootcamp, 
  showDetails = false 
}) => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [showPreregistrationModal, setShowPreregistrationModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
      case 'Activo':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Upcoming':
      case 'Próximo':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Completed':
      case 'Completado':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
      case 'Principiante':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
      case 'Intermedio':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
      case 'Avanzado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePreregister = () => {
    if (!isAuthenticated) {
      Swal.fire({
        title: t('bootcamp.login.required'),
        text: t('bootcamp.login.message'),
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3B82F6',
      });
      return;
    }
    setShowPreregistrationModal(true);
  };

  // Use display values if available, otherwise use original values
  const displayStatus = bootcamp.displayStatus || bootcamp.status;
  const displayLevel = bootcamp.displayLevel || bootcamp.level;

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group hover:-translate-y-1">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {bootcamp.name}
              </h3>
              <div className="flex items-center space-x-2 mb-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(displayStatus)}`}>
                  {displayStatus}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(displayLevel)}`}>
                  {displayLevel}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                ${bootcamp.price.toLocaleString()}
              </div>
            </div>
          </div>

          <p className="text-gray-600 mb-4 line-clamp-3">
            {bootcamp.description}
          </p>

          <div className="space-y-3 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2 text-gray-400" />
              <span>{bootcamp.duration}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
              <span>{new Date(bootcamp.startDate).toLocaleDateString()} - {new Date(bootcamp.endDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Users className="w-4 h-4 mr-2 text-gray-400" />
              <span>{bootcamp.currentStudents}/{bootcamp.maxStudents} {t('bootcamp.students')}</span>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">{t('bootcamp.technologies')}:</p>
            <div className="flex flex-wrap gap-2">
              {bootcamp.technologies.slice(0, showDetails ? bootcamp.technologies.length : 3).map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
              {!showDetails && bootcamp.technologies.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                  +{bootcamp.technologies.length - 3} {t('bootcamp.more')}
                </span>
              )}
            </div>
          </div>

          {showDetails && (
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-gray-400" />
                  <span>{t('bootcamp.instructor')}: {bootcamp.instructor}</span>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${(bootcamp.currentStudents / bootcamp.maxStudents) * 100}%`,
                }}
              />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500">
                {Math.round((bootcamp.currentStudents / bootcamp.maxStudents) * 100)}% {t('bootcamp.filled')}
              </p>
              <Button
                size="sm"
                onClick={handlePreregister}
                className="flex items-center space-x-1"
                disabled={bootcamp.status === 'Completed' || bootcamp.displayStatus === 'Completado'}
              >
                <UserPlus className="w-4 h-4" />
                <span>{t('bootcamp.preregister')}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <PreregistrationModal
        bootcamp={bootcamp}
        isOpen={showPreregistrationModal}
        onClose={() => setShowPreregistrationModal(false)}
      />
    </>
  );
};