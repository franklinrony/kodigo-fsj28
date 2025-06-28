import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Date;
  lastLogin: Date;
  fechaNacimiento?: string;
  generoFavorito?: string;
  biografia?: string;
  ubicacion?: string;
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signup: (email: string, password: string, displayName: string, extraData?: Partial<UserProfile>) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Función para crear perfil de usuario en Firestore
  const createUserProfile = async (user: User, displayName: string, extraData: Partial<UserProfile> = {}) => {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      const profile: UserProfile = {
        uid: user.uid,
        email: user.email!,
        displayName,
        createdAt: new Date(),
        lastLogin: new Date(),
        ...extraData
      };

      await setDoc(userRef, profile);
      return profile;
    } else {
      // Actualizar último login
      const existingProfile = userSnap.data() as UserProfile;
      const updatedProfile = {
        ...existingProfile,
        lastLogin: new Date(),
        ...extraData
      };
      await setDoc(userRef, updatedProfile, { merge: true });
      return updatedProfile;
    }
  };

  // Función para obtener perfil de usuario
  const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        return userSnap.data() as UserProfile;
      }
      return null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  };

  // Registro de usuario
  const signup = async (email: string, password: string, displayName: string, extraData: Partial<UserProfile> = {}) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Actualizar perfil de Firebase Auth
      await updateProfile(user, { displayName });
      
      // Crear perfil en Firestore
      const profile = await createUserProfile(user, displayName, extraData);
      setUserProfile(profile);
    } catch (error: any) {
      throw new Error(getAuthErrorMessage(error.code));
    }
  };

  // Inicio de sesión
  const login = async (email: string, password: string) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      
      // Actualizar perfil con último login
      const profile = await createUserProfile(user, user.displayName || 'Usuario');
      setUserProfile(profile);
    } catch (error: any) {
      throw new Error(getAuthErrorMessage(error.code));
    }
  };

  // Cerrar sesión
  const logout = async () => {
    try {
      await signOut(auth);
      setUserProfile(null);
    } catch (error: any) {
      throw new Error('Error al cerrar sesión');
    }
  };

  // Restablecer contraseña
  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      throw new Error(getAuthErrorMessage(error.code));
    }
  };

  // Actualizar perfil de usuario
  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!currentUser) throw new Error('No hay usuario autenticado');

    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await setDoc(userRef, data, { merge: true });
      // Leer el perfil actualizado desde Firestore
      const updatedSnap = await getDoc(userRef);
      if (updatedSnap.exists()) {
        setUserProfile(updatedSnap.data() as UserProfile);
      }
    } catch (error) {
      throw new Error('Error al actualizar perfil');
    }
  };

  // Función para obtener mensajes de error en español
  const getAuthErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'Este correo electrónico ya está registrado';
      case 'auth/weak-password':
        return 'La contraseña debe tener al menos 6 caracteres';
      case 'auth/invalid-email':
        return 'Correo electrónico inválido';
      case 'auth/user-not-found':
        return 'No existe una cuenta con este correo electrónico';
      case 'auth/wrong-password':
        return 'Contraseña incorrecta';
      case 'auth/too-many-requests':
        return 'Demasiados intentos fallidos. Intenta más tarde';
      case 'auth/network-request-failed':
        return 'Error de conexión. Verifica tu internet';
      default:
        return 'Error de autenticación. Intenta nuevamente';
    }
  };

  // Escuchar cambios de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      try {
        if (user) {
          const profile = await getUserProfile(user.uid);
          setUserProfile(profile);
        } else {
          setUserProfile(null);
        }
      } catch (error) {
        setUserProfile(null);
        console.error('Error en onAuthStateChanged:', error);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};