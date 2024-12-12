import React from 'react';
import { Equipment } from '../../types';

interface EquipmentFormProps {
  equipment?: Equipment;
  onSubmit: (data: Partial<Equipment>) => void;
  onCancel: () => void;
}

export function EquipmentForm({ equipment, onSubmit, onCancel }: EquipmentFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const data: Partial<Equipment> = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      status: formData.get('status') as 'active' | 'maintenance' | 'replaced',
      category: formData.get('category') as string,
      assignedTo: formData.get('assignedTo') as string || undefined,
    };
    
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome do Equipamento</label>
        <input
          type="text"
          name="name"
          defaultValue={equipment?.name}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Descrição</label>
        <textarea
          name="description"
          defaultValue={equipment?.description}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          name="status"
          defaultValue={equipment?.status}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          required
        >
          <option value="active">Ativo</option>
          <option value="maintenance">Em Manutenção</option>
          <option value="replaced">Substituído</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Categoria</label>
        <select
          name="category"
          defaultValue={equipment?.category}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          required
        >
          <option value="camera">Câmera</option>
          <option value="audio">Áudio</option>
          <option value="video">Vídeo</option>
          <option value="lighting">Iluminação</option>
          <option value="computer">Computador</option>
          <option value="other">Outro</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Responsável</label>
        <input
          type="text"
          name="assignedTo"
          defaultValue={equipment?.assignedTo}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          {equipment ? 'Atualizar' : 'Adicionar'}
        </button>
      </div>
    </form>
  );
}