import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Bootcamp } from '../../types/bootcamp';
import { PreregistrationData } from '../../types/preregistration';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { 
  X, 
  CheckCircle, 
  Clock, 
  Users, 
  Monitor, 
  Wifi, 
  Calendar,
  Phone,
  MessageSquare,
  Award
} from 'lucide-react';
import Swal from 'sweetalert2';

interface PreregistrationModalProps {
  bootcamp: Bootcamp;
  isOpen: boolean;
  onClose: () => void;
}

export const PreregistrationModal: React.FC<PreregistrationModalProps> = ({
  bootcamp,
  isOpen,
  onClose,
}) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PreregistrationData>();

  const timeSlots = [
    { id: 'morning', label: t('time.morning') },
    { id: 'afternoon', label: t('time.afternoon') },
    { id: 'evening', label: t('time.evening') },
  ];

  const requirements = [
    { icon: Monitor, text: t('preregister.requirements.basic') },
    { icon: Wifi, text: t('preregister.requirements.internet') },
    { icon: Clock, text: t('preregister.requirements.time') },
    { icon: Monitor, text: t('preregister.requirements.equipment') },
    { icon: Award, text: t('preregister.requirements.english') },
  ];

  const scheduleInfo = [
    { icon: Calendar, text: t('preregister.schedule.classes') },
    { icon: Clock, text: t('preregister.schedule.time') },
    { icon: Users, text: t('preregister.schedule.weekend') },
    { icon: CheckCircle, text: t('preregister.schedule.flexible') },
  ];

  const onSubmit = async (data: PreregistrationData) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message with SweetAlert
      await Swal.fire({
        title: t('preregister.success.title'),
        html: `
          <div class="text-left">
            <p class="mb-4">${t('preregister.success.message')}</p>
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-semibold text-blue-800 mb-2">${t('preregister.success.next')}</h4>
              <ul class="text-sm text-blue-700 space-y-1">
                <li>${t('preregister.success.step1')}</li>
                <li>${t('preregister.success.step2')}</li>
                <li>${t('preregister.success.step3')}</li>
              </ul>
            </div>
          </div>
        `,
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3B82F6',
        customClass: {
          popup: 'text-left'
        }
      });
      
      reset();
      onClose();
    } catch (error) {
      await Swal.fire({
        title: t('preregister.error.title'),
        text: t('preregister.error.message'),
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#EF4444',
      });
    } finally {
      setLoading(false);
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {t('preregister.title')} {bootcamp.name}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Requirements */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                {t('preregister.requirements')}
              </h3>
              <ul className="space-y-3">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-center text-blue-800">
                    <req.icon className="w-4 h-4 mr-3 text-blue-600" />
                    <span className="text-sm">{req.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Schedule */}
            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                {t('preregister.schedule')}
              </h3>
              <ul className="space-y-3">
                {scheduleInfo.map((info, index) => (
                  <li key={index} className="flex items-center text-green-800">
                    <info.icon className="w-4 h-4 mr-3 text-green-600" />
                    <span className="text-sm">{info.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Contact Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                {t('preregister.contact')}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  label={t('preregister.phone')}
                  type="tel"
                  placeholder={t('preregister.phone.placeholder')}
                  {...register('phone', {
                    required: t('validation.phone.required'),
                    pattern: {
                      value: /^[\+]?[1-9][\d]{0,15}$/,
                      message: t('validation.phone.invalid'),
                    },
                  })}
                  error={errors.phone?.message}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('preregister.contact.time')}
                  </label>
                  <select
                    {...register('preferredContactTime', {
                      required: t('validation.contact.time.required'),
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select time...</option>
                    {timeSlots.map((slot) => (
                      <option key={slot.id} value={slot.id}>
                        {slot.label}
                      </option>
                    ))}
                  </select>
                  {errors.preferredContactTime && (
                    <p className="text-sm text-red-600 mt-1">{errors.preferredContactTime.message}</p>
                  )}
                </div>
              </div>

              <Input
                label={t('preregister.contact.date')}
                type="date"
                min={getTomorrowDate()}
                {...register('contactDate', {
                  required: t('validation.contact.date.required'),
                })}
                error={errors.contactDate?.message}
              />
            </div>

            {/* Motivation and Experience */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('preregister.motivation')}
                </label>
                <textarea
                  {...register('motivation', {
                    required: t('validation.motivation.required'),
                    minLength: {
                      value: 20,
                      message: t('validation.motivation.min'),
                    },
                  })}
                  placeholder={t('preregister.motivation.placeholder')}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                {errors.motivation && (
                  <p className="text-sm text-red-600 mt-1">{errors.motivation.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('preregister.experience')}
                </label>
                <textarea
                  {...register('experience')}
                  placeholder={t('preregister.experience.placeholder')}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-yellow-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-yellow-900 mb-4 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                {t('preregister.terms')}
              </h3>
              <p className="text-sm text-yellow-800 mb-4">
                {t('preregister.terms.content')}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <input
                    id="acceptedTerms"
                    type="checkbox"
                    {...register('acceptedTerms', {
                      required: t('validation.terms.required'),
                    })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
                  />
                  <label htmlFor="acceptedTerms" className="ml-2 text-sm text-yellow-800">
                    {t('preregister.terms.accept')}
                  </label>
                </div>
                {errors.acceptedTerms && (
                  <p className="text-sm text-red-600">{errors.acceptedTerms.message}</p>
                )}

                <div className="flex items-start">
                  <input
                    id="acceptedSchedule"
                    type="checkbox"
                    {...register('acceptedSchedule', {
                      required: t('validation.schedule.required'),
                    })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
                  />
                  <label htmlFor="acceptedSchedule" className="ml-2 text-sm text-yellow-800">
                    {t('preregister.schedule.accept')}
                  </label>
                </div>
                {errors.acceptedSchedule && (
                  <p className="text-sm text-red-600">{errors.acceptedSchedule.message}</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={loading}
              >
                {t('preregister.cancel')}
              </Button>
              <Button
                type="submit"
                loading={loading}
                className="flex-1"
              >
                {t('preregister.submit')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};