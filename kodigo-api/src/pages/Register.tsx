import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { apiService } from '../services/api';
import { RegisterRequest } from '../types/auth';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { UserPlus, Eye, EyeOff } from 'lucide-react';

export const Register: React.FC = () => {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterRequest>();

  const password = watch('password');

  const onSubmit = async (data: RegisterRequest) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.register(data);
      login(response.token, response.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('api.register.failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">{t('register.title')}</h2>
            <p className="mt-2 text-gray-600">{t('register.subtitle')}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <Input
              label={t('register.name')}
              type="text"
              placeholder={t('register.name.placeholder')}
              {...register('name', {
                required: t('validation.name.required'),
                minLength: {
                  value: 2,
                  message: t('validation.name.min'),
                },
              })}
              error={errors.name?.message}
            />

            <Input
              label={t('register.email')}
              type="email"
              placeholder={t('register.email.placeholder')}
              {...register('email', {
                required: t('validation.email.required'),
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: t('validation.email.invalid'),
                },
              })}
              error={errors.email?.message}
            />

            <div className="relative">
              <Input
                label={t('register.password')}
                type={showPassword ? 'text' : 'password'}
                placeholder={t('register.password.placeholder')}
                {...register('password', {
                  required: t('validation.password.required'),
                  minLength: {
                    value: 6,
                    message: t('validation.password.min'),
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message: t('validation.password.pattern'),
                  },
                })}
                error={errors.password?.message}
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="relative">
              <Input
                label={t('register.confirm')}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder={t('register.confirm.placeholder')}
                {...register('confirmPassword', {
                  required: t('validation.confirm.required'),
                  validate: (value) =>
                    value === password || t('validation.confirm.match'),
                })}
                error={errors.confirmPassword?.message}
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  {...register('terms', {
                    required: t('validation.terms.required'),
                  })}
                />
              </div>
              <div className="ml-2 text-sm">
                <label htmlFor="terms" className="text-gray-600">
                  {t('register.terms')}{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    {t('register.terms.link')}
                  </a>{' '}
                  {t('register.privacy')}{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    {t('register.privacy')}
                  </a>
                </label>
                {errors.terms && (
                  <p className="text-red-600 text-xs mt-1">{errors.terms.message}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              loading={loading}
              className="w-full"
              size="lg"
            >
              {t('register.create')}
            </Button>

            <div className="text-center">
              <span className="text-gray-600">{t('register.login.text')} </span>
              <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium">
                {t('register.login.link')}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};