export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Accommodation {
  id: string;
  name: string;
  address: string;
  description: string;
  pricePerNight: number;
  capacity: number;
  amenities: string[];
}

export interface Reservation {
  id: string;
  accommodationId: string;
  accommodationName: string;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  totalAmount: number;
  guests: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  status: 'confirmed' | 'pending' | 'cancelled';
  accommodationName: string;
}