import React from 'react';
import { Home, Users, DollarSign, Wrench, Calendar, ChevronRight, Music, Video, Radio } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'members', label: 'Jovens', icon: Users },
  { id: 'finances', label: 'Finanças', icon: DollarSign },
  { id: 'equipment', label: 'Equipamentos', icon: Wrench },
  { id: 'events', label: 'Eventos', icon: Calendar },
];

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <div className="w-64 bg-gradient-to-b from-purple-900 to-indigo-900 min-h-screen p-4 text-white">
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Barravento</h1>
        <p className="text-sm text-gray-300 mt-1">Ministério de Jovens</p>
      </div>
      <nav>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center space-x-2 p-3 rounded-lg mb-2 transition-all duration-200 ${
                currentPage === item.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'hover:bg-white/10 text-gray-300 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
              <ChevronRight
                size={16}
                className={`ml-auto transition-transform duration-200 ${
                  currentPage === item.id ? 'rotate-90' : ''
                }`}
              />
            </button>
          );
        })}
      </nav>
      
      <div className="mt-8 p-4 bg-white/10 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-300">Próximo Evento</h3>
        <p className="text-white mt-2 font-medium">Culto da Juventude</p>
        <p className="text-sm text-gray-300">Sábado às 19:30</p>
      </div>
    </div>
  );
}