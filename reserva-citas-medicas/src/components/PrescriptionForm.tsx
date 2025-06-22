import React, { useState } from 'react';
import { X, Plus, Download, Save } from 'lucide-react';
import { MedicalRecord, Patient, Prescription, Medication } from '../types';
import { downloadPrescriptionPDF } from '../utils/pdfGenerator';
import { doctors } from '../data/mockData';

interface PrescriptionFormProps {
  medicalRecord: MedicalRecord;
  patient: Patient;
  doctorId: string;
  onClose: () => void;
  onCreatePrescription: (prescription: Prescription) => void;
}

const PrescriptionForm: React.FC<PrescriptionFormProps> = ({
  medicalRecord,
  patient,
  doctorId,
  onClose,
  onCreatePrescription
}) => {
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      name: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: ''
    }
  ]);
  const [instructions, setInstructions] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const doctor = doctors.find(d => d.id === doctorId);

  const addMedication = () => {
    const newMedication: Medication = {
      id: Date.now().toString(),
      name: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: ''
    };
    setMedications([...medications, newMedication]);
  };

  const removeMedication = (id: string) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  const updateMedication = (id: string, field: keyof Medication, value: string) => {
    setMedications(medications.map(med =>
      med.id === id ? { ...med, [field]: value } : med
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    const prescription: Prescription = {
      id: Date.now().toString(),
      patientId: patient.id,
      doctorId,
      medicalRecordId: medicalRecord.id,
      date: new Date().toISOString().split('T')[0],
      medications: medications.filter(med => med.name.trim() !== ''),
      instructions,
      createdAt: new Date().toISOString()
    };

    onCreatePrescription(prescription);

    // Generate and download PDF
    if (doctor) {
      try {
        downloadPrescriptionPDF(prescription, patient, doctor);
      } catch (error) {
        console.error('Error generating PDF:', error);
      }
    }

    setIsGenerating(false);
    onClose();
  };

  const canSubmit = medications.some(med => med.name.trim() !== '');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-green-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">Nueva Receta Médica</h2>
              <p className="text-green-100">
                Paciente: {patient.name} | Diagnóstico: {medicalRecord.diagnosis}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-green-200 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 max-h-[75vh] overflow-y-auto">
          <div className="space-y-6">
            {/* Patient and Doctor Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Información del Paciente</h3>
                  <p><strong>Nombre:</strong> {patient.name}</p>
                  <p><strong>Fecha de Nacimiento:</strong> {patient.dateOfBirth}</p>
                  <p><strong>Tipo de Sangre:</strong> {patient.bloodType}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Información del Médico</h3>
                  <p><strong>Nombre:</strong> {doctor?.name}</p>
                  <p><strong>Especialidad:</strong> {doctor?.specialty}</p>
                  <p><strong>Cédula:</strong> {doctor?.licenseNumber}</p>
                </div>
              </div>
            </div>

            {/* Medications */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Medicamentos</h3>
                <button
                  type="button"
                  onClick={addMedication}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Agregar Medicamento</span>
                </button>
              </div>

              <div className="space-y-4">
                {medications.map((medication, index) => (
                  <div key={medication.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-gray-900">Medicamento {index + 1}</h4>
                      {medications.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeMedication(medication.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nombre del Medicamento *
                        </label>
                        <input
                          type="text"
                          required
                          value={medication.name}
                          onChange={(e) => updateMedication(medication.id, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="Ej: Paracetamol"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Dosis *
                        </label>
                        <input
                          type="text"
                          required
                          value={medication.dosage}
                          onChange={(e) => updateMedication(medication.id, 'dosage', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="Ej: 500mg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Frecuencia *
                        </label>
                        <select
                          required
                          value={medication.frequency}
                          onChange={(e) => updateMedication(medication.id, 'frequency', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Seleccionar frecuencia</option>
                          <option value="Cada 4 horas">Cada 4 horas</option>
                          <option value="Cada 6 horas">Cada 6 horas</option>
                          <option value="Cada 8 horas">Cada 8 horas</option>
                          <option value="Cada 12 horas">Cada 12 horas</option>
                          <option value="Una vez al día">Una vez al día</option>
                          <option value="Dos veces al día">Dos veces al día</option>
                          <option value="Tres veces al día">Tres veces al día</option>
                          <option value="Según necesidad">Según necesidad</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Duración *
                        </label>
                        <select
                          required
                          value={medication.duration}
                          onChange={(e) => updateMedication(medication.id, 'duration', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Seleccionar duración</option>
                          <option value="3 días">3 días</option>
                          <option value="5 días">5 días</option>
                          <option value="7 días">7 días</option>
                          <option value="10 días">10 días</option>
                          <option value="14 días">14 días</option>
                          <option value="30 días">30 días</option>
                          <option value="60 días">60 días</option>
                          <option value="90 días">90 días</option>
                          <option value="Continuo">Continuo</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Instrucciones Específicas
                        </label>
                        <input
                          type="text"
                          value={medication.instructions}
                          onChange={(e) => updateMedication(medication.id, 'instructions', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="Ej: Tomar con alimentos, antes de dormir, etc."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* General Instructions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instrucciones Generales
              </label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Instrucciones adicionales para el paciente (dieta, actividades, precauciones, etc.)"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!canSubmit || isGenerating}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Generando...</span>
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  <span>Crear y Descargar Receta</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PrescriptionForm;