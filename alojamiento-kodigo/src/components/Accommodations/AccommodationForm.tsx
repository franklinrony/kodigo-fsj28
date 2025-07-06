import React, { useState, useEffect } from 'react';
import { addAccommodation, updateAccommodation } from '../../services/AccommodationsService';
import { setLoading } from '../../services/LoadingService';
import { Accommodation } from '../../types';
import { uploadImageToCloudinary } from '../../services/CloudinaryService';
import Spinner from '../Common/Spinner';

interface AccommodationFormProps {
  accommodation: Accommodation | null;
  onClose: () => void;
  loading: boolean;
}

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = import.meta.env.VITE_CLOUDINARY_API_SECRET;

const AccommodationForm: React.FC<AccommodationFormProps> = ({ accommodation, onClose, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
    image: ''
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (accommodation) {
      setFormData({
        name: accommodation.name,
        address: accommodation.address,
        description: accommodation.description,
        image: accommodation.image
      });
    }
  }, [accommodation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (accommodation) {
      await updateAccommodation(accommodation.id, formData);
    } else {
      await addAccommodation(formData);
    }
    setLoading(false);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImageToCloudinary(file);
      setFormData(prev => ({ ...prev, image: url }));
    } catch (err) {
      alert('Error subiendo la imagen');
    }
    setUploading(false);
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 relative${uploading ? ' pointer-events-none' : ''}`} style={{ opacity: uploading ? 0.5 : 1 }}>
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-80 z-30 flex items-center justify-center">
          <Spinner />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre del Alojamiento
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dirección
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Descripción
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Imagen (URL)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {uploading && (
          <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
            <div className="text-center">
              <div className="mb-4"><span className="loader spinner-border animate-spin inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></span></div>
              <div className="text-blue-600 text-lg font-semibold">Subiendo imagen...</div>
            </div>
          </div>
        )}
        {formData.image && (
          <img src={formData.image} alt="Vista previa" className="w-full h-32 object-cover rounded mt-2" />
        )}
      </div>
      <div className="flex justify-end space-x-3 pt-6 border-t">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          disabled={loading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
          disabled={loading}
        >
          {accommodation ? 'Actualizar' : 'Guardar'}
        </button>
      </div>
    </form>
  );
};

export default AccommodationForm;