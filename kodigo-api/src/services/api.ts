import { AuthResponse, LoginRequest, RegisterRequest } from '../types/auth';
import { Bootcamp } from '../types/bootcamp';
import { PreregistrationData } from '../types/preregistration';

const API_BASE_URL = 'https://kodigo-api.example.com/api'; // Replace with actual Kodigo API URL

// Bootcamp data with translations
const bootcampData = {
  en: [
    {
      id: '1',
      name: 'Full Stack Web Development',
      description: 'Comprehensive bootcamp covering front-end and back-end web development technologies including React, Node.js, and databases. Learn to build complete web applications from scratch.',
      duration: '16 weeks',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript'],
      startDate: '2024-03-01',
      endDate: '2024-06-15',
      instructor: 'Maria Rodriguez',
      maxStudents: 25,
      currentStudents: 18,
      price: 2500,
      level: 'Intermediate' as const,
      status: 'Active' as const,
    },
    {
      id: '2',
      name: 'Data Science & Analytics',
      description: 'Master data analysis, machine learning, and statistical modeling with Python and modern data science tools. Build predictive models and extract insights from complex datasets.',
      duration: '12 weeks',
      technologies: ['Python', 'Pandas', 'Scikit-learn', 'TensorFlow', 'SQL'],
      startDate: '2024-04-01',
      endDate: '2024-06-24',
      instructor: 'Dr. Carlos Mendez',
      maxStudents: 20,
      currentStudents: 15,
      price: 3000,
      level: 'Advanced' as const,
      status: 'Upcoming' as const,
    },
    {
      id: '3',
      name: 'Mobile App Development',
      description: 'Build native and cross-platform mobile applications using React Native and Flutter. Create apps for iOS and Android with modern development practices.',
      duration: '14 weeks',
      technologies: ['React Native', 'Flutter', 'Dart', 'Firebase', 'API Integration'],
      startDate: '2024-02-15',
      endDate: '2024-05-30',
      instructor: 'Ana Gutierrez',
      maxStudents: 22,
      currentStudents: 20,
      price: 2800,
      level: 'Intermediate' as const,
      status: 'Active' as const,
    },
    {
      id: '4',
      name: 'UI/UX Design Bootcamp',
      description: 'Learn user interface and user experience design principles, tools, and methodologies. Create beautiful and functional digital experiences.',
      duration: '10 weeks',
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
      startDate: '2024-03-15',
      endDate: '2024-05-24',
      instructor: 'Laura Martinez',
      maxStudents: 18,
      currentStudents: 12,
      price: 2200,
      level: 'Beginner' as const,
      status: 'Active' as const,
    },
    {
      id: '5',
      name: 'DevOps & Cloud Computing',
      description: 'Learn modern DevOps practices, cloud infrastructure, and deployment strategies. Master containerization, CI/CD, and cloud platforms.',
      duration: '12 weeks',
      technologies: ['Docker', 'Kubernetes', 'AWS', 'Jenkins', 'Terraform'],
      startDate: '2024-05-01',
      endDate: '2024-07-24',
      instructor: 'Roberto Silva',
      maxStudents: 16,
      currentStudents: 8,
      price: 3200,
      level: 'Advanced' as const,
      status: 'Upcoming' as const,
    },
    {
      id: '6',
      name: 'Cybersecurity Fundamentals',
      description: 'Comprehensive introduction to cybersecurity concepts, ethical hacking, and security best practices. Protect systems and data from threats.',
      duration: '14 weeks',
      technologies: ['Kali Linux', 'Wireshark', 'Metasploit', 'OWASP', 'Network Security'],
      startDate: '2024-01-15',
      endDate: '2024-04-30',
      instructor: 'Miguel Torres',
      maxStudents: 20,
      currentStudents: 20,
      price: 2900,
      level: 'Intermediate' as const,
      status: 'Completed' as const,
    },
  ],
  es: [
    {
      id: '1',
      name: 'Desarrollo Web Full Stack',
      description: 'Bootcamp integral que cubre tecnologías de desarrollo web front-end y back-end incluyendo React, Node.js y bases de datos. Aprende a construir aplicaciones web completas desde cero.',
      duration: '16 semanas',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript'],
      startDate: '2024-03-01',
      endDate: '2024-06-15',
      instructor: 'María Rodríguez',
      maxStudents: 25,
      currentStudents: 18,
      price: 2500,
      level: 'Intermedio' as const,
      status: 'Activo' as const,
    },
    {
      id: '2',
      name: 'Ciencia de Datos y Análisis',
      description: 'Domina el análisis de datos, aprendizaje automático y modelado estadístico con Python y herramientas modernas de ciencia de datos. Construye modelos predictivos y extrae insights de conjuntos de datos complejos.',
      duration: '12 semanas',
      technologies: ['Python', 'Pandas', 'Scikit-learn', 'TensorFlow', 'SQL'],
      startDate: '2024-04-01',
      endDate: '2024-06-24',
      instructor: 'Dr. Carlos Méndez',
      maxStudents: 20,
      currentStudents: 15,
      price: 3000,
      level: 'Avanzado' as const,
      status: 'Próximo' as const,
    },
    {
      id: '3',
      name: 'Desarrollo de Aplicaciones Móviles',
      description: 'Construye aplicaciones móviles nativas y multiplataforma usando React Native y Flutter. Crea apps para iOS y Android con prácticas de desarrollo modernas.',
      duration: '14 semanas',
      technologies: ['React Native', 'Flutter', 'Dart', 'Firebase', 'Integración de APIs'],
      startDate: '2024-02-15',
      endDate: '2024-05-30',
      instructor: 'Ana Gutiérrez',
      maxStudents: 22,
      currentStudents: 20,
      price: 2800,
      level: 'Intermedio' as const,
      status: 'Activo' as const,
    },
    {
      id: '4',
      name: 'Bootcamp de Diseño UI/UX',
      description: 'Aprende principios de diseño de interfaz de usuario y experiencia de usuario, herramientas y metodologías. Crea experiencias digitales hermosas y funcionales.',
      duration: '10 semanas',
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'Prototipado', 'Investigación de Usuarios'],
      startDate: '2024-03-15',
      endDate: '2024-05-24',
      instructor: 'Laura Martínez',
      maxStudents: 18,
      currentStudents: 12,
      price: 2200,
      level: 'Principiante' as const,
      status: 'Activo' as const,
    },
    {
      id: '5',
      name: 'DevOps y Computación en la Nube',
      description: 'Aprende prácticas modernas de DevOps, infraestructura en la nube y estrategias de despliegue. Domina la contenedorización, CI/CD y plataformas en la nube.',
      duration: '12 semanas',
      technologies: ['Docker', 'Kubernetes', 'AWS', 'Jenkins', 'Terraform'],
      startDate: '2024-05-01',
      endDate: '2024-07-24',
      instructor: 'Roberto Silva',
      maxStudents: 16,
      currentStudents: 8,
      price: 3200,
      level: 'Avanzado' as const,
      status: 'Próximo' as const,
    },
    {
      id: '6',
      name: 'Fundamentos de Ciberseguridad',
      description: 'Introducción integral a conceptos de ciberseguridad, hacking ético y mejores prácticas de seguridad. Protege sistemas y datos de amenazas.',
      duration: '14 semanas',
      technologies: ['Kali Linux', 'Wireshark', 'Metasploit', 'OWASP', 'Seguridad de Redes'],
      startDate: '2024-01-15',
      endDate: '2024-04-30',
      instructor: 'Miguel Torres',
      maxStudents: 20,
      currentStudents: 20,
      price: 2900,
      level: 'Intermedio' as const,
      status: 'Completado' as const,
    },
  ]
};

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('kodigo_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  private getCurrentLanguage(): 'en' | 'es' {
    return (localStorage.getItem('kodigo_language') as 'en' | 'es') || 'en';
  }

  // Auth endpoints
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    // Mock implementation - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (credentials.email === 'admin@kodigo.com' && credentials.password === 'password') {
      return {
        user: {
          id: '1',
          email: credentials.email,
          name: 'John Doe',
          createdAt: new Date().toISOString(),
        },
        token: 'mock-jwt-token-' + Date.now(),
      };
    }
    throw new Error('Invalid credentials');
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    // Mock implementation - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      user: {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        createdAt: new Date().toISOString(),
      },
      token: 'mock-jwt-token-' + Date.now(),
    };
  }

  // Bootcamp endpoints
  async getBootcamps(): Promise<Bootcamp[]> {
    // Mock implementation - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const language = this.getCurrentLanguage();
    return bootcampData[language].map(bootcamp => ({
      ...bootcamp,
      // Map translated status and level values to English for consistency in logic
      status: this.mapStatusToEnglish(bootcamp.status, language),
      level: this.mapLevelToEnglish(bootcamp.level, language),
      // Keep original translated values for display
      displayStatus: bootcamp.status,
      displayLevel: bootcamp.level,
    })) as Bootcamp[];
  }

  async getBootcampById(id: string): Promise<Bootcamp> {
    const bootcamps = await this.getBootcamps();
    const bootcamp = bootcamps.find(b => b.id === id);
    if (!bootcamp) {
      throw new Error('Bootcamp not found');
    }
    return bootcamp;
  }

  // Pre-registration endpoint
  async submitPreregistration(data: PreregistrationData): Promise<{ success: boolean; message: string }> {
    // Mock implementation - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate success
    return {
      success: true,
      message: 'Pre-registration submitted successfully',
    };
  }

  private mapStatusToEnglish(status: string, language: 'en' | 'es'): 'Active' | 'Upcoming' | 'Completed' {
    if (language === 'es') {
      switch (status) {
        case 'Activo': return 'Active';
        case 'Próximo': return 'Upcoming';
        case 'Completado': return 'Completed';
        default: return 'Active';
      }
    }
    return status as 'Active' | 'Upcoming' | 'Completed';
  }

  private mapLevelToEnglish(level: string, language: 'en' | 'es'): 'Beginner' | 'Intermediate' | 'Advanced' {
    if (language === 'es') {
      switch (level) {
        case 'Principiante': return 'Beginner';
        case 'Intermedio': return 'Intermediate';
        case 'Avanzado': return 'Advanced';
        default: return 'Beginner';
      }
    }
    return level as 'Beginner' | 'Intermediate' | 'Advanced';
  }
}

export const apiService = new ApiService();