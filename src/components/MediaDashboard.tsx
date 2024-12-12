import React from 'react';
import { Users, Music, Video, Radio, Calendar, Flame, Instagram, Youtube } from 'lucide-react';
import { storage } from '../utils/storage';
import { Member, Equipment, Event } from '../types';

const isMediaMember = (member: Member): boolean => {
  return member.ministry === 'media' || (member.skills && member.skills.some(s => ['video', 'audio', 'photo'].includes(s)));
};

const isMediaEquipment = (equipment: Equipment): boolean => {
  return equipment.category && ['camera', 'audio', 'video'].includes(equipment.category.toLowerCase());
};

const isMediaEvent = (event: Event): boolean => {
  return event.status === 'planned' && event.mediaRequirements && Object.values(event.mediaRequirements).some(v => v);
};

export function MediaDashboard() {
  const members = storage.getMembers();
  const equipment = storage.getEquipment();
  const events = storage.getEvents();

  const mediaTeamMembers = members.filter(isMediaMember);
  const mediaEquipment = equipment.filter(isMediaEquipment);
  const upcomingMediaEvents = events.filter(isMediaEvent);

  const stats = [
    {
      title: 'Equipe de Mídia',
      value: mediaTeamMembers.length,
      icon: Users,
      color: 'bg-gradient-to-r from-purple-500 to-indigo-500',
    },
    {
      title: 'Equipamentos',
      value: mediaEquipment.length,
      icon: Video,
      color: 'bg-gradient-to-r from-pink-500 to-rose-500',
    },
    {
      title: 'Eventos Pendentes',
      value: upcomingMediaEvents.length,
      icon: Calendar,
      color: 'bg-gradient-to-r from-orange-500 to-red-500',
    },
  ];

  const socialStats = [
    { platform: 'Instagram', followers: '2.5K', icon: Instagram, color: 'text-pink-500' },
    { platform: 'YouTube', followers: '1.2K', icon: Youtube, color: 'text-red-500' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Barravento Media
          </h1>
          <p className="text-gray-600">Alcançando a juventude através da mídia</p>
        </div>
        <div className="flex space-x-4">
          {socialStats.map(({ platform, followers, icon: Icon, color }) => (
            <div key={platform} className="flex items-center space-x-2 bg-white p-3 rounded-lg shadow-md">
              <Icon className={color} size={20} />
              <div>
                <p className="text-sm text-gray-600">{platform}</p>
                <p className="font-bold">{followers}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className={`${stat.color} rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-all duration-200`}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Flame className="mr-2 text-orange-500" />
            Próximos Eventos
          </h2>
          <div className="space-y-4">
            {upcomingMediaEvents.slice(0, 3).map((event) => (
              <div key={event.id} className="flex items-center justify-between border-b pb-4 hover:bg-gray-50 p-2 rounded transition-colors">
                <div>
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(event.date).toLocaleDateString()} - {event.time}
                  </p>
                </div>
                <div className="flex space-x-2">
                  {event.mediaRequirements?.video && <Video size={16} className="text-blue-500" />}
                  {event.mediaRequirements?.audio && <Music size={16} className="text-green-500" />}
                  {event.mediaRequirements?.photography && <Radio size={16} className="text-purple-500" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Users className="mr-2 text-purple-500" />
            Equipe de Mídia
          </h2>
          <div className="space-y-4">
            {mediaTeamMembers.slice(0, 5).map((member) => (
              <div key={member.id} className="flex items-center justify-between border-b pb-4 hover:bg-gray-50 p-2 rounded transition-colors">
                <div>
                  <h3 className="font-medium">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.skills?.join(', ')}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {member.availability?.length} dias disponíveis
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}