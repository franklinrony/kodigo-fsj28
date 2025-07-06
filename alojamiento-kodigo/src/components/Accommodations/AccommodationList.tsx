import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, MapPin, Users, DollarSign } from 'lucide-react';
import { getAccommodations, getAccommodationById } from '../../services/AccommodationsService';
import Modal from '../Common/Modal';
import AccommodationForm from './AccommodationForm';
import { Accommodation } from '../../types';
import Spinner from '../Common/Spinner';
import { setLoading, subscribeLoading } from '../../services/LoadingService';

function formatDateTime(dateString: string) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} a las ${hours}:${minutes}`;
}

const AccommodationList: React.FC = () => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccommodation, setEditingAccommodation] = useState<Accommodation | null>(null);
  const [loading, setLoadingState] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    const unsub = subscribeLoading(setLoadingState);
    fetchAccommodations();
    return () => unsub();
  }, []);

  const fetchAccommodations = async () => {
    setLoading(true);
    const data = await getAccommodations();
    setAccommodations(data);
    setLoading(false);
  };

  const handleEdit = (accommodation: Accommodation) => {
    setEditingAccommodation(accommodation);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingAccommodation(null);
    setIsModalOpen(true);
  };

  const closeModal = (shouldReload = false) => {
    setIsModalOpen(false);
    setEditingAccommodation(null);
    if (shouldReload) fetchAccommodations();
  };

  const handleViewMore = async (id: number) => {
    setDetailsLoading(true);
    const data = await getAccommodationById(id);
    setSelectedAccommodation(data);
    setDetailsLoading(false);
  };

  const closeDetailsModal = () => setSelectedAccommodation(null);

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

      {loading ? (
        <Spinner className="my-10" />
      ) : (
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
                    {/* Eliminar solo si hay endpoint DELETE */}
                    {/* <button
                      onClick={() => handleDelete(accommodation.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button> */}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    {accommodation.address}
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  {accommodation.description}
                </p>

                {/* Mostrar imagen si existe */}
                {accommodation.image && (
                  <img
                    src={accommodation.image}
                    alt={accommodation.name}
                    className="w-full h-40 object-cover rounded mb-2"
                  />
                )}
                {/* Puedes mostrar created_at y updated_at si lo deseas */}
                {/* <div className="text-xs text-gray-400">Creado: {accommodation.created_at}</div>
                <div className="text-xs text-gray-400">Actualizado: {accommodation.updated_at}</div> */}
                <button
                  onClick={() => handleViewMore(accommodation.id)}
                  className="mt-4 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                >
                  Ver más
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => closeModal(false)}
        title={editingAccommodation ? 'Editar Alojamiento' : 'Nuevo Alojamiento'}
        size="lg"
        loading={loading}
      >
        <AccommodationForm
          accommodation={editingAccommodation}
          onClose={() => closeModal(true)}
          loading={loading}
        />
      </Modal>

      <Modal
        isOpen={!!selectedAccommodation}
        onClose={closeDetailsModal}
        title={selectedAccommodation?.name || 'Detalles del Alojamiento'}
        size="lg"
      >
        {detailsLoading || !selectedAccommodation ? (
          <Spinner className="my-10" />
        ) : (
          <div className="space-y-4">
            <img src={selectedAccommodation.image} alt={selectedAccommodation.name} className="w-full h-60 object-cover rounded" />
            <div><strong>Dirección:</strong> {selectedAccommodation.address}</div>
            <div><strong>Descripción:</strong> {selectedAccommodation.description}</div>
            <div className="text-xs text-gray-400">Creado: {formatDateTime(selectedAccommodation.created_at)}</div>
            <div className="text-xs text-gray-400">Actualizado: {formatDateTime(selectedAccommodation.updated_at)}</div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AccommodationList;