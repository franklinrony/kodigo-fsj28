import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig'; // Importar la instancia de DB
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Appointment } from '../types';
import { formatDate } from '../utils/dateUtils';
import { Calendar, Clock, User, Phone, Mail, CheckCircle, Edit, Printer } from 'lucide-react';
import { doctors, specialties } from '../data/data'; // <-- Importar datos
import { downloadAppointmentPDF } from '../utils/pdfGenerator';
import EditAppointmentModal from './EditAppointmentModal';

// Nuevo componente para el formulario
const AppointmentForm = ({ onAddAppointment, appointments }: { onAddAppointment: (appointment: Omit<Appointment, 'id' | 'status'>) => void, appointments: Appointment[] }) => {
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [specialty, setSpecialty] = useState(specialties[0]); // <-- Estado para especialidad
  const [doctorId, setDoctorId] = useState(''); // <-- Estado para doctor
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('09:00');
  const todayString = new Date().toISOString().split('T')[0];

  const availableDoctors = doctors.filter(doc => doc.specialty === specialty);

  useEffect(() => {
    // Si la especialidad cambia, reiniciar la selección del doctor si el actual no está en la nueva lista
    if (availableDoctors.length > 0 && !availableDoctors.find(d => d.id === doctorId)) {
      setDoctorId(availableDoctors[0].id);
    } else if (availableDoctors.length === 0) {
      setDoctorId('');
    }
  }, [specialty, availableDoctors, doctorId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 1. Validación de campos obligatorios
    if (!patientName || !patientEmail || !specialty || !doctorId || !date || !time) {
      alert('Por favor complete todos los campos obligatorios.');
      return;
    }

    // Validación de fecha y hora pasada (mejorada)
    const selectedDateTime = new Date(`${date}T${time}`);
    if (selectedDateTime < new Date()) {
        alert('No puedes agendar una cita en una fecha u hora que ya ha pasado.');
        return;
    }

    // 3. Validación de doble reserva
    const isDoubleBooked = appointments.some(
        app => app.doctorId === doctorId && 
               app.date === date && 
               app.time === time &&
               app.status !== 'cancelled'
    );
    if (isDoubleBooked) {
        alert('Este horario con el doctor seleccionado ya está ocupado. Por favor, elija otra hora o fecha.');
        return;
    }

    const doctor = doctors.find(d => d.id === doctorId);
    if (!doctor) {
        alert('Doctor no válido');
        return;
    }

    onAddAppointment({
      patientId: patientEmail,
      patientName,
      patientEmail,
      patientPhone,
      specialty,
      date,
      time,
      doctorId: doctor.id,
      doctorName: doctor.name,
      createdAt: new Date().toISOString(),
    });

    setPatientName('');
    setPatientEmail('');
    setPatientPhone('');
    setSpecialty(specialties[0]);
    setDoctorId('');
    setDate(new Date().toISOString().split('T')[0]);
    setTime('09:00');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Registrar Nueva Cita</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nombre del Paciente"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="email"
            placeholder="Email del Paciente"
            value={patientEmail}
            onChange={(e) => setPatientEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="tel"
            placeholder="Teléfono del Paciente"
            value={patientPhone}
            onChange={(e) => setPatientPhone(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
          <select
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            {specialties.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            disabled={!specialty || availableDoctors.length === 0}
            required
          >
            <option value="">-- Seleccione un Doctor --</option>
            {availableDoctors.map(doc => <option key={doc.id} value={doc.id}>{doc.name}</option>)}
          </select>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            min={todayString}
            required
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Guardar Cita
        </button>
      </form>
    </div>
  );
};

interface AppointmentManagementProps {
  appointments: Appointment[];
  loading: boolean;
}

const AppointmentManagement: React.FC<AppointmentManagementProps> = ({ appointments, loading }) => {
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  
  // POST (Añadir Cita)
  const addAppointment = async (appointment: Omit<Appointment, 'id' | 'status'>) => {
    try {
      await addDoc(collection(db, "appointments"), {
        ...appointment,
        status: 'scheduled', // Estado por defecto
      });
      console.log("Cita guardada correctamente");
    } catch (error) {
      console.error("Error al guardar la cita: ", error);
      alert("Hubo un error al guardar la cita.");
    }
  };

  const getStatusChip = (status: Appointment['status']) => {
    const baseClasses = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full";
    switch (status) {
      case 'completed':
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>Atendido</span>;
      case 'scheduled':
        return <span className={`${baseClasses} bg-blue-100 text-blue-800`}>Programada</span>;
      case 'cancelled':
        return <span className={`${baseClasses} bg-red-100 text-red-800`}>Cancelada</span>;
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{status}</span>;
    }
  };

  return (
    <>
      <div className="space-y-6">
        <AppointmentForm onAddAppointment={addAppointment} appointments={appointments} />

        {/* Appointments List */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">
              Citas Registradas
            </h2>
            <span className="text-sm text-gray-500">
              {appointments.length} cita(s)
            </span>
          </div>

          {loading ? (
              <p>Cargando citas...</p>
          ) : appointments.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No hay citas registradas
              </h3>
              <p className="text-gray-500">
                Utilice el formulario para agregar una nueva cita.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {appointments.map((appointment) => (
                  <div key={appointment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col">
                      <div className="flex-grow">
                          <div className="flex items-center justify-between mb-3">
                              <h3 className="text-lg font-semibold text-gray-900">
                                  {appointment.specialty}
                              </h3>
                              {getStatusChip(appointment.status)}
                          </div>

                          <div className="space-y-2 text-sm text-gray-600">
                              <div className="flex items-center space-x-2">
                                  <Calendar className="h-4 w-4" />
                                  <span>{formatDate(appointment.date)} - {appointment.time}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <User className="h-4 w-4" />
                                <span>{appointment.patientName}</span>
                              </div>
                               <div className="flex items-center space-x-2">
                                <User className="h-4 w-4" />
                                <span>{appointment.doctorName}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4" />
                                <span>{appointment.patientEmail}</span>
                              </div>
                              {appointment.patientPhone && (
                              <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4" />
                                <span>{appointment.patientPhone}</span>
                              </div>
                              )}
                          </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-2">
                          {appointment.status === 'scheduled' && (
                              <button onClick={() => setEditingAppointment(appointment)} className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg flex items-center justify-center space-x-2">
                                  <Edit size={16}/><span>Editar</span>
                              </button>
                          )}
                          <button onClick={() => downloadAppointmentPDF(appointment)} className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg flex items-center justify-center space-x-2">
                             <Printer size={16}/><span>Imprimir</span>
                          </button>
                      </div>
                  </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {editingAppointment && (
        <EditAppointmentModal
          appointment={editingAppointment}
          appointments={appointments}
          onClose={() => setEditingAppointment(null)}
        />
      )}
    </>
  );
};

export default AppointmentManagement;