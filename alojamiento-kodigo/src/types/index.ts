export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Accommodation {
  id: number;
  name: string;
  address: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface Reservation {
  id: string;
  accommodationId: string;
  accommodationName: string;
  address?: string;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  totalAmount: number;
  guests: number;
  user_id?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  status: 'confirmed' | 'pending' | 'cancelled';
  accommodationName: string;
}