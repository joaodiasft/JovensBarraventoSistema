import React from 'react';
import { Member } from '../../types';

interface MemberFormProps {
  member?: Member;
  onSubmit: (data: Partial<Member>) => void;
  onCancel: () => void;
}

export function MemberForm({ member, onSubmit, onCancel }: MemberFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const data: Partial<Member> = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      role: formData.get('role') as string,
      ministry: formData.get('ministry') as string,
      skills: formData.getAll('skills') as string[],
    };
    
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          name="name"
          defaultValue={member?.name}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          defaultValue={member?.email}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Telefone</label>
        <input
          type="tel"
          name="phone"
          defaultValue={member?.phone}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Função</label>
        <input
          type="text"
          name="role"
          defaultValue={member?.role}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Ministério</label>
        <select
          name="ministry"
          defaultValue={member?.ministry}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        >
          <option value="media">Mídia</option>
          <option value="worship">Louvor</option>
          <option value="tech">Técnica</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Habilidades</label>
        <div className="mt-2 space-y-2">
          {['video', 'audio', 'photo', 'streaming'].map((skill) => (
            <div key={skill} className="flex items-center">
              <input
                type="checkbox"
                name="skills"
                value={skill}
                defaultChecked={member?.skills?.includes(skill)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700 capitalize">{skill}</label>
            </div>
          ))}
        </div>
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
          {member ? 'Atualizar' : 'Adicionar'}
        </button>
      </div>
    </form>
  );
}