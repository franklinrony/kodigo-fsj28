import { Accommodation } from '../types';
import { API_BASE_URL } from '../main';
import axios from '../interceptor/httpInterceptor';

export const getAccommodations = async (): Promise<Accommodation[]> => {
  const res = await axios.get(`${API_BASE_URL}/api/V1/accomodations`);
  return res.data;
};

export const getAccommodationById = async (id: number): Promise<Accommodation> => {
  const res = await axios.get(`${API_BASE_URL}/api/V1/accomodation/${id}`);
  return res.data;
};

export const addAccommodation = async (accommodation: Omit<Accommodation, 'id' | 'created_at' | 'updated_at'>): Promise<void> => {
  await axios.post(`${API_BASE_URL}/api/V1/accomodation`, accommodation, {
    headers: { 'Content-Type': 'application/json' }
  });
};

export const updateAccommodation = async (id: number, accommodation: Partial<Omit<Accommodation, 'id' | 'created_at' | 'updated_at'>>): Promise<void> => {
  await axios.put(`${API_BASE_URL}/api/V1/accomodation/${id}`, accommodation, {
    headers: { 'Content-Type': 'application/json' }
  });
};

