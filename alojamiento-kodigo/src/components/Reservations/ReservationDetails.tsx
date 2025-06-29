import React from 'react';
import { Calendar, User, MapPin, Moon } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Reservation } from '../../types';

interface ReservationDetailsProps {
  reservation: Reservation;
  onClose: () => void;
}

const ReservationDetails: React.FC<ReservationDetailsProps> = ({ reservation, onClose }) => {
  const { cancelReservation } = useApp();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmada';
      case 'pending':
        return 'Pendiente';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  const calculateNights = () => {
    const checkIn = new Date(reservation.checkIn);
    const checkOut = new Date(reservation.checkOut);
    return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  };

  const handleCancel = () => {
    if (window.confirm('¿Estás seguro de que quieres cancelar esta reservación?')) {
      cancelReservation(reservation.id);
      onClose();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(reservation.status)}`}>
          {getStatusText(reservation.status)}
        </span>
        <span className="text-sm text-gray-500">ID: #{reservation.id}</span>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          {reservation.accommodationName || 'Sin nombre'}
        </h3>
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <MapPin className="w-4 h-4 mr-2" />
          Dirección no disponible
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(reservation.checkIn).toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(reservation.checkOut).toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Información del Huésped</h4>
        <div className="flex items-center text-sm text-gray-600">
          <User className="w-4 h-4 mr-2" />
          {reservation.guestName || 'Huésped no especificado'}
        </div>
        {reservation.guestEmail && (
          <div className="text-sm text-gray-600 ml-6">
            {reservation.guestEmail}
          </div>
        )}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Resumen de la Estancia</h4>
        <div className="flex items-center text-blue-600">
          <Moon className="w-4 h-4 mr-2" />
          {calculateNights()} noches
        </div>
      </div>

      <div className="flex justify-between items-center pt-6 border-t">
        {reservation.status !== 'cancelled' && (
          <button
            onClick={handleCancel}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <span>Cancelar Reservación</span>
          </button>
        )}
        <button
          onClick={onClose}
          className="ml-auto px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ReservationDetails;