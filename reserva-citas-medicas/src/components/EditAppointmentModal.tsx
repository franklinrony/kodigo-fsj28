import React, { useState } from 'react';
import { Appointment } from '../types';
import { db } from '../firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { X, Calendar, Clock } from 'lucide-react';

interface EditAppointmentModalProps {
  appointment: Appointment;
  appointments: Appointment[];
  onClose: () => void;
}

const EditAppointmentModal: React.FC<EditAppointmentModalProps> = ({ appointment, appointments, onClose }) => {
  const [date, setDate] = useState(appointment.date);
  const [time, setTime] = useState(appointment.time);
  const [loading, setLoading] = useState(false);
  const todayString = new Date().toISOString().split('T')[0];

  const handleReschedule = async () => {
    // Validación de fecha/hora pasada
    const selectedDateTime = new Date(`${date}T${time}`);
    if (selectedDateTime < new Date()) {
      alert('No puedes agendar una cita en una fecha u hora que ya ha pasado.');
      return;
    }

    // Validación de doble reserva
    const isDoubleBooked = appointments.some(
      app => app.id !== appointment.id &&
             app.doctorId === appointment.doctorId && 
             app.date === date && 
             app.time === time &&
             app.status !== 'cancelled'
    );
    if (isDoubleBooked) {
      alert('Este horario con el doctor seleccionado ya está ocupado.');
      return;
    }

    setLoading(true);
    const appointmentRef = doc(db, 'appointments', appointment.id);
    try {
      await updateDoc(appointmentRef, { date, time });
      alert('Cita reprogramada con éxito.');
      onClose();
    } catch (error) {
      alert('Error al reprogramar la cita.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!window.confirm('¿Estás seguro de que quieres cancelar esta cita?')) return;
    
    setLoading(true);
    const appointmentRef = doc(db, 'appointments', appointment.id);
    try {
      await updateDoc(appointmentRef, { status: 'cancelled' });
      alert('Cita cancelada con éxito.');
      onClose();
    } catch (error) {
      alert('Error al cancelar la cita.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Gestionar Cita</h2>
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Nueva Fecha</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} min={todayString} className="w-full mt-1 px-3 py-2 border rounded-lg"/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Nueva Hora</label>
                <input type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg"/>
            </div>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button onClick={handleReschedule} disabled={loading} className="flex-1 bg-blue-600 text-white py-2 rounded-lg">Reprogramar</button>
            <button onClick={handleCancel} disabled={loading} className="flex-1 bg-red-600 text-white py-2 rounded-lg">Cancelar Cita</button>
        </div>
      </div>
    </div>
  );
};

export default EditAppointmentModal; 