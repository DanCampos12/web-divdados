export interface Objective {
  id?: string;
  description: string;
  value: number | null;
  initialDate: string;
  finalDate: string;
  status: string;
  order: number;
  progress: number | null;
  userId: string;
}
