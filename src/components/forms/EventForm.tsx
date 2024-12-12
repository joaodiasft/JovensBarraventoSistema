import React from 'react';
import { Event } from '../../types';

interface EventFormProps {
  event?: Event;
  onSubmit: (data: Partial<Event>) => void;
  onCancel: () => void;
}

export function EventForm({ event, onSubmit, onCancel }: EventFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const mediaRequirements = {
      video: formData.get('video') === 'on',
      audio: formData.get('audio') === 'on',
      streaming: formData.get('streaming') === 'on',
      photography: formData.get('photography') === 'on',
    };

    const data: Partial<Event> = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      status: formData.get('status') as 'planned' | 'ongoing' | 'completed',
      responsibleMembers: formData.getAll('responsibleMembers') as string[],
      mediaRequirements,
      notes: formData.get('notes') as string,
    };
    
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Título</label>
        <input
          type="text"
          name="title"
          defaultValue={event?.title}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Descrição</label>
        <textarea
          name="description"
          defaultValue={event?.description}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Data</label>
          <input
            type="date"
            name="date"
            defaultValue={event?.date}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Hora</label>
          <input
            type="time"
            name="time"
            defaultValue={event?.time}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          name="status"
          defaultValue={event?.status}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          required
        >
          <option value="planned">Planejado</option>
          <option value="ongoing">Em Andamento</option>
          <option value="completed">Concluído</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Requisitos de Mídia</label>
        <div className="mt-2 space-y-2">
          {[
            { id: 'video', label: 'Vídeo' },
            { id: 'audio', label: 'Áudio' },
            { id: 'streaming', label: 'Streaming' },
            { id: 'photography', label: 'Fotografia' },
          ].map(({ id, label }) => (
            <div key={id} className="flex items-center">
              <input
                type="checkbox"
                name={id}
                id={id}
                defaultChecked={event?.mediaRequirements?.[id as keyof typeof event.mediaRequirements]}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor={id} className="ml-2 text-sm text-gray-700">
                {label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Observações</label>
        <textarea
          name="notes"
          defaultValue={event?.notes}
          rows={3}
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
          {event ? 'Atualizar' : 'Adicionar'}
        </button>
      </div>
    </form>
  );
}