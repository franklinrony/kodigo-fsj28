import React, { useState } from 'react';
import { Plus, Edit, Trash2, MapPin, Users, DollarSign } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Modal from '../Common/Modal';
import AccommodationForm from './AccommodationForm';
import { Accommodation } from '../../types';

const AccommodationList: React.FC = () => {
  const { accommodations, deleteAccommodation } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccommodation, setEditingAccommodation] = useState<Accommodation | null>(null);

  const handleEdit = (accommodation: Accommodation) => {
    setEditingAccommodation(accommodation);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingAccommodation(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este alojamiento?')) {
      deleteAccommodation(id);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAccommodation(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Alojamientos</h1>
        <button
          onClick={handleCreate}
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Nuevo Alojamiento</span>
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {accommodations.map((accommodation) => (
          <div key={accommodation.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {accommodation.name}
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(accommodation)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(accommodation.id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  {accommodation.address}
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Users className="w-4 h-4 mr-2" />
                  Capacidad: {accommodation.capacity} personas
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <DollarSign className="w-4 h-4 mr-2" />
                  ${accommodation.pricePerNight}/noche
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4">
                {accommodation.description}
              </p>

              <div className="flex flex-wrap gap-1">
                {accommodation.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingAccommodation ? 'Editar Alojamiento' : 'Nuevo Alojamiento'}
        size="lg"
      >
        <AccommodationForm
          accommodation={editingAccommodation}
          onClose={closeModal}
        />
      </Modal>
    </div>
  );
};

export default AccommodationList;