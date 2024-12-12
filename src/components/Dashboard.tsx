import React from 'react';
import { Users, DollarSign, Calendar, Wrench } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { storage } from '../utils/storage';

export function Dashboard() {
  const members = storage.getMembers();
  const finances = storage.getFinances();
  const events = storage.getEvents();
  const equipment = storage.getEquipment();

  const totalBalance = finances.reduce(
    (acc, curr) => acc + (curr.type === 'income' ? curr.amount : -curr.amount),
    0
  );

  const activeEquipment = equipment.filter((eq) => eq.status === 'active').length;

  const stats = [
    {
      title: 'Membros',
      value: members.length,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Saldo',
      value: `R$ ${totalBalance.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'Eventos',
      value: events.length,
      icon: Calendar,
      color: 'bg-purple-500',
    },
    {
      title: 'Equipamentos Ativos',
      value: activeEquipment,
      icon: Wrench,
      color: 'bg-orange-500',
    },
  ];

  const chartData = finances.slice(-7).map((record) => ({
    date: new Date(record.date).toLocaleDateString(),
    valor: record.type === 'income' ? record.amount : -record.amount,
  }));

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className={`${stat.color} rounded-lg p-6 text-white shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-80">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <Icon size={24} className="opacity-80" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Movimentação Financeira</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="valor" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}