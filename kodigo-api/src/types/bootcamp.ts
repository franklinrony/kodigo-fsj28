export interface Bootcamp {
  id: string;
  name: string;
  description: string;
  duration: string;
  technologies: string[];
  startDate: string;
  endDate: string;
  instructor: string;
  maxStudents: number;
  currentStudents: number;
  price: number;
  image?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'Active' | 'Upcoming' | 'Completed';
  displayStatus?: string; // For translated display values
  displayLevel?: string; // For translated display values
}