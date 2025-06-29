import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Accommodation } from '../../types';

interface AccommodationFormProps {
  accommodation: Accommodation | null;
  onClose: () => void;
}

const AccommodationForm: React.FC<AccommodationFormProps> = ({ accommodation, onClose }) => {
  const { addAccommodation, updateAccommodation } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
    pricePerNight: 0,
    capacity: 1,
    amenities: [] as string[]
  });

  const [newAmenity, setNewAmenity] = useState('');

  useEffect(() => {
    if (accommodation) {
      setFormData({
        name: accommodation.name,
        address: accommodation.address,
        description: accommodation.description,
        pricePerNight: accommodation.pricePerNight,
        capacity: accommodation.capacity,
        amenities: [...accommodation.amenities]
      });
    }
  }, [accommodation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (accommodation) {
      updateAccommodation(accommodation.id, formData);
    } else {
      addAccommodation(formData);
    }
    
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const addAmenity = () => {
    if (newAmenity.trim() && !formData.amenities.includes(newAmenity.trim())) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()]
      }));
      setNewAmenity('');
    }
  };

  const removeAmenity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Precio por Noche ($)
          </label>
          <input
            type="number"
            name="pricePerNight"
            value={formData.pricePerNight}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Capacidad (personas)
          </label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleInputChange}
            min="1"
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
          Amenidades
        </label>
        <div className="flex space-x-2 mb-3">
          <input
            type="text"
            value={newAmenity}
            onChange={(e) => setNewAmenity(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
            placeholder="Agregar amenidad"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="button"
            onClick={addAmenity}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Agregar
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.amenities.map((amenity, index) => (
            <span
              key={index}
              className="inline-flex items-center bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
            >
              {amenity}
              <button
                type="button"
                onClick={() => removeAmenity(index)}
                className="ml-2 text-gray-500 hover:text-red-600"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          {accommodation ? 'Actualizar' : 'Guardar'}
        </button>
      </div>
    </form>
  );
};

export default AccommodationForm;