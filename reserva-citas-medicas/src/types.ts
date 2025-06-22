export interface Doctor {
  id: string;
  name: string;
  specialty: string;
}

export interface Specialty {
  id: string;
  name: string;
  icon: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress';
  createdAt: string;
  notes?: string;
  patientId?: string;
}

export interface AppointmentForm {
  specialty: string;
  doctorId: string;
  date: string;
  time: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  bloodType: string;
  allergies: string[];
  chronicConditions: string[];
  currentMedications: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  appointmentId: string;
  doctorId: string;
  date: string;
  chiefComplaint: string;
  symptoms: string[];
  physicalExam: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  vitalSigns: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    weight: string;
    height: string;
  };
  createdAt: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  medicalRecordId: string;
  date: string;
  medications: Medication[];
  instructions: string;
  createdAt: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface UserRole {
  type: 'patient' | 'doctor' | 'admin';
  id: string;
}