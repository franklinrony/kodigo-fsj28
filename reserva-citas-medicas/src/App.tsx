import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AppointmentManagement from './components/AppointmentManagement';
import DoctorDashboard from './components/DoctorDashboard';
import { db } from './firebaseConfig';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Appointment } from './types';

function App() {
  const [userRole, setUserRole] = useState<'patient' | 'doctor'>('patient');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const q = query(collection(db, "appointments"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const appointmentsData: Appointment[] = [];
      querySnapshot.forEach((doc) => {
        appointmentsData.push({ id: doc.id, ...doc.data() } as Appointment);
      });
      setAppointments(appointmentsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole={userRole} onRoleChange={setUserRole} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <p>Cargando datos...</p>
        ) : userRole === 'patient' ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Agenda tu Cita Médica
              </h1>
              <p className="text-lg text-gray-600">
                Selecciona la especialidad, doctor y horario que mejor se adapte a ti
              </p>
            </div>
            <AppointmentManagement appointments={appointments} loading={loading} />
          </>
        ) : (
          <DoctorDashboard appointments={appointments} />
        )}
      </main>
    </div>
  );
}

export default App;