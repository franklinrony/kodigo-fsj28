import React, { useEffect, useState } from 'react';
import { getReservations, getReservationsByCalendar } from '../../services/BookingsService';
import { getAccommodationById, getAccommodations } from '../../services/AccommodationsService';
import { getUsers } from '../../services/UsersService';
import { Reservation, Accommodation, User } from '../../types';
import Spinner from '../Common/Spinner';

const ReservationsByDate: React.FC = () => {
  const [allReservations, setAllReservations] = useState<Reservation[]>([]);
  const [selectedAccommodation, setSelectedAccommodation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [results, setResults] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{startDate?: string; endDate?: string}>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [accommodationCache, setAccommodationCache] = useState<{[id: string]: Accommodation}>({});
  const [userCache, setUserCache] = useState<{[id: string]: User}>({});
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    getReservations().then(setAllReservations);
    getAccommodations().then(setAccommodations);
    getUsers().then(users => {
      const cache: {[id: string]: User} = {};
      users.forEach(u => { cache[String(u.id)] = u; });
      setUserCache(cache);
    });
  }, []);

  const validateDates = () => {
    const newErrors: {startDate?: string; endDate?: string} = {};
    if (endDate && endDate < startDate) {
      newErrors.endDate = 'La fecha de fin no puede ser menor a la de inicio.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchAccommodations = async (accommodationIds: string[]) => {
    const cache = { ...accommodationCache };
    const missing = accommodationIds.filter(id => !cache[id]);
    await Promise.all(missing.map(async id => {
      const acc = await getAccommodationById(Number(id));
      cache[id] = acc;
    }));
    setAccommodationCache(cache);
    return cache;
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    if (!selectedAccommodation || !startDate || !endDate) return;
    if (!validateDates()) return;
    setLoading(true);
    try {
      let res = await getReservationsByCalendar(selectedAccommodation, startDate, endDate);
      if (selectedStatus !== 'all') {
        res = res.filter(r => r.status === selectedStatus);
      }
      setResults(res);
      // fetch alojamiento y usuario para todos los resultados
      const accIds = Array.from(new Set(res.map(r => r.accommodationId)));
      await fetchAccommodations(accIds);
    } catch (err: any) {
      setResults([]);
      const msg = (err.message || '').toLowerCase();
      if (msg.includes('3 meses') || msg.includes('3 months') || msg.includes('date range')) {
        setApiError('El rango de fechas no puede exceder tres meses.');
      } else {
        setApiError(err.message || 'Error al consultar reservaciones.');
      }
    }
    setLoading(false);
  };

  function formatDate(dateStr: string) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('es-ES');
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Ver reservaciones por fechas</h1>
      <form onSubmit={handleSearch} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Alojamiento</label>
          <select
            value={selectedAccommodation}
            onChange={e => setSelectedAccommodation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Seleccionar alojamiento</option>
            {accommodations.map(acc => (
              <option key={acc.id} value={acc.id}>{acc.id + '-' + acc.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Todos los estados</option>
            <option value="confirmed">Confirmada</option>
            <option value="cancelled">Cancelada</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de inicio</label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de fin</label>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              min={startDate || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            Buscar
          </button>
        </div>
      </form>
      <div className="mt-8">
        {apiError && <p className="text-red-500 text-center mb-4">{apiError}</p>}
        {loading ? (
          <Spinner className="my-10" />
        ) : results.length > 0 ? (
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Reservaciones encontradas</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Huésped</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Alojamiento</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Fechas</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.map(r => (
                  <tr key={r.id}>
                    <td className="px-4 py-2">
                      {r.user_id && userCache[r.user_id]?.name || r.guestName || r.user_id || '-'}
                    </td>
                    <td className="px-4 py-2">{accommodationCache[r.accommodationId]?.name || r.accommodationName || r.accommodationId || '-'}</td>
                    <td className="px-4 py-2">{formatDate(r.checkIn)} - {formatDate(r.checkOut)}</td>
                    <td className="px-4 py-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${r.status === 'confirmed' ? 'bg-green-100 text-green-800' : r.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                        {r.status === 'confirmed' ? 'Confirmada' : r.status === 'cancelled' ? 'Cancelada' : r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center">No se encontraron reservaciones en las fechas seleccionadas.</p>
        )}
      </div>
    </div>
  );
};

export default ReservationsByDate; 