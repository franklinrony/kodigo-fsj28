import React, { useState, useEffect } from 'react';
import { Plus, Calendar, Eye, X } from 'lucide-react';
import { getReservations } from '../../services/BookingsService';
import Modal from '../Common/Modal';
import ReservationForm from './ReservationForm';
import ReservationDetails from './ReservationDetails';
import { Reservation } from '../../types';
import Spinner from '../Common/Spinner';

const ReservationList: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const reservationsPerPage = 10;

  useEffect(() => {
    setLoading(true);
    getReservations().then(res => {
      setReservations(res);
      setLoading(false);
    });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800 border border-green-300';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 border border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toUpperCase()) {
      case 'CONFIRMED':
        return 'Confirmada';
      case 'CANCELLED':
        return 'Cancelada';
      default:
        return status;
    }
  };

  const handleViewDetails = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsDetailsModalOpen(true);
  };

  const handleStatusChange = async () => {
    setLoading(true);
    const updated = await getReservations();
    setReservations(updated);
    setLoading(false);
  };

  const handleCreated = async () => {
    setLoading(true);
    const updated = await getReservations();
    setReservations(updated);
    setLoading(false);
    setIsFormModalOpen(false);
  };

  const totalPages = Math.ceil(reservations.length / reservationsPerPage);
  const paginatedReservations = reservations.slice(
    (currentPage - 1) * reservationsPerPage,
    currentPage * reservationsPerPage
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reservaciones</h1>
        <button
          onClick={() => setIsFormModalOpen(true)}
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Nueva Reservación</span>
        </button>
      </div>

      {loading ? (
        <Spinner className="my-10" />
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Huésped
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Alojamiento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fechas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedReservations.map((reservation) => (
                  <tr key={reservation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {reservation.guestName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {reservation.guestEmail}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {reservation.accommodationName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {new Date(reservation.checkIn).toLocaleDateString()} - {new Date(reservation.checkOut).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(reservation.status)}`}>
                        {getStatusText(reservation.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${reservation.totalAmount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewDetails(reservation)}
                        className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Ver detalles</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:hidden space-y-4 p-2">
            {paginatedReservations.map((reservation) => (
              <div key={reservation.id} className="bg-gray-50 rounded-lg shadow p-4 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium text-gray-900">{reservation.guestName}</div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(reservation.status)}`}>
                    {getStatusText(reservation.status)}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mb-1">{reservation.guestEmail}</div>
                <div className="text-sm text-gray-900 font-semibold">{reservation.accommodationName}</div>
                <div className="flex items-center text-xs text-gray-700">
                  <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                  {new Date(reservation.checkIn).toLocaleDateString()} - {new Date(reservation.checkOut).toLocaleDateString()}
                </div>
                <div className="text-sm text-gray-900">Total: <span className="font-bold">${reservation.totalAmount}</span></div>
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => handleViewDetails(reservation)}
                    className="text-blue-600 hover:text-blue-800 flex items-center space-x-1 text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Ver detalles</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center my-4 space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
              >
                Anterior
              </button>
              <span className="mx-2">Página {currentPage} de {totalPages}</span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      )}

      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title="Nueva Reservación"
        size="lg"
        loading={loading}
      >
        <ReservationForm onClose={() => setIsFormModalOpen(false)} onCreated={handleCreated} />
      </Modal>

      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title="Detalles de la Reservación"
        size="md"
        loading={loading}
      >
        {selectedReservation && (
          <ReservationDetails
            reservation={selectedReservation}
            onClose={() => setIsDetailsModalOpen(false)}
            onStatusChange={handleStatusChange}
          />
        )}
      </Modal>
    </div>
  );
};

export default ReservationList;