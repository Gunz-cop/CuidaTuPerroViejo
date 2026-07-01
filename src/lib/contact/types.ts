export type ContactStatus = 'allowed' | 'quarantine' | 'rejected';

export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
  startedAt?: string;
}

export interface ContactScore {
  status: ContactStatus;
  spamScore: number;
  hamScore: number;
  finalScore: number;
  reasons: string[];
}

export interface ContactMessageRecord extends ContactInput {
  status: ContactStatus;
  spamScore: number;
  hamScore: number;
  finalScore: number;
  reasons: string[];
  ipHash: string | null;
  userAgent: string;
  createdAt: string;
}
