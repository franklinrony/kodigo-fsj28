import { Reservation } from '../types';
import { API_BASE_URL } from '../main';
import axios from '../interceptor/httpInterceptor';

export const getReservations = async (): Promise<Reservation[]> => {
  const res = await axios.get(`${API_BASE_URL}/api/V1/bookings`);
  return res.data.map((item: any) => ({
    id: String(item.id),
    accommodationId: String(item.accomodation_id || item.accomodation?.id || ''),
    accommodationName: item.accomodation || item.accommodation || '',
    address: item.accomodation_address || item.address || '',
    guestName: item.user || '',
    guestEmail: '', // No viene en la respuesta
    checkIn: item.check_in_date || '',
    checkOut: item.check_out_date || '',
    status: (item.status || '').toLowerCase(),
    totalAmount: item.total_amount || 0,
    guests: item.guests || 1,
    user_id: item.user_id ? String(item.user_id) : ''
  }));
};

export interface BookingPayload {
  checkIn: string;
  checkOut: string;
  totalAmount: number;
  status: 'confirmed' | 'cancelled';
  accommodationId: string;
  guests: number;
  user_id?: number;
}

export const addReservation = async (reservation: BookingPayload): Promise<void> => {
  await axios.post(`${API_BASE_URL}/api/V1/booking`, {
    booking: `BK${Date.now()}`.slice(0, 10),
    check_in_date: reservation.checkIn,
    check_out_date: reservation.checkOut,
    total_amount: reservation.totalAmount,
    status: reservation.status.toUpperCase(),
    accomodation_id: Number(reservation.accommodationId),
    user_id: reservation.user_id || 1
  }, {
    headers: { 'Content-Type': 'application/json' }
  });
};

export const cancelReservation = async (id: string): Promise<void> => {
  await axios.patch(`${API_BASE_URL}/api/V1/status_booking/${id}`, { status: 'CANCELLED' }, {
    headers: { 'Content-Type': 'application/json' }
  });
};

export const updateReservation = async (id: string, reservation: Partial<Omit<Reservation, 'id'>> & { user_id?: number }): Promise<void> => {
  await axios.put(`${API_BASE_URL}/api/V1/booking/${id}`, {
    booking: `BK${Date.now()}`.slice(0, 10),
    check_in_date: reservation.checkIn,
    check_out_date: reservation.checkOut,
    total_amount: reservation.totalAmount,
    status: (reservation.status || 'confirmed').toUpperCase(),
    accomodation_id: reservation.accommodationId ? Number(reservation.accommodationId) : undefined,
    user_id: reservation.user_id || 1
  }, {
    headers: { 'Content-Type': 'application/json' }
  });
};

export const updateReservationStatus = async (id: string, status: 'CANCELLED' | 'CONFIRMED'): Promise<void> => {
  await axios.patch(`${API_BASE_URL}/api/V1/status_booking/${id}`, { status }, {
    headers: { 'Content-Type': 'application/json' }
  });
};

export const getReservationsByCalendar = async (accommodationId: string, startDate: string, endDate: string): Promise<Reservation[]> => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/V1/bookings/calendar/${accommodationId}?start_date=${startDate}&end_date=${endDate}`);
    if (res.data && typeof res.data === 'object' && 'message' in res.data) {
      return [];
    }
    return res.data.map((item: any) => ({
      id: String(item.id),
      accommodationId: String(item.accomodation_id || item.accomodation?.id || ''),
      accommodationName: item.accomodation || item.accommodation || '',
      address: item.accomodation_address || item.address || '',
      guestName: item.user || '',
      guestEmail: '',
      checkIn: item.check_in_date || '',
      checkOut: item.check_out_date || '',
      status: (item.status || '').toLowerCase(),
      totalAmount: item.total_amount || 0,
      guests: item.guests || 1,
      user_id: item.user_id ? String(item.user_id) : ''
    }));
  } catch (error: any) {
    if (error.response && error.response.status === 422 && error.response.data?.error?.includes('3 months')) {
      throw new Error('El rango de fechas seleccionado no puede exceder 3 meses. Intente con otro rango de fechas');
    }
    return [];
  }
}; 