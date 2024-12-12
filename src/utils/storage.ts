import { Member, FinancialRecord, Equipment, Event } from '../types';

const STORAGE_KEYS = {
  MEMBERS: 'church_members',
  FINANCES: 'church_finances',
  EQUIPMENT: 'church_equipment',
  EVENTS: 'church_events',
};

export const storage = {
  getMembers: (): Member[] => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.MEMBERS) || '[]');
    } catch {
      return [];
    }
  },
  setMembers: (members: Member[]) => {
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(members));
  },
  getFinances: (): FinancialRecord[] => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.FINANCES) || '[]');
    } catch {
      return [];
    }
  },
  setFinances: (finances: FinancialRecord[]) => {
    localStorage.setItem(STORAGE_KEYS.FINANCES, JSON.stringify(finances));
  },
  getEquipment: (): Equipment[] => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.EQUIPMENT) || '[]');
    } catch {
      return [];
    }
  },
  setEquipment: (equipment: Equipment[]) => {
    localStorage.setItem(STORAGE_KEYS.EQUIPMENT, JSON.stringify(equipment));
  },
  getEvents: (): Event[] => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.EVENTS) || '[]');
    } catch {
      return [];
    }
  },
  setEvents: (events: Event[]) => {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
  },
};