export interface PreregistrationData {
  bootcampId: string;
  userId: string;
  preferredContactTime: string;
  contactDate: string;
  phone: string;
  motivation: string;
  experience: string;
  acceptedTerms: boolean;
  acceptedSchedule: boolean;
}

export interface ContactTimeSlot {
  id: string;
  time: string;
  available: boolean;
}