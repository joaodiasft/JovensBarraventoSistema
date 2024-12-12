import React, { useState } from 'react';
import { Plus, Edit, Trash2, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { FinancialRecord } from '../types';
import { storage } from '../utils/storage';
import { Modal } from './ui/Modal';
import { FinanceForm } from './forms/FinanceForm';
import { format } from 'date-fns';

export function Finances() {
  const [records, setRecords] = useState<FinancialRecord[]>(storage.getFinances());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<FinancialRecord | undefined>();

  const totalBalance = records.reduce(
    (acc, curr) => acc + (curr.type === 'income' ? curr.amount : -curr.amount),
    0
  );

  const handleAddRecord = (data: Partial<FinancialRecord>) => {
    const newRecord: FinancialRecord = {
      id: Date.now().toString(),
      ...data,
    } as FinancialRecord;

    const updatedRecords = [...records, newRecord];
    setRecords(updatedRecords);
    storage.setFinances(updatedRecords);
    setIsModalOpen(false);
  };

  const handleEditRecord = (data: Partial<FinancialRecord>) => {
    if (!editingRecord) return;

    const updatedRecords = records.map(record =>
      record.id === editingRecord.id ? { ...record, ...data } : record
    );

    setRecords(updatedRecords);
    storage.setFinances(updatedRecords);
    setIsModalOpen(false);
    setEditingRecord(undefined);
  };

  const handleDeleteRecord = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta transação?')) {
      const updatedRecords = records.filter(record => record.id !== id);
      setRecords(updatedRecords);
      storage.setFinances(updatedRecords);
    }
  };

  const openEditModal = (record: FinancialRecord) => {
    setEditingRecord(record);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Financeiro</h1>
        <button
          onClick={() => {
            setEditingRecord(undefined);
            setIsModalOpen(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <Plus size={20} />
          Nova Transação
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Saldo Total</h2>
        <p className={`text-3xl font-bold ${totalBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          R$ {totalBalance.toFixed(2)}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {records.map((record) => (
              <tr key={record.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {format(new Date(record.date), 'dd/MM/yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{record.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`flex items-center ${record.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {record.type === 'income' ? (
                      <ArrowUpCircle size={18} className="mr-1" />
                    ) : (
                      <ArrowDownCircle size={18} className="mr-1" />
                    )}
                    {record.type === 'income' ? 'Entrada' : 'Saída'}
                  </span>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap font-medium ${
                  record.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  R$ {record.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditModal(record)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteRecord(record.id)}
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
          setEditingRecord(undefined);
        }}
        title={editingRecord ? 'Editar Transação' : 'Nova Transação'}
      >
        <FinanceForm
          record={editingRecord}
          onSubmit={editingRecord ? handleEditRecord : handleAddRecord}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingRecord(undefined);
          }}
        />
      </Modal>
    </div>
  );
}