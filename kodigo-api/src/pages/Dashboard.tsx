import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { apiService } from '../services/api';
import { Bootcamp } from '../types/bootcamp';
import { BootcampCard } from '../components/bootcamp/BootcampCard';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Button } from '../components/ui/Button';
import { 
  BookOpen, 
  Calendar, 
  Users, 
  TrendingUp,
  Award,
  Clock,
  User,
  Mail
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [bootcamps, setBootcamps] = useState<Bootcamp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBootcamps = async () => {
      try {
        const data = await apiService.getBootcamps();
        setBootcamps(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : t('api.bootcamps.failed'));
      } finally {
        setLoading(false);
      }
    };

    fetchBootcamps();
  }, [t]);

  const stats = [
    {
      icon: BookOpen,
      label: t('dashboard.programs'),
      value: bootcamps.length,
      color: 'bg-blue-500'
    },
    {
      icon: Users,
      label: t('dashboard.students'),
      value: bootcamps.reduce((acc, bootcamp) => acc + bootcamp.currentStudents, 0),
      color: 'bg-green-500'
    },
    {
      icon: Calendar,
      label: t('dashboard.bootcamps'),
      value: bootcamps.filter(b => b.status === 'Active').length,
      color: 'bg-purple-500'
    },
    {
      icon: TrendingUp,
      label: t('dashboard.success'),
      value: '94%',
      color: 'bg-orange-500'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t('dashboard.welcome')}, {user?.name}!
              </h1>
              <p className="text-gray-600">
                {t('dashboard.subtitle')}
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
                <Award className="w-12 h-12 mb-2" />
                <p className="text-sm opacity-90">{t('dashboard.journey')}</p>
                <p className="text-xl font-bold">{t('dashboard.starts')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{user?.name}</h3>
                <p className="text-gray-600 flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  {user?.email}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t('dashboard.member')}:</span>
                <span className="font-medium">
                  {new Date(user?.createdAt || '').toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t('dashboard.status')}:</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  {t('dashboard.active')}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bootcamps Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{t('dashboard.available')}</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{t('dashboard.updated')} {new Date().toLocaleDateString()}</span>
            </div>
          </div>

          {error ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                {t('common.tryagain')}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {bootcamps.map((bootcamp) => (
                <BootcampCard key={bootcamp.id} bootcamp={bootcamp} showDetails />
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">{t('dashboard.cta.title')}</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            {t('dashboard.cta.subtitle')}
          </p>
          <Button variant="secondary" size="lg">
            {t('dashboard.cta.enroll')}
          </Button>
        </div>
      </div>
    </div>
  );
};