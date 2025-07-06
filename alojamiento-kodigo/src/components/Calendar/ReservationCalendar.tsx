import React, { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Filter, Plus } from 'lucide-react';
import { getReservations } from '../../services/BookingsService';
import { getAccommodations } from '../../services/AccommodationsService';
import Modal from '../Common/Modal';
import ReservationForm from '../Reservations/ReservationForm';
import { Reservation, Accommodation } from '../../types';

const ReservationCalendar: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedAccommodation, setSelectedAccommodation] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchGuest, setSearchGuest] = useState('');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  useEffect(() => {
    getReservations().then(setReservations);
    getAccommodations().then(setAccommodations);
  }, []);

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const filteredReservations = useMemo(() => {
    return reservations.filter(reservation => {
      const matchesAccommodation = selectedAccommodation === 'all' || reservation.accommodationId === selectedAccommodation;
      const matchesStatus = selectedStatus === 'all' || reservation.status === selectedStatus;
      const matchesGuest = !searchGuest || reservation.guestName.toLowerCase().includes(searchGuest.toLowerCase());
      
      const reservationStart = new Date(reservation.checkIn);
      const reservationEnd = new Date(reservation.checkOut);
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      
      return matchesAccommodation && matchesStatus && matchesGuest &&
        ((reservationStart.getMonth() === currentMonth && reservationStart.getFullYear() === currentYear) ||
         (reservationEnd.getMonth() === currentMonth && reservationEnd.getFullYear() === currentYear) ||
         (reservationStart < new Date(currentYear, currentMonth, 1) && reservationEnd > new Date(currentYear, currentMonth + 1, 0)));
    });
  }, [reservations, selectedAccommodation, selectedStatus, searchGuest, currentDate]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getReservationsForDate = (date: Date) => {
    if (!date) return [];
    
    return filteredReservations.filter(reservation => {
      const start = new Date(reservation.checkIn);
      const end = new Date(reservation.checkOut);
      return date >= start && date < end;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h1>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filtros</span>
          </div>
          <button
            onClick={() => setIsFormModalOpen(true)}
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Reservación</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Alojamiento</label>
          <select
            value={selectedAccommodation}
            onChange={(e) => setSelectedAccommodation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Todos los alojamientos</option>
            {accommodations.map((accommodation) => (
              <option key={accommodation.id} value={accommodation.id}>
                {accommodation.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Todos los estados</option>
            <option value="CONFIRMED">Confirmada</option>
            <option value="CANCELLED">Cancelada</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Buscar huésped</label>
          <input
            type="text"
            value={searchGuest}
            onChange={(e) => setSearchGuest(e.target.value)}
            placeholder="Nombre del huésped..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-7 gap-0 bg-gray-50">
          {dayNames.map((day) => (
            <div key={day} className="p-3 text-center text-sm font-medium text-gray-700 border-r border-gray-200 last:border-r-0">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-0">
          {days.map((date, index) => (
            <div
              key={index}
              className={`min-h-[120px] p-2 border-r border-b border-gray-200 last:border-r-0 ${
                date ? 'bg-white' : 'bg-gray-50'
              }`}
            >
              {date && (
                <>
                  <div className="text-sm font-medium text-gray-900 mb-2">
                    {date.getDate()}
                  </div>
                  <div className="space-y-1">
                    {getReservationsForDate(date).slice(0, 2).map((reservation) => (
                      <div
                        key={reservation.id}
                        className={`text-xs p-1 rounded border ${getStatusColor(reservation.status)} truncate`}
                        title={`${reservation.guestName} - ${reservation.accommodationName}`}
                      >
                        <div className="font-medium truncate">{reservation.guestName}</div>
                        <div className="truncate">{reservation.accommodationName}</div>
                      </div>
                    ))}
                    {getReservationsForDate(date).length > 2 && (
                      <div className="text-xs text-gray-500 font-medium">
                        +{getReservationsForDate(date).length - 2} más
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
            <span className="text-sm text-gray-700">Confirmada</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded"></div>
            <span className="text-sm text-gray-700">Pendiente</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
            <span className="text-sm text-gray-700">Cancelada</span>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title="Nueva Reservación"
        size="lg"
      >
        <ReservationForm onClose={() => setIsFormModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default ReservationCalendar;