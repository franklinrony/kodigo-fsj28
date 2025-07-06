import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, Calendar, Users, TrendingUp } from 'lucide-react';
import { getAccommodations } from '../services/AccommodationsService';
import { getReservations } from '../services/BookingsService';
import { Accommodation, Reservation } from '../types';

const Dashboard: React.FC = () => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAccommodations().then(setAccommodations);
    getReservations().then(setReservations);
  }, []);

  const stats = {
    totalAccommodations: accommodations.length,
    totalReservations: reservations.length,
    confirmedReservations: reservations.filter(r => r.status === 'confirmed').length,
    cancelledReservations: reservations.filter(r => r.status === 'cancelled').length,
  };

  const recentReservations = reservations
    .sort((a, b) => new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime())
    .slice(0, 5);

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Panel de Control</h1>
        <p className="text-gray-600">Resumen general del sistema de reservaciones</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Alojamientos</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalAccommodations}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Reservaciones</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalReservations}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Users className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Confirmadas</p>
              <p className="text-2xl font-bold text-gray-900">{stats.confirmedReservations}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Canceladas</p>
              <p className="text-2xl font-bold text-gray-900">{stats.cancelledReservations}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Alojamientos Recientes</h2>
            <button
              onClick={() => navigate('/accommodations')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Ver todos
            </button>
          </div>
          <div className="space-y-3">
            {accommodations.slice(0, 3).map((accommodation) => (
              <div key={accommodation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{accommodation.name}</p>
                  <p className="text-sm text-gray-600">{accommodation.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Reservaciones Recientes</h2>
            <button
              onClick={() => navigate('/reservations')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Ver todas
            </button>
          </div>
          <div className="space-y-3">
            {recentReservations.map((reservation) => (
              <div key={reservation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{reservation.guestName}</p>
                  <p className="text-sm text-gray-600">{reservation.accommodationName}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(reservation.status)}`}>
                    {getStatusText(reservation.status)}
                  </span>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(reservation.checkIn).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;