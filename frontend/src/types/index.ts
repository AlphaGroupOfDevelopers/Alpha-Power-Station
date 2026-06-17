export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'foundational' | 'commercial' | 'infrastructure';
  division: 'AGD' | 'AGEE' | 'integrated';
  imageUrl?: string;
  technicalDetails?: string;
  status: 'active' | 'completed' | 'planning';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  division: 'AGD' | 'AGEE';
  bio?: string;
  imageUrl?: string;
}

export interface StudentApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  university?: string;
  division: 'AGD' | 'AGEE';
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  createdAt: Date;
}
