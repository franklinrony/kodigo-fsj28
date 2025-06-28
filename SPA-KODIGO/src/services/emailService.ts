import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, validateEmailJSConfig } from '../config/emailjs';

export interface EmailData {
  to_email: string;
  to_name: string;
  message: string;
}

export const sendWelcomeEmail = async (email: string, displayName: string): Promise<void> => {
  // Validar configuración antes de enviar
  if (!validateEmailJSConfig()) {
    console.warn('EmailJS no está configurado. No se enviará el correo de bienvenida.');
    return;
  }

  try {
    const templateParams = {
      email: email,
      name: displayName,
      to_name: displayName,
      message: `¡Bienvenido ${displayName}! Gracias por registrarte en nuestra aplicación de música. Estamos emocionados de tenerte como parte de nuestra comunidad musical.`
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    console.log('Correo de bienvenida enviado exitosamente a:', email);
    console.log('Response:', response);
  } catch (error) {
    console.error('Error enviando correo de bienvenida:', error);
    // No lanzamos el error para no interrumpir el flujo de registro
  }
};

export const sendPasswordResetEmail = async (email: string): Promise<void> => {
  // Validar configuración antes de enviar
  if (!validateEmailJSConfig()) {
    throw new Error('EmailJS no está configurado correctamente');
  }

  try {
    const templateParams = {
      to_email: email,
      to_name: 'Usuario',
      message: 'Has solicitado restablecer tu contraseña. Por favor, revisa tu correo electrónico para continuar con el proceso.'
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    console.log('Correo de restablecimiento enviado exitosamente a:', email);
    console.log('Response:', response);
  } catch (error) {
    console.error('Error enviando correo de restablecimiento:', error);
    throw new Error('Error al enviar correo de restablecimiento');
  }
};

// Función para probar la configuración de EmailJS
export const testEmailJSConnection = async (): Promise<boolean> => {
  if (!validateEmailJSConfig()) {
    return false;
  }

  try {
    // Enviar un correo de prueba
    const templateParams = {
      to_email: 'test@example.com',
      to_name: 'Test User',
      message: 'Este es un correo de prueba para verificar la configuración de EmailJS.'
    };

    await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    console.log('Prueba de EmailJS exitosa');
    return true;
  } catch (error) {
    console.error('Error en prueba de EmailJS:', error);
    return false;
  }
}; 