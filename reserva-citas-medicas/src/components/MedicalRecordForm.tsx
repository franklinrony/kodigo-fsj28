import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { Patient, MedicalRecord } from '../types';

interface MedicalRecordFormProps {
  patient: Patient;
  doctorId: string;
  onClose: () => void;
  onCreateRecord: (record: MedicalRecord) => void;
}

const MedicalRecordForm: React.FC<MedicalRecordFormProps> = ({
  patient,
  doctorId,
  onClose,
  onCreateRecord
}) => {
  const [formData, setFormData] = useState({
    chiefComplaint: '',
    symptoms: [''],
    physicalExam: '',
    diagnosis: '',
    treatment: '',
    notes: '',
    vitalSigns: {
      bloodPressure: '',
      heartRate: '',
      temperature: '',
      weight: '',
      height: ''
    }
  });

  const handleSymptomChange = (index: number, value: string) => {
    const newSymptoms = [...formData.symptoms];
    newSymptoms[index] = value;
    setFormData(prev => ({ ...prev, symptoms: newSymptoms }));
  };

  const addSymptom = () => {
    setFormData(prev => ({ ...prev, symptoms: [...prev.symptoms, ''] }));
  };

  const removeSymptom = (index: number) => {
    const newSymptoms = formData.symptoms.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, symptoms: newSymptoms }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRecord: MedicalRecord = {
      id: Date.now().toString(),
      patientId: patient.id,
      appointmentId: '', // This would be linked to an appointment
      doctorId,
      date: new Date().toISOString().split('T')[0],
      chiefComplaint: formData.chiefComplaint,
      symptoms: formData.symptoms.filter(symptom => symptom.trim() !== ''),
      physicalExam: formData.physicalExam,
      diagnosis: formData.diagnosis,
      treatment: formData.treatment,
      notes: formData.notes,
      vitalSigns: formData.vitalSigns,
      createdAt: new Date().toISOString()
    };

    onCreateRecord(newRecord);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-green-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">Nueva Consulta Médica</h2>
              <p className="text-green-100">Paciente: {patient.name}</p>
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
            {/* Vital Signs */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Signos Vitales</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Presión Arterial
                  </label>
                  <input
                    type="text"
                    placeholder="120/80"
                    value={formData.vitalSigns.bloodPressure}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      vitalSigns: { ...prev.vitalSigns, bloodPressure: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Frecuencia Cardíaca
                  </label>
                  <input
                    type="text"
                    placeholder="72 bpm"
                    value={formData.vitalSigns.heartRate}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      vitalSigns: { ...prev.vitalSigns, heartRate: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Temperatura
                  </label>
                  <input
                    type="text"
                    placeholder="36.5°C"
                    value={formData.vitalSigns.temperature}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      vitalSigns: { ...prev.vitalSigns, temperature: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Peso (kg)
                  </label>
                  <input
                    type="text"
                    placeholder="70"
                    value={formData.vitalSigns.weight}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      vitalSigns: { ...prev.vitalSigns, weight: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Altura (cm)
                  </label>
                  <input
                    type="text"
                    placeholder="170"
                    value={formData.vitalSigns.height}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      vitalSigns: { ...prev.vitalSigns, height: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Chief Complaint */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motivo de Consulta *
              </label>
              <input
                type="text"
                required
                value={formData.chiefComplaint}
                onChange={(e) => setFormData(prev => ({ ...prev, chiefComplaint: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: Dolor de cabeza, fiebre, etc."
              />
            </div>

            {/* Symptoms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Síntomas
              </label>
              {formData.symptoms.map((symptom, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={symptom}
                    onChange={(e) => handleSymptomChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe el síntoma"
                  />
                  {formData.symptoms.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSymptom(index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addSymptom}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                + Agregar síntoma
              </button>
            </div>

            {/* Physical Exam */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Examen Físico
              </label>
              <textarea
                value={formData.physicalExam}
                onChange={(e) => setFormData(prev => ({ ...prev, physicalExam: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Describe los hallazgos del examen físico..."
              />
            </div>

            {/* Diagnosis */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Diagnóstico *
              </label>
              <input
                type="text"
                required
                value={formData.diagnosis}
                onChange={(e) => setFormData(prev => ({ ...prev, diagnosis: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Diagnóstico principal"
              />
            </div>

            {/* Treatment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tratamiento
              </label>
              <textarea
                value={formData.treatment}
                onChange={(e) => setFormData(prev => ({ ...prev, treatment: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Plan de tratamiento recomendado..."
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notas Adicionales
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Observaciones adicionales, recomendaciones, etc."
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
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Guardar Consulta</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicalRecordForm;