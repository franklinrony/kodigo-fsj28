import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation keys and values
const translations = {
  en: {
    // Header
    'header.home': 'Home',
    'header.dashboard': 'Dashboard',
    'header.login': 'Login',
    'header.signup': 'Sign Up',
    'header.logout': 'Logout',
    
    // Home Page
    'home.hero.title': 'Transform Your Career with',
    'home.hero.subtitle': 'Kodigo Academy',
    'home.hero.description': 'Join thousands of students who have launched successful careers in technology. Our comprehensive bootcamps provide the skills and support you need to succeed.',
    'home.hero.start': 'Start Your Journey',
    'home.hero.programs': 'View Programs',
    
    'home.features.title': 'Why Choose Kodigo Academy?',
    'home.features.subtitle': 'We\'re committed to providing the best learning experience and career outcomes for our students.',
    'home.features.curriculum.title': 'Industry-Ready Curriculum',
    'home.features.curriculum.desc': 'Learn the latest technologies and frameworks used by top companies worldwide.',
    'home.features.instructors.title': 'Expert Instructors',
    'home.features.instructors.desc': 'Learn from experienced professionals with years of industry experience.',
    'home.features.career.title': 'Career Support',
    'home.features.career.desc': 'Get job placement assistance and career guidance throughout your journey.',
    'home.features.projects.title': 'Hands-on Projects',
    'home.features.projects.desc': 'Build real-world projects that showcase your skills to potential employers.',
    
    'home.bootcamps.title': 'Our Bootcamp Programs',
    'home.bootcamps.subtitle': 'Intensive, hands-on programs designed to get you job-ready in months, not years.',
    'home.bootcamps.enroll': 'Enroll Now',
    
    'home.cta.title': 'Ready to Start Your Tech Career?',
    'home.cta.subtitle': 'Join our community of successful graduates and take the first step towards your dream job.',
    'home.cta.start': 'Get Started Today',
    'home.cta.student': 'Already a Student?',
    
    // Login Page
    'login.title': 'Welcome Back',
    'login.subtitle': 'Sign in to your account',
    'login.email': 'Email Address',
    'login.email.placeholder': 'Enter your email',
    'login.password': 'Password',
    'login.password.placeholder': 'Enter your password',
    'login.remember': 'Remember me',
    'login.forgot': 'Forgot password?',
    'login.signin': 'Sign In',
    'login.signup.text': 'Don\'t have an account?',
    'login.signup.link': 'Sign up',
    'login.demo.title': 'Demo Account:',
    'login.demo.email': 'Email: admin@kodigo.com',
    'login.demo.password': 'Password: password',
    
    // Register Page
    'register.title': 'Create Account',
    'register.subtitle': 'Join Kodigo Academy today',
    'register.name': 'Full Name',
    'register.name.placeholder': 'Enter your full name',
    'register.email': 'Email Address',
    'register.email.placeholder': 'Enter your email',
    'register.password': 'Password',
    'register.password.placeholder': 'Create a password',
    'register.confirm': 'Confirm Password',
    'register.confirm.placeholder': 'Confirm your password',
    'register.terms': 'I agree to the',
    'register.terms.link': 'Terms and Conditions',
    'register.privacy': 'Privacy Policy',
    'register.create': 'Create Account',
    'register.login.text': 'Already have an account?',
    'register.login.link': 'Sign in',
    
    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.subtitle': 'Explore our bootcamp programs and take the next step in your career.',
    'dashboard.journey': 'Your Journey',
    'dashboard.starts': 'Starts Here',
    'dashboard.member': 'Member since:',
    'dashboard.status': 'Status:',
    'dashboard.active': 'Active',
    'dashboard.programs': 'Available Programs',
    'dashboard.students': 'Total Students',
    'dashboard.bootcamps': 'Active Bootcamps',
    'dashboard.success': 'Success Rate',
    'dashboard.available': 'Available Bootcamps',
    'dashboard.updated': 'Updated',
    'dashboard.cta.title': 'Ready to Start Learning?',
    'dashboard.cta.subtitle': 'Choose a bootcamp that matches your goals and start your journey towards a successful career in tech.',
    'dashboard.cta.enroll': 'Enroll in a Program',
    
    // Bootcamp Card
    'bootcamp.students': 'students',
    'bootcamp.technologies': 'Technologies:',
    'bootcamp.instructor': 'Instructor:',
    'bootcamp.filled': 'filled',
    'bootcamp.more': 'more',
    'bootcamp.preregister': 'Pre-register',
    'bootcamp.login.required': 'Login Required',
    'bootcamp.login.message': 'Please log in to pre-register for this bootcamp',
    
    // Pre-registration Modal
    'preregister.title': 'Pre-register for',
    'preregister.requirements': 'Requirements',
    'preregister.requirements.basic': 'Basic computer skills',
    'preregister.requirements.internet': 'Stable internet connection',
    'preregister.requirements.time': 'Commitment of 20-30 hours per week',
    'preregister.requirements.equipment': 'Computer with minimum 8GB RAM',
    'preregister.requirements.english': 'Basic English proficiency',
    
    'preregister.schedule': 'Schedule Information',
    'preregister.schedule.classes': 'Classes: Monday to Friday',
    'preregister.schedule.time': 'Time: 7:00 PM - 10:00 PM',
    'preregister.schedule.weekend': 'Weekend workshops available',
    'preregister.schedule.flexible': 'Flexible schedule options',
    
    'preregister.contact': 'Contact Information',
    'preregister.phone': 'Phone Number',
    'preregister.phone.placeholder': 'Enter your phone number',
    'preregister.contact.time': 'Preferred Contact Time',
    'preregister.contact.date': 'Preferred Contact Date',
    'preregister.motivation': 'Why do you want to join this bootcamp?',
    'preregister.motivation.placeholder': 'Tell us about your motivation and goals...',
    'preregister.experience': 'Previous Experience',
    'preregister.experience.placeholder': 'Describe any relevant experience you have...',
    
    'preregister.terms': 'Terms and Conditions',
    'preregister.terms.content': 'By pre-registering, you agree to our terms and conditions. This is not a final enrollment but an expression of interest. Our advisors will contact you to complete the enrollment process.',
    'preregister.terms.accept': 'I accept the terms and conditions',
    'preregister.schedule.accept': 'I understand and accept the class schedule',
    
    'preregister.submit': 'Submit Pre-registration',
    'preregister.cancel': 'Cancel',
    
    'preregister.success.title': 'Pre-registration Successful!',
    'preregister.success.message': 'Thank you for your interest! Our advisors will contact you within 24-48 hours to guide you through the next steps.',
    'preregister.success.next': 'What\'s next?',
    'preregister.success.step1': '1. Our advisor will call you at your preferred time',
    'preregister.success.step2': '2. We\'ll discuss the program details and answer your questions',
    'preregister.success.step3': '3. Complete the enrollment process if you decide to join',
    
    'preregister.error.title': 'Error',
    'preregister.error.message': 'There was an error processing your pre-registration. Please try again.',
    
    // Time slots
    'time.morning': '9:00 AM - 11:00 AM',
    'time.afternoon': '2:00 PM - 4:00 PM',
    'time.evening': '6:00 PM - 8:00 PM',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.tryagain': 'Try Again',
    'common.language': 'Language',
    
    // Footer
    'footer.description': 'Empowering the next generation of developers through comprehensive bootcamp programs.',
    'footer.programs': 'Programs',
    'footer.webdev': 'Web Development',
    'footer.datascience': 'Data Science',
    'footer.mobile': 'Mobile Development',
    'footer.uiux': 'UI/UX Design',
    'footer.company': 'Company',
    'footer.about': 'About Us',
    'footer.careers': 'Careers',
    'footer.blog': 'Blog',
    'footer.contact': 'Contact',
    'footer.contactinfo': 'Contact Info',
    'footer.rights': '© 2024 Kodigo Academy. All rights reserved.',
    
    // Validation Messages
    'validation.required': 'This field is required',
    'validation.email.required': 'Email is required',
    'validation.email.invalid': 'Please enter a valid email address',
    'validation.password.required': 'Password is required',
    'validation.password.min': 'Password must be at least 6 characters',
    'validation.password.pattern': 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    'validation.name.required': 'Full name is required',
    'validation.name.min': 'Name must be at least 2 characters',
    'validation.confirm.required': 'Please confirm your password',
    'validation.confirm.match': 'Passwords do not match',
    'validation.terms.required': 'You must accept the terms and conditions',
    'validation.phone.required': 'Phone number is required',
    'validation.phone.invalid': 'Please enter a valid phone number',
    'validation.motivation.required': 'Please tell us about your motivation',
    'validation.motivation.min': 'Please provide at least 20 characters',
    'validation.contact.time.required': 'Please select a preferred contact time',
    'validation.contact.date.required': 'Please select a preferred contact date',
    'validation.schedule.required': 'You must accept the class schedule',
    
    // API Messages
    'api.login.failed': 'Login failed',
    'api.register.failed': 'Registration failed',
    'api.invalid.credentials': 'Invalid credentials',
    'api.bootcamps.failed': 'Failed to fetch bootcamps',
    'api.preregister.failed': 'Failed to submit pre-registration',
  },
  es: {
    // Header
    'header.home': 'Inicio',
    'header.dashboard': 'Panel',
    'header.login': 'Iniciar Sesión',
    'header.signup': 'Registrarse',
    'header.logout': 'Cerrar Sesión',
    
    // Home Page
    'home.hero.title': 'Transforma Tu Carrera con',
    'home.hero.subtitle': 'Kodigo Academy',
    'home.hero.description': 'Únete a miles de estudiantes que han lanzado carreras exitosas en tecnología. Nuestros bootcamps integrales proporcionan las habilidades y el apoyo que necesitas para tener éxito.',
    'home.hero.start': 'Comienza Tu Viaje',
    'home.hero.programs': 'Ver Programas',
    
    'home.features.title': '¿Por Qué Elegir Kodigo Academy?',
    'home.features.subtitle': 'Estamos comprometidos a brindar la mejor experiencia de aprendizaje y resultados profesionales para nuestros estudiantes.',
    'home.features.curriculum.title': 'Currículo Listo para la Industria',
    'home.features.curriculum.desc': 'Aprende las últimas tecnologías y frameworks utilizados por las mejores empresas del mundo.',
    'home.features.instructors.title': 'Instructores Expertos',
    'home.features.instructors.desc': 'Aprende de profesionales experimentados con años de experiencia en la industria.',
    'home.features.career.title': 'Apoyo Profesional',
    'home.features.career.desc': 'Obtén asistencia para la colocación laboral y orientación profesional durante todo tu viaje.',
    'home.features.projects.title': 'Proyectos Prácticos',
    'home.features.projects.desc': 'Construye proyectos del mundo real que muestren tus habilidades a empleadores potenciales.',
    
    'home.bootcamps.title': 'Nuestros Programas de Bootcamp',
    'home.bootcamps.subtitle': 'Programas intensivos y prácticos diseñados para prepararte para el trabajo en meses, no años.',
    'home.bootcamps.enroll': 'Inscríbete Ahora',
    
    'home.cta.title': '¿Listo para Comenzar Tu Carrera en Tecnología?',
    'home.cta.subtitle': 'Únete a nuestra comunidad de graduados exitosos y da el primer paso hacia el trabajo de tus sueños.',
    'home.cta.start': 'Comienza Hoy',
    'home.cta.student': '¿Ya Eres Estudiante?',
    
    // Login Page
    'login.title': 'Bienvenido de Vuelta',
    'login.subtitle': 'Inicia sesión en tu cuenta',
    'login.email': 'Correo Electrónico',
    'login.email.placeholder': 'Ingresa tu correo electrónico',
    'login.password': 'Contraseña',
    'login.password.placeholder': 'Ingresa tu contraseña',
    'login.remember': 'Recordarme',
    'login.forgot': '¿Olvidaste tu contraseña?',
    'login.signin': 'Iniciar Sesión',
    'login.signup.text': '¿No tienes una cuenta?',
    'login.signup.link': 'Regístrate',
    'login.demo.title': 'Cuenta Demo:',
    'login.demo.email': 'Email: admin@kodigo.com',
    'login.demo.password': 'Contraseña: password',
    
    // Register Page
    'register.title': 'Crear Cuenta',
    'register.subtitle': 'Únete a Kodigo Academy hoy',
    'register.name': 'Nombre Completo',
    'register.name.placeholder': 'Ingresa tu nombre completo',
    'register.email': 'Correo Electrónico',
    'register.email.placeholder': 'Ingresa tu correo electrónico',
    'register.password': 'Contraseña',
    'register.password.placeholder': 'Crea una contraseña',
    'register.confirm': 'Confirmar Contraseña',
    'register.confirm.placeholder': 'Confirma tu contraseña',
    'register.terms': 'Acepto los',
    'register.terms.link': 'Términos y Condiciones',
    'register.privacy': 'Política de Privacidad',
    'register.create': 'Crear Cuenta',
    'register.login.text': '¿Ya tienes una cuenta?',
    'register.login.link': 'Iniciar sesión',
    
    // Dashboard
    'dashboard.welcome': 'Bienvenido de vuelta',
    'dashboard.subtitle': 'Explora nuestros programas de bootcamp y da el siguiente paso en tu carrera.',
    'dashboard.journey': 'Tu Viaje',
    'dashboard.starts': 'Comienza Aquí',
    'dashboard.member': 'Miembro desde:',
    'dashboard.status': 'Estado:',
    'dashboard.active': 'Activo',
    'dashboard.programs': 'Programas Disponibles',
    'dashboard.students': 'Total de Estudiantes',
    'dashboard.bootcamps': 'Bootcamps Activos',
    'dashboard.success': 'Tasa de Éxito',
    'dashboard.available': 'Bootcamps Disponibles',
    'dashboard.updated': 'Actualizado',
    'dashboard.cta.title': '¿Listo para Comenzar a Aprender?',
    'dashboard.cta.subtitle': 'Elige un bootcamp que coincida con tus objetivos y comienza tu viaje hacia una carrera exitosa en tecnología.',
    'dashboard.cta.enroll': 'Inscríbete en un Programa',
    
    // Bootcamp Card
    'bootcamp.students': 'estudiantes',
    'bootcamp.technologies': 'Tecnologías:',
    'bootcamp.instructor': 'Instructor:',
    'bootcamp.filled': 'lleno',
    'bootcamp.more': 'más',
    'bootcamp.preregister': 'Pre-inscribirse',
    'bootcamp.login.required': 'Inicio de Sesión Requerido',
    'bootcamp.login.message': 'Por favor inicia sesión para pre-inscribirte en este bootcamp',
    
    // Pre-registration Modal
    'preregister.title': 'Pre-inscribirse en',
    'preregister.requirements': 'Requisitos',
    'preregister.requirements.basic': 'Habilidades básicas de computación',
    'preregister.requirements.internet': 'Conexión estable a internet',
    'preregister.requirements.time': 'Compromiso de 20-30 horas por semana',
    'preregister.requirements.equipment': 'Computadora con mínimo 8GB de RAM',
    'preregister.requirements.english': 'Conocimientos básicos de inglés',
    
    'preregister.schedule': 'Información de Horarios',
    'preregister.schedule.classes': 'Clases: Lunes a Viernes',
    'preregister.schedule.time': 'Horario: 7:00 PM - 10:00 PM',
    'preregister.schedule.weekend': 'Talleres de fin de semana disponibles',
    'preregister.schedule.flexible': 'Opciones de horario flexible',
    
    'preregister.contact': 'Información de Contacto',
    'preregister.phone': 'Número de Teléfono',
    'preregister.phone.placeholder': 'Ingresa tu número de teléfono',
    'preregister.contact.time': 'Horario Preferido de Contacto',
    'preregister.contact.date': 'Fecha Preferida de Contacto',
    'preregister.motivation': '¿Por qué quieres unirte a este bootcamp?',
    'preregister.motivation.placeholder': 'Cuéntanos sobre tu motivación y objetivos...',
    'preregister.experience': 'Experiencia Previa',
    'preregister.experience.placeholder': 'Describe cualquier experiencia relevante que tengas...',
    
    'preregister.terms': 'Términos y Condiciones',
    'preregister.terms.content': 'Al pre-inscribirte, aceptas nuestros términos y condiciones. Esta no es una inscripción final sino una expresión de interés. Nuestros asesores te contactarán para completar el proceso de inscripción.',
    'preregister.terms.accept': 'Acepto los términos y condiciones',
    'preregister.schedule.accept': 'Entiendo y acepto el horario de clases',
    
    'preregister.submit': 'Enviar Pre-inscripción',
    'preregister.cancel': 'Cancelar',
    
    'preregister.success.title': '¡Pre-inscripción Exitosa!',
    'preregister.success.message': '¡Gracias por tu interés! Nuestros asesores te contactarán dentro de 24-48 horas para guiarte en los siguientes pasos.',
    'preregister.success.next': '¿Qué sigue?',
    'preregister.success.step1': '1. Nuestro asesor te llamará en tu horario preferido',
    'preregister.success.step2': '2. Discutiremos los detalles del programa y responderemos tus preguntas',
    'preregister.success.step3': '3. Completa el proceso de inscripción si decides unirte',
    
    'preregister.error.title': 'Error',
    'preregister.error.message': 'Hubo un error procesando tu pre-inscripción. Por favor intenta de nuevo.',
    
    // Time slots
    'time.morning': '9:00 AM - 11:00 AM',
    'time.afternoon': '2:00 PM - 4:00 PM',
    'time.evening': '6:00 PM - 8:00 PM',
    
    // Common
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.tryagain': 'Intentar de Nuevo',
    'common.language': 'Idioma',
    
    // Footer
    'footer.description': 'Empoderando a la próxima generación de desarrolladores a través de programas integrales de bootcamp.',
    'footer.programs': 'Programas',
    'footer.webdev': 'Desarrollo Web',
    'footer.datascience': 'Ciencia de Datos',
    'footer.mobile': 'Desarrollo Móvil',
    'footer.uiux': 'Diseño UI/UX',
    'footer.company': 'Empresa',
    'footer.about': 'Acerca de Nosotros',
    'footer.careers': 'Carreras',
    'footer.blog': 'Blog',
    'footer.contact': 'Contacto',
    'footer.contactinfo': 'Información de Contacto',
    'footer.rights': '© 2024 Kodigo Academy. Todos los derechos reservados.',
    
    // Validation Messages
    'validation.required': 'Este campo es requerido',
    'validation.email.required': 'El correo electrónico es requerido',
    'validation.email.invalid': 'Por favor ingresa un correo electrónico válido',
    'validation.password.required': 'La contraseña es requerida',
    'validation.password.min': 'La contraseña debe tener al menos 6 caracteres',
    'validation.password.pattern': 'La contraseña debe contener al menos una letra mayúscula, una minúscula y un número',
    'validation.name.required': 'El nombre completo es requerido',
    'validation.name.min': 'El nombre debe tener al menos 2 caracteres',
    'validation.confirm.required': 'Por favor confirma tu contraseña',
    'validation.confirm.match': 'Las contraseñas no coinciden',
    'validation.terms.required': 'Debes aceptar los términos y condiciones',
    'validation.phone.required': 'El número de teléfono es requerido',
    'validation.phone.invalid': 'Por favor ingresa un número de teléfono válido',
    'validation.motivation.required': 'Por favor cuéntanos sobre tu motivación',
    'validation.motivation.min': 'Por favor proporciona al menos 20 caracteres',
    'validation.contact.time.required': 'Por favor selecciona un horario preferido de contacto',
    'validation.contact.date.required': 'Por favor selecciona una fecha preferida de contacto',
    'validation.schedule.required': 'Debes aceptar el horario de clases',
    
    // API Messages
    'api.login.failed': 'Error al iniciar sesión',
    'api.register.failed': 'Error en el registro',
    'api.invalid.credentials': 'Credenciales inválidas',
    'api.bootcamps.failed': 'Error al cargar los bootcamps',
    'api.preregister.failed': 'Error al enviar la pre-inscripción',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('kodigo_language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('kodigo_language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};