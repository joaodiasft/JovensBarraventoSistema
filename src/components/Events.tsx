import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Event } from '../types';
import { storage } from '../utils/storage';
import { Modal } from './ui/Modal';
import { EventForm } from './forms/EventForm';
import { format } from 'date-fns';

export function Events() {
  const [events, setEvents] = useState<Event[]>(storage.getEvents());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | undefined>();

  const handleAddEvent = (data: Partial<Event>) => {
    const newEvent: Event = {
      id: Date.now().toString(),
      responsibleMembers: [],
      ...data,
    } as Event;

    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    storage.setEvents(updatedEvents);
    setIsModalOpen(false);
  };

  const handleEditEvent = (data: Partial<Event>) => {
    if (!editingEvent) return;

    const updatedEvents = events.map(event =>
      event.id === editingEvent.id ? { ...event, ...data } : event
    );

    setEvents(updatedEvents);
    storage.setEvents(updatedEvents);
    setIsModalOpen(false);
    setEditingEvent(undefined);
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este evento?')) {
      const updatedEvents = events.filter(event => event.id !== id);
      setEvents(updatedEvents);
      storage.setEvents(updatedEvents);
    }
  };

  const openEditModal = (event: Event) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Eventos</h1>
        <button
          onClick={() => {
            setEditingEvent(undefined);
            setIsModalOpen(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <Plus size={20} />
          Novo Evento
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <p className="text-gray-600 mt-1">{event.description}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => openEditModal(event)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-sm">
                <span className="font-medium">Data:</span>{' '}
                {format(new Date(event.date), 'dd/MM/yyyy')}
              </p>
              <p className="text-sm">
                <span className="font-medium">Horário:</span> {event.time}
              </p>
              <p className="text-sm">
                <span className="font-medium">Status:</span>{' '}
                <span className={`px-2 py-1 rounded-full text-sm ${
                  event.status === 'planned' ? 'bg-blue-100 text-blue-800' :
                  event.status === 'ongoing' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {event.status === 'planned' ? 'Planejado' :
                   event.status === 'ongoing' ? 'Em Andamento' :
                   'Concluído'}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingEvent(undefined);
        }}
        title={editingEvent ? 'Editar Evento' : 'Novo Evento'}
      >
        <EventForm
          event={editingEvent}
          onSubmit={editingEvent ? handleEditEvent : handleAddEvent}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingEvent(undefined);
          }}
        />
      </Modal>
    </div>
  );
}