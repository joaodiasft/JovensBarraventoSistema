import React from 'react';
import { FinancialRecord } from '../../types';

interface FinanceFormProps {
  record?: FinancialRecord;
  onSubmit: (data: Partial<FinancialRecord>) => void;
  onCancel: () => void;
}

export function FinanceForm({ record, onSubmit, onCancel }: FinanceFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const data: Partial<FinancialRecord> = {
      description: formData.get('description') as string,
      amount: parseFloat(formData.get('amount') as string),
      type: formData.get('type') as 'income' | 'expense',
      date: formData.get('date') as string,
      category: formData.get('category') as string,
    };
    
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Descrição</label>
        <input
          type="text"
          name="description"
          defaultValue={record?.description}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Valor</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">R$</span>
          </div>
          <input
            type="number"
            name="amount"
            defaultValue={record?.amount}
            step="0.01"
            min="0"
            className="pl-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tipo</label>
        <select
          name="type"
          defaultValue={record?.type}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          required
        >
          <option value="income">Entrada</option>
          <option value="expense">Saída</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Data</label>
        <input
          type="date"
          name="date"
          defaultValue={record?.date}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Categoria</label>
        <select
          name="category"
          defaultValue={record?.category}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          required
        >
          <option value="media">Mídia</option>
          <option value="equipment">Equipamentos</option>
          <option value="maintenance">Manutenção</option>
          <option value="other">Outros</option>
        </select>
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
          {record ? 'Atualizar' : 'Adicionar'}
        </button>
      </div>
    </form>
  );
}