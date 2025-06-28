 // Configuración de EmailJS usando variables de entorno
export const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
};

// Validar que las credenciales estén configuradas
export const validateEmailJSConfig = (): boolean => {
  const { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } = EMAILJS_CONFIG;
  
  console.log('EmailJS Config:', {
    SERVICE_ID: SERVICE_ID ? 'Configurado' : 'No configurado',
    TEMPLATE_ID: TEMPLATE_ID ? 'Configurado' : 'No configurado',
    PUBLIC_KEY: PUBLIC_KEY ? 'Configurado' : 'No configurado'
  });
  
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn('EmailJS no está configurado correctamente. Verifica las variables de entorno.');
    return false;
  }
  
  return true;
};