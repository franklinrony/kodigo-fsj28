import React, { useState } from 'react';
import { Appointment } from '../types';
import { formatDate } from '../utils/dateUtils';
import { Calendar, Clock, User, FileText, Check } from 'lucide-react';
import PatientRecord from './PatientRecord';
import { db } from '../firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

interface DoctorDashboardProps {
  appointments: Appointment[];
}

const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ appointments }) => {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const todayString = new Date().toISOString().split('T')[0];

  const doctorAppointments = appointments.filter(a => {
    if (selectedDate) {
      return a.date === selectedDate;
    }
    
    return a.date >= todayString;
  });

  const handleMarkAsCompleted = async (appointmentId: string) => {
    const appointmentRef = doc(db, 'appointments', appointmentId);
    try {
      await updateDoc(appointmentRef, {
        status: 'completed'
      });
      alert('Cita marcada como completada.');
    } catch (error) {
      console.error("Error al actualizar el estado: ", error);
      alert('Hubo un error al actualizar el estado de la cita.');
    }
  };

  const getStatusChip = (status: Appointment['status']) => {
    const baseClasses = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full";
    switch (status) {
      case 'completed':
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>Atendido</span>;
      case 'scheduled':
        return <span className={`${baseClasses} bg-blue-100 text-blue-800`}>Programada</span>;
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{status}</span>;
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Panel del Doctor</h2>
          <div className="mt-4 flex items-end gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Filtrar por Fecha
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <button 
              onClick={() => setSelectedDate('')}
              className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
            >
              Mostrar Próximas
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-800">
            {selectedDate ? `Citas para ${formatDate(selectedDate)}` : 'Próximas Citas'} ({doctorAppointments.length})
          </h3>
          {doctorAppointments.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No tienes citas programadas.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {doctorAppointments.map(appointment => (
                <div key={appointment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-lg">{appointment.specialty}</h4>
                      {getStatusChip(appointment.status)}
                    </div>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>{appointment.patientName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(appointment.date)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col space-y-2">
                    <button
                      onClick={() => setSelectedAppointment(appointment)}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
                    >
                      <FileText size={16} />
                      <span>Ver Expediente</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedAppointment && (
        <PatientRecord
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
        />
      )}
    </>
  );
};

export default DoctorDashboard; 