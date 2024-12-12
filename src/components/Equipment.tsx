import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Equipment as EquipmentType } from '../types';
import { storage } from '../utils/storage';
import { Modal } from './ui/Modal';
import { EquipmentForm } from './forms/EquipmentForm';

export function Equipment() {
  const [equipment, setEquipment] = useState<EquipmentType[]>(storage.getEquipment());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<EquipmentType | undefined>();

  const handleAddEquipment = (data: Partial<EquipmentType>) => {
    const newEquipment: EquipmentType = {
      id: Date.now().toString(),
      lastUpdated: new Date().toISOString(),
      ...data,
    } as EquipmentType;

    const updatedEquipment = [...equipment, newEquipment];
    setEquipment(updatedEquipment);
    storage.setEquipment(updatedEquipment);
    setIsModalOpen(false);
  };

  const handleEditEquipment = (data: Partial<EquipmentType>) => {
    if (!editingEquipment) return;

    const updatedEquipment = equipment.map(item =>
      item.id === editingEquipment.id ? { ...item, ...data, lastUpdated: new Date().toISOString() } : item
    );

    setEquipment(updatedEquipment);
    storage.setEquipment(updatedEquipment);
    setIsModalOpen(false);
    setEditingEquipment(undefined);
  };

  const handleDeleteEquipment = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este equipamento?')) {
      const updatedEquipment = equipment.filter(item => item.id !== id);
      setEquipment(updatedEquipment);
      storage.setEquipment(updatedEquipment);
    }
  };

  const openEditModal = (item: EquipmentType) => {
    setEditingEquipment(item);
    setIsModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'replaced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'maintenance':
        return 'Em Manutenção';
      case 'replaced':
        return 'Substituído';
      default:
        return status;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Equipamentos</h1>
        <button
          onClick={() => {
            setEditingEquipment(undefined);
            setIsModalOpen(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <Plus size={20} />
          Novo Equipamento
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipment.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-600 mt-1">{item.description}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => openEditModal(item)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDeleteEquipment(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="mt-4">
              <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(item.status)}`}>
                {getStatusText(item.status)}
              </span>
              <p className="text-sm text-gray-500 mt-2">
                Última atualização: {new Date(item.lastUpdated).toLocaleDateString()}
              </p>
              {item.assignedTo && (
                <p className="text-sm text-gray-500">
                  Responsável: {item.assignedTo}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingEquipment(undefined);
        }}
        title={editingEquipment ? 'Editar Equipamento' : 'Novo Equipamento'}
      >
        <EquipmentForm
          equipment={editingEquipment}
          onSubmit={editingEquipment ? handleEditEquipment : handleAddEquipment}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingEquipment(undefined);
          }}
        />
      </Modal>
    </div>
  );
}