import React, { useState, useEffect } from 'react';
import { getAccommodations } from '../../services/AccommodationsService';
import { addReservation, BookingPayload } from '../../services/BookingsService';
import { Accommodation } from '../../types';
import { useAuth } from '../../services/AuthService';
import Spinner from '../Common/Spinner';

interface ReservationFormProps {
  onClose: () => void;
  onCreated?: () => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ onClose, onCreated }) => {
  const { user } = useAuth();
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [formData, setFormData] = useState<{
    accommodationId: string;
    guestName: string;
    guestEmail: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    totalAmount: number;
    status: 'confirmed' | 'cancelled';
  }>({
    accommodationId: '',
    guestName: user?.name || '',
    guestEmail: user?.email || '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    totalAmount: 0,
    status: 'confirmed',
  });
  const [errors, setErrors] = useState<{checkIn?: string; checkOut?: string}>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAccommodations().then(setAccommodations);
  }, []);

  const today = new Date().toISOString().split('T')[0];

  const validateDates = () => {
    const newErrors: {checkIn?: string; checkOut?: string} = {};
    if (formData.checkIn && formData.checkIn < today) {
      newErrors.checkIn = 'La fecha de inicio no puede ser menor a hoy.';
    }
    if (formData.checkOut && formData.checkOut < formData.checkIn) {
      newErrors.checkOut = 'La fecha de fin no puede ser menor a la de inicio.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateDates()) return;
    setLoading(true);
    const accommodation = accommodations.find(acc => acc.id === Number(formData.accommodationId));
    if (!accommodation) { setLoading(false); return; }
    const userIdNumber = user && !isNaN(Number(user.id)) ? Number(user.id) : undefined;
    const payload: BookingPayload = {
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      totalAmount: formData.totalAmount,
      status: formData.status,
      accommodationId: formData.accommodationId,
      guests: formData.guests,
      user_id: userIdNumber
    };
    await addReservation(payload);
    setLoading(false);
    if (onCreated) onCreated();
    else onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 1 : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 relative">
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-80 z-20 flex items-center justify-center">
          <Spinner />
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Alojamiento
        </label>
        <select
          name="accommodationId"
          value={formData.accommodationId}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="">Seleccionar alojamiento</option>
          {accommodations.map((accommodation) => (
            <option key={accommodation.id} value={accommodation.id}>
              {accommodation.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Huésped
        </label>
        <input
          type="text"
          name="guestName"
          value={formData.guestName}
          disabled
          placeholder="Nombre del huésped"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-100 cursor-not-allowed"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email del Huésped
        </label>
        <input
          type="email"
          name="guestEmail"
          value={formData.guestEmail}
          disabled
          placeholder="email@ejemplo.com"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-100 cursor-not-allowed"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fecha de inicio
          </label>
          <input
            type="date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleInputChange}
            min={today}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
          {errors.checkIn && <p className="text-red-500 text-xs mt-1">{errors.checkIn}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fecha de fin
          </label>
          <input
            type="date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleInputChange}
            min={formData.checkIn || today}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
          {errors.checkOut && <p className="text-red-500 text-xs mt-1">{errors.checkOut}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Número de Huéspedes
        </label>
        <input
          type="number"
          name="guests"
          value={formData.guests}
          onChange={handleInputChange}
          min="1"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Total a pagar ($)
        </label>
        <input
          type="number"
          name="totalAmount"
          value={formData.totalAmount}
          onChange={handleInputChange}
          min="0"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Estado de la reservación
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="confirmed">Confirmada</option>
          <option value="cancelled">Cancelada</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          disabled={loading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
          disabled={loading}
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default ReservationForm;