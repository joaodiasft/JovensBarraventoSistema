import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Member } from '../types';
import { storage } from '../utils/storage';
import { Modal } from './ui/Modal';
import { MemberForm } from './forms/MemberForm';

export function Members() {
  const [members, setMembers] = useState<Member[]>(storage.getMembers());
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | undefined>();

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMember = (data: Partial<Member>) => {
    const newMember: Member = {
      id: Date.now().toString(),
      joinedAt: new Date().toISOString(),
      ...data,
    } as Member;

    const updatedMembers = [...members, newMember];
    setMembers(updatedMembers);
    storage.setMembers(updatedMembers);
    setIsModalOpen(false);
  };

  const handleEditMember = (data: Partial<Member>) => {
    if (!editingMember) return;

    const updatedMembers = members.map(member =>
      member.id === editingMember.id ? { ...member, ...data } : member
    );

    setMembers(updatedMembers);
    storage.setMembers(updatedMembers);
    setIsModalOpen(false);
    setEditingMember(undefined);
  };

  const handleDeleteMember = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este membro?')) {
      const updatedMembers = members.filter(member => member.id !== id);
      setMembers(updatedMembers);
      storage.setMembers(updatedMembers);
    }
  };

  const openEditModal = (member: Member) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Membros</h1>
        <button
          onClick={() => {
            setEditingMember(undefined);
            setIsModalOpen(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <Plus size={20} />
          Novo Membro
        </button>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Buscar membros..."
          className="w-full p-3 pl-10 rounded-lg border border-gray-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Função</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredMembers.map((member) => (
              <tr key={member.id}>
                <td className="px-6 py-4 whitespace-nowrap">{member.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditModal(member)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteMember(member.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingMember(undefined);
        }}
        title={editingMember ? 'Editar Membro' : 'Novo Membro'}
      >
        <MemberForm
          member={editingMember}
          onSubmit={editingMember ? handleEditMember : handleAddMember}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingMember(undefined);
          }}
        />
      </Modal>
    </div>
  );
}