export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  joinedAt: string;
  ministry?: string;
  skills?: string[];
  availability?: string[];
  socialMedia?: {
    instagram?: string;
    youtube?: string;
    tiktok?: string;
  };
}

export interface FinancialRecord {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
  category?: string;
}

export interface Equipment {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'maintenance' | 'replaced';
  lastUpdated: string;
  category: string;
  assignedTo?: string;
  maintenanceHistory?: {
    date: string;
    description: string;
  }[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  status: 'planned' | 'ongoing' | 'completed';
  responsibleMembers: string[];
  equipmentNeeded?: string[];
  mediaRequirements?: {
    video?: boolean;
    audio?: boolean;
    streaming?: boolean;
    photography?: boolean;
    socialMedia?: boolean;
  };
  notes?: string;
  location?: string;
  capacity?: number;
  registrationLink?: string;
  socialMediaTags?: string[];
}