import React, { useState } from 'react';
import { X, Plus, FileText, Calendar, User, Phone, Mail, Heart, AlertTriangle, Trash2 } from 'lucide-react';
import { Patient, MedicalRecord, Prescription, Appointment } from '../types';
import { formatDate } from '../utils/dateUtils';
import MedicalRecordForm from './MedicalRecordForm';
import { db } from '../firebaseConfig';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { downloadPrescriptionPDF, Medication } from '../utils/pdfGenerator';

interface PatientRecordProps {
  appointment: Appointment;
  onClose: () => void;
}

const DiagnosisForm = ({ appointment }: { appointment: Appointment }) => {
    const [diagnosis, setDiagnosis] = useState('');
    const [treatment, setTreatment] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!diagnosis) {
            alert('Por favor, ingrese un diagnóstico.');
            return;
        }
        setLoading(true);
        try {
            await addDoc(collection(db, 'medical_records'), {
                patientId: appointment.patientId || appointment.patientEmail,
                patientName: appointment.patientName,
                appointmentId: appointment.id,
                doctorId: appointment.doctorId,
                date: new Date().toISOString(),
                diagnosis,
                treatment,
            });

            // Actualizar el estado de la cita
            const appointmentRef = doc(db, 'appointments', appointment.id);
            await updateDoc(appointmentRef, {
                status: 'completed'
            });

            alert('Diagnóstico guardado y cita marcada como completada.');
            setDiagnosis('');
            setTreatment('');
        } catch (error) {
            console.error("Error al procesar la consulta:", error);
            alert('Hubo un error al guardar los datos.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Diagnóstico</label>
                <textarea
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    rows={3}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Tratamiento</label>
                <textarea
                    value={treatment}
                    onChange={(e) => setTreatment(e.target.value)}
                    rows={3}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
            >
                {loading ? 'Guardando...' : 'Guardar Diagnóstico'}
            </button>
        </form>
    );
};

const PrescriptionForm = ({ appointment }: { appointment: Appointment }) => {
    const [medications, setMedications] = useState<Medication[]>([{ name: '', dosage: '' }]);
    const [instructions, setInstructions] = useState('');
    const [loading, setLoading] = useState(false);

    const handleMedicationChange = (index: number, field: keyof Medication, value: string) => {
        const updatedMeds = [...medications];
        updatedMeds[index][field] = value;
        setMedications(updatedMeds);
    };

    const addMedication = () => setMedications([...medications, { name: '', dosage: '' }]);
    const removeMedication = (index: number) => setMedications(medications.filter((_, i) => i !== index));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validMedications = medications.filter(m => m.name && m.dosage);
        if (validMedications.length === 0) {
            alert('Por favor, añada al menos un medicamento válido.');
            return;
        }
        
        setLoading(true);
        const prescriptionData = { medications: validMedications, instructions };

        try {
            await addDoc(collection(db, 'prescriptions'), {
                ...prescriptionData,
                appointmentId: appointment.id,
                patientName: appointment.patientName,
                doctorId: appointment.doctorId,
                createdAt: new Date().toISOString(),
            });

            downloadPrescriptionPDF(prescriptionData, appointment);
            
            setMedications([{ name: '', dosage: '' }]);
            setInstructions('');

        } catch (error) {
            console.error("Error al guardar la receta:", error);
            alert('Hubo un error al guardar o generar la receta.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
           {medications.map((med, index) => (
               <div key={index} className="flex items-center space-x-2">
                   <input type="text" placeholder="Medicamento" value={med.name} onChange={e => handleMedicationChange(index, 'name', e.target.value)} className="w-1/2 px-3 py-2 border rounded-lg" required/>
                   <input type="text" placeholder="Dosis" value={med.dosage} onChange={e => handleMedicationChange(index, 'dosage', e.target.value)} className="w-1/2 px-3 py-2 border rounded-lg" required/>
                   <button type="button" onClick={() => removeMedication(index)} className="text-red-500"><Trash2/></button>
               </div>
           ))}
           <button type="button" onClick={addMedication} className="text-sm text-blue-600 flex items-center"><Plus size={16} className="mr-1"/>Añadir medicamento</button>
           <textarea placeholder="Instrucciones adicionales" value={instructions} onChange={e => setInstructions(e.target.value)} rows={3} className="w-full mt-1 px-3 py-2 border rounded-lg"/>
           <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400">
                {loading ? 'Generando...' : 'Guardar y Descargar Receta'}
           </button>
        </form>
    );
};

const PatientRecord: React.FC<PatientRecordProps> = ({ appointment, onClose }) => {
  // En un futuro, aquí se obtendrían los datos completos del paciente usando appointment.patientId
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Expediente del Paciente</h2>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Información del Paciente</h3>
          <div className="flex items-center space-x-4">
            <div className="bg-gray-100 p-3 rounded-full">
                <User size={32} className="text-gray-600" />
            </div>
            <div>
                <p className="font-bold text-xl">{appointment.patientName}</p>
                <div className="flex space-x-4 text-sm text-gray-600 mt-1">
                    <span className="flex items-center"><Mail size={16} className="mr-1.5"/>{appointment.patientEmail}</span>
                    <span className="flex items-center"><Phone size={16} className="mr-1.5"/>{appointment.patientPhone}</span>
                </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Consulta Actual</h3>
                <DiagnosisForm appointment={appointment} />
            </div>
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Nueva Receta</h3>
                <PrescriptionForm appointment={appointment} />
            </div>
        </div>

      </div>
    </div>
  );
};

export default PatientRecord;