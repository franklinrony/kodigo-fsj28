import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Accommodation, Reservation } from '../types';
import { API_BASE_URL } from '../main';

interface AppContextType {
  accommodations: Accommodation[];
  reservations: Reservation[];
  addAccommodation: (accommodation: Omit<Accommodation, 'id'>) => void;
  updateAccommodation: (id: string, accommodation: Partial<Accommodation>) => void;
  deleteAccommodation: (id: string) => void;
  addReservation: (reservation: Omit<Reservation, 'id'>) => void;
  updateReservation: (id: string, reservation: Partial<Reservation>) => void;
  cancelReservation: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  // Helper para obtener el token
  const getToken = () => localStorage.getItem('token');

  // Cargar alojamientos y reservas al iniciar
  useEffect(() => {
    fetchAccommodations();
    fetchReservations();
  }, []);

  // --- ALOJAMIENTOS ---
  const fetchAccommodations = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/V1/accomodations`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      if (!res.ok) return;
      const data = await res.json();
      setAccommodations(data);
    } catch {}
  };

  const addAccommodation = async (accommodation: Omit<Accommodation, 'id'>) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/V1/accomodation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(accommodation)
      });
      if (res.ok) fetchAccommodations();
    } catch {}
  };

  const updateAccommodation = async (id: string, accommodation: Partial<Accommodation>) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/V1/accomodation/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(accommodation)
      });
      if (res.ok) fetchAccommodations();
    } catch {}
  };

  const deleteAccommodation = async (id: string) => {
    // No hay endpoint DELETE, podrías implementar uno en el backend si es necesario
  };

  // --- RESERVAS ---
  const fetchReservations = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/V1/bookings`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      if (!res.ok) return;
      const data = await res.json();
      setReservations(data);
    } catch {}
  };

  const addReservation = async (reservation: Omit<Reservation, 'id'>) => {
    try {
      // Adaptar los campos al formato de la API
      const res = await fetch(`${API_BASE_URL}/api/V1/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({
          booking: `BK${Date.now()}`.slice(0,10),
          check_in_date: reservation.checkIn,
          check_out_date: reservation.checkOut,
          total_amount: reservation.totalAmount,
          accomodation_id: reservation.accommodationId,
          user_id: 1 // Debes obtener el id real del usuario logueado
        })
      });
      if (res.ok) fetchReservations();
    } catch {}
  };

  const updateReservation = async (id: string, reservation: Partial<Reservation>) => {
    // No hay endpoint PUT/PATCH para reservas completas, solo para status
  };

  const cancelReservation = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/V1/status_booking/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({ status: 'CANCELLED' })
      });
      if (res.ok) fetchReservations();
    } catch {}
  };

  return (
    <AppContext.Provider value={{
      accommodations,
      reservations,
      addAccommodation,
      updateAccommodation,
      deleteAccommodation,
      addReservation,
      updateReservation,
      cancelReservation
    }}>
      {children}
    </AppContext.Provider>
  );
};