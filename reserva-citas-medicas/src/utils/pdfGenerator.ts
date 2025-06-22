import jsPDF from 'jspdf';
import { Appointment } from '../types';

export interface Medication {
  name: string;
  dosage: string;
}

export interface PrescriptionData {
  medications: Medication[];
  instructions: string;
}

export const downloadPrescriptionPDF = (
  prescription: PrescriptionData,
  appointment: Appointment,
) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.width;
  const margin = 20;
  let y = 30;

  // Header
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('RECETA MÉDICA', pageWidth / 2, y, { align: 'center' });
  y += 20;

  // Doctor & Patient Info
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Doctor: ${appointment.doctorName}`, margin, y);
  y += 7;
  pdf.text(`Paciente: ${appointment.patientName}`, margin, y);
  y += 7;
  pdf.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, margin, y);
  y += 15;

  // Medications
  pdf.setFont('helvetica', 'bold');
  pdf.text('MEDICAMENTOS', margin, y);
  y += 10;

  prescription.medications.forEach((med, index) => {
    pdf.setFont('helvetica', 'normal');
    pdf.text(`${index + 1}. ${med.name} - ${med.dosage}`, margin, y);
    y += 7;
  });

  y += 10;

  // Instructions
  if (prescription.instructions) {
    pdf.setFont('helvetica', 'bold');
    pdf.text('INSTRUCCIONES', margin, y);
    y += 7;
    pdf.setFont('helvetica', 'normal');
    const instructionsText = pdf.splitTextToSize(prescription.instructions, pageWidth - margin * 2);
    pdf.text(instructionsText, margin, y);
  }

  pdf.save(`receta-${appointment.patientName.replace(/\s+/g, '-')}.pdf`);
};

export const downloadAppointmentPDF = (appointment: Appointment) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.width;
  const margin = 20;
  let y = 30;

  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Comprobante de Cita Médica', pageWidth / 2, y, { align: 'center' });
  y += 20;

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Paciente: ${appointment.patientName}`, margin, y);
  y += 10;
  pdf.text(`Especialidad: ${appointment.specialty}`, margin, y);
  y += 10;
  pdf.text(`Doctor: ${appointment.doctorName}`, margin, y);
  y += 10;
  pdf.text(`Fecha: ${new Date(appointment.date).toLocaleDateString('es-ES', { timeZone: 'UTC' })}`, margin, y);
  y += 10;
  pdf.text(`Hora: ${appointment.time}`, margin, y);
  y += 20;
  
  pdf.setFont('helvetica', 'italic');
  pdf.text('Por favor, llegue 15 minutos antes de su cita.', margin, y);
  y += 7;
  pdf.text('Si necesita cancelar o reprogramar, hágalo con al menos 24 horas de antelación.', margin, y);
  
  pdf.save(`cita-${appointment.patientName.replace(/\s+/g, '-')}-${appointment.date}.pdf`);
};