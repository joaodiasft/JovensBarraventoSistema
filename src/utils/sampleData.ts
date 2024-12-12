import { Member, FinancialRecord, Equipment, Event } from '../types';

export const initializeSampleData = () => {
  const members: Member[] = [
    {
      id: '1',
      name: 'Lucas Silva',
      email: 'lucas@email.com',
      phone: '(11) 99999-9999',
      role: 'Líder de Mídia',
      joinedAt: '2023-01-01',
      ministry: 'media',
      skills: ['video', 'audio', 'streaming', 'social-media'],
      availability: ['Segunda', 'Quarta', 'Sábado'],
    },
    {
      id: '2',
      name: 'Ana Santos',
      email: 'ana@email.com',
      phone: '(11) 88888-8888',
      role: 'Content Creator',
      joinedAt: '2023-02-15',
      ministry: 'media',
      skills: ['photo', 'video', 'reels'],
      availability: ['Sábado', 'Domingo'],
    },
    {
      id: '3',
      name: 'Gabriel Oliveira',
      email: 'gabriel@email.com',
      phone: '(11) 77777-7777',
      role: 'DJ e Produtor Musical',
      joinedAt: '2023-03-01',
      ministry: 'media',
      skills: ['audio', 'streaming', 'music-production'],
      availability: ['Quarta', 'Sábado'],
    },
    {
      id: '4',
      name: 'Julia Costa',
      email: 'julia@email.com',
      phone: '(11) 66666-6666',
      role: 'Social Media Manager',
      joinedAt: '2023-04-01',
      ministry: 'media',
      skills: ['social-media', 'design', 'reels'],
      availability: ['Segunda', 'Quinta', 'Sábado'],
    },
  ];

  const equipment: Equipment[] = [
    {
      id: '1',
      name: 'Câmera Sony A7III',
      description: 'Câmera profissional para foto e vídeo',
      status: 'active',
      lastUpdated: '2024-03-01',
      category: 'camera',
      assignedTo: '1',
    },
    {
      id: '2',
      name: 'Pioneer DDJ-400',
      description: 'Controladora DJ para eventos',
      status: 'active',
      lastUpdated: '2024-03-01',
      category: 'audio',
      assignedTo: '3',
    },
    {
      id: '3',
      name: 'Ring Light LED',
      description: 'Iluminação para lives e gravações',
      status: 'active',
      lastUpdated: '2024-03-01',
      category: 'video',
    },
    {
      id: '4',
      name: 'GoPro Hero 10',
      description: 'Câmera de ação para vlogs',
      status: 'active',
      lastUpdated: '2024-03-01',
      category: 'camera',
    },
    {
      id: '5',
      name: 'iPad Pro',
      description: 'Tablet para design e controle',
      status: 'active',
      lastUpdated: '2024-03-01',
      category: 'other',
    },
  ];

  const events: Event[] = [
    {
      id: '1',
      title: 'Culto da Juventude',
      description: 'Culto semanal dos jovens com música e pregação',
      date: '2024-03-10',
      time: '19:30',
      status: 'planned',
      responsibleMembers: ['1', '2', '3'],
      mediaRequirements: {
        video: true,
        audio: true,
        streaming: true,
        photography: true,
      },
    },
    {
      id: '2',
      title: 'Night Worship',
      description: 'Noite de louvor e comunhão',
      date: '2024-03-15',
      time: '20:00',
      status: 'planned',
      responsibleMembers: ['2'],
      mediaRequirements: {
        video: true,
        audio: true,
        streaming: true,
      },
    },
    {
      id: '3',
      title: 'Workshop de Criação de Conteúdo',
      description: 'Treinamento para criação de conteúdo para redes sociais',
      date: '2024-03-20',
      time: '15:00',
      status: 'planned',
      responsibleMembers: ['2', '4'],
      mediaRequirements: {
        video: true,
        photography: true,
      },
    },
    {
      id: '4',
      title: 'Retiro de Jovens',
      description: 'Retiro anual da juventude',
      date: '2024-04-05',
      time: '08:00',
      status: 'planned',
      responsibleMembers: ['1', '2', '3', '4'],
      mediaRequirements: {
        video: true,
        audio: true,
        streaming: true,
        photography: true,
      },
    },
  ];

  const finances: FinancialRecord[] = [
    {
      id: '1',
      description: 'Equipamento de DJ',
      amount: 2500,
      type: 'expense',
      date: '2024-03-01',
      category: 'media',
    },
    {
      id: '2',
      description: 'Doação para Mídia',
      amount: 3000,
      type: 'income',
      date: '2024-03-02',
      category: 'media',
    },
    {
      id: '3',
      description: 'Software de Edição',
      amount: 800,
      type: 'expense',
      date: '2024-03-05',
      category: 'media',
    },
    {
      id: '4',
      description: 'Curso de Social Media',
      amount: 1200,
      type: 'expense',
      date: '2024-03-08',
      category: 'training',
    },
  ];

  localStorage.setItem('church_members', JSON.stringify(members));
  localStorage.setItem('church_finances', JSON.stringify(finances));
  localStorage.setItem('church_equipment', JSON.stringify(equipment));
  localStorage.setItem('church_events', JSON.stringify(events));
};