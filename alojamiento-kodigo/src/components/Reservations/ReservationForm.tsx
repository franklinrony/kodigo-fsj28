import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

interface ReservationFormProps {
  onClose: () => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ onClose }) => {
  const { accommodations, addReservation } = useApp();
  const [formData, setFormData] = useState({
    accommodationId: '',
    guestName: '',
    guestEmail: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const accommodation = accommodations.find(acc => acc.id === formData.accommodationId);
    if (!accommodation) return;

    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalAmount = nights * accommodation.pricePerNight;

    addReservation({
      accommodationId: formData.accommodationId,
      accommodationName: accommodation.name,
      guestName: formData.guestName,
      guestEmail: formData.guestEmail,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      status: 'confirmed',
      totalAmount,
      guests: formData.guests
    });
    
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 1 : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
              {accommodation.name} - ${accommodation.pricePerNight}/noche
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
          onChange={handleInputChange}
          placeholder="Nombre del huésped"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
          onChange={handleInputChange}
          placeholder="email@ejemplo.com"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
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

      <div className="flex justify-end space-x-3 pt-6 border-t">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default ReservationForm;