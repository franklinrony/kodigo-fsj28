import React, { useState, useEffect } from 'react';
import { User, Edit, Camera, Save, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface ProfileForm {
  displayName: string;
  email: string;
  fechaNacimiento: string;
  generoFavorito: string;
  biografia: string;
  ubicacion: string;
}

const Perfil: React.FC = () => {
  const { currentUser, userProfile, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileForm>({
    displayName: '',
    email: '',
    fechaNacimiento: '',
    generoFavorito: 'rock',
    biografia: '',
    ubicacion: ''
  });
  
  const [errors, setErrors] = useState<Partial<ProfileForm>>({});
  const [loading, setLoading] = useState(false);

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    if (currentUser && userProfile) {
      setFormData({
        displayName: userProfile.displayName || currentUser.displayName || '',
        email: currentUser.email || '',
        fechaNacimiento: userProfile.fechaNacimiento || '',
        generoFavorito: userProfile.generoFavorito || 'rock',
        biografia: userProfile.biografia || '',
        ubicacion: userProfile.ubicacion || ''
      });
    }
  }, [currentUser, userProfile]);

  const validateForm = (): boolean => {
    const newErrors: Partial<ProfileForm> = {};

    // Validación de nombre
    if (!formData.displayName.trim()) {
      newErrors.displayName = 'El nombre es requerido';
    } else if (formData.displayName.trim().length < 2) {
      newErrors.displayName = 'El nombre debe tener al menos 2 caracteres';
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Formato de email inválido';
    }

    // Validación de fecha de nacimiento
    if (formData.fechaNacimiento) {
      const birthDate = new Date(formData.fechaNacimiento);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (age < 13 || age > 120) {
        newErrors.fechaNacimiento = 'Debes tener entre 13 y 120 años';
      }
    }

    // Validación de género favorito
    if (!formData.generoFavorito) {
      newErrors.generoFavorito = 'Selecciona un género favorito';
    }

    // Validación de biografía
    if (formData.biografia.length > 500) {
      newErrors.biografia = 'La biografía no puede exceder 500 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name as keyof ProfileForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      await updateUserProfile({
        displayName: formData.displayName,
        fechaNacimiento: formData.fechaNacimiento,
        generoFavorito: formData.generoFavorito,
        biografia: formData.biografia,
        ubicacion: formData.ubicacion
      });
      // Actualizar el estado local con los nuevos datos
      setFormData(prev => ({
        ...prev,
        displayName: formData.displayName,
        fechaNacimiento: formData.fechaNacimiento,
        generoFavorito: formData.generoFavorito,
        biografia: formData.biografia,
        ubicacion: formData.ubicacion
      }));
      setIsEditing(false);
      alert('Perfil actualizado exitosamente');
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      alert('Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
    // Restaurar datos originales
    if (currentUser && userProfile) {
      setFormData({
        displayName: userProfile.displayName || currentUser.displayName || '',
        email: currentUser.email || '',
        fechaNacimiento: '',
        generoFavorito: 'rock',
        biografia: '',
        ubicacion: ''
      });
    }
  };

  const generos = [
    { value: 'rock', label: 'Rock' },
    { value: 'pop', label: 'Pop' },
    { value: 'jazz', label: 'Jazz' },
    { value: 'electronic', label: 'Electrónica' },
    { value: 'hip-hop', label: 'Hip Hop' },
    { value: 'classical', label: 'Clásica' },
    { value: 'reggae', label: 'Reggae' },
    { value: 'country', label: 'Country' },
  ];

  const stats = [
    { label: 'Canciones Escuchadas', value: '1,234' },
    { label: 'Artistas Seguidos', value: '156' },
    { label: 'Listas Creadas', value: '8' },
    { label: 'Horas Totales', value: '342' },
  ];

  if (!currentUser) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          {/* Avatar */}
          <div className="relative">
            {currentUser.photoURL ? (
              <img 
                src={currentUser.photoURL} 
                alt="Avatar"
                className="w-32 h-32 rounded-full object-cover border-4 border-white/20"
              />
            ) : (
              <div className="w-32 h-32 bg-purple-600 rounded-full flex items-center justify-center border-4 border-white/20">
                <User size={48} className="text-white" />
              </div>
            )}
            {isEditing && (
              <button className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full hover:bg-purple-700 transition-colors">
                <Camera size={16} className="text-white" />
              </button>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-white mb-2">
              {formData.displayName || 'Usuario'}
            </h1>
            <p className="text-gray-300 mb-4">{formData.email}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-400">
              {formData.ubicacion && <span>📍 {formData.ubicacion}</span>}
              <span>🎵 {generos.find(g => g.value === formData.generoFavorito)?.label}</span>
            </div>
          </div>

          {/* Edit Button */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Edit size={16} />
            <span>{isEditing ? 'Cancelar' : 'Editar Perfil'}</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">
            <div className="text-2xl font-bold text-purple-400 mb-2">{stat.value}</div>
            <div className="text-gray-300 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Profile Form */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Información Personal</h2>
          {isEditing && (
            <div className="flex space-x-2">
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <X size={16} />
                <span>Cancelar</span>
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                <Save size={16} />
                <span>{loading ? 'Guardando...' : 'Guardar'}</span>
              </button>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nombre Completo *
              </label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 
                           focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all
                           ${!isEditing ? 'cursor-not-allowed opacity-70' : ''}
                           ${errors.displayName ? 'border-red-500' : 'border-white/20'}`}
                placeholder="Ingresa tu nombre completo"
              />
              {errors.displayName && (
                <p className="mt-1 text-sm text-red-400">{errors.displayName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Correo Electrónico *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={true} // Email no se puede cambiar
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 
                           cursor-not-allowed opacity-70"
                placeholder="tu@email.com"
              />
              <p className="mt-1 text-xs text-gray-500">El email no se puede modificar</p>
            </div>

            {/* Fecha de Nacimiento */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white 
                           focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all
                           ${!isEditing ? 'cursor-not-allowed opacity-70' : ''}
                           ${errors.fechaNacimiento ? 'border-red-500' : 'border-white/20'}`}
              />
              {errors.fechaNacimiento && (
                <p className="mt-1 text-sm text-red-400">{errors.fechaNacimiento}</p>
              )}
            </div>

            {/* Género Favorito */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Género Musical Favorito *
              </label>
              <select
                name="generoFavorito"
                value={formData.generoFavorito}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white 
                           focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all
                           ${!isEditing ? 'cursor-not-allowed opacity-70' : ''}
                           ${errors.generoFavorito ? 'border-red-500' : 'border-white/20'}`}
              >
                {generos.map((genero) => (
                  <option key={genero.value} value={genero.value} className="bg-slate-800">
                    {genero.label}
                  </option>
                ))}
              </select>
              {errors.generoFavorito && (
                <p className="mt-1 text-sm text-red-400">{errors.generoFavorito}</p>
              )}
            </div>
          </div>

          {/* Ubicación */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Ubicación
            </label>
            <input
              type="text"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all
                         ${!isEditing ? 'cursor-not-allowed opacity-70' : ''}
                         ${errors.ubicacion ? 'border-red-500' : 'border-white/20'}`}
              placeholder="Ciudad, País"
            />
            {errors.ubicacion && (
              <p className="mt-1 text-sm text-red-400">{errors.ubicacion}</p>
            )}
          </div>

          {/* Biografía */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Biografía
              <span className="text-gray-500 text-xs ml-2">
                ({formData.biografia.length}/500 caracteres)
              </span>
            </label>
            <textarea
              name="biografia"
              value={formData.biografia}
              onChange={handleInputChange}
              disabled={!isEditing}
              rows={4}
              maxLength={500}
              className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none
                         ${!isEditing ? 'cursor-not-allowed opacity-70' : ''}
                         ${errors.biografia ? 'border-red-500' : 'border-white/20'}`}
              placeholder="Cuéntanos sobre ti y tu pasión por la música..."
            />
            {errors.biografia && (
              <p className="mt-1 text-sm text-red-400">{errors.biografia}</p>
            )}
          </div>

          {/* Mobile Save Button */}
          {isEditing && (
            <div className="md:hidden flex space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Perfil;