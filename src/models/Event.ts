export interface Event {
  id?: string;
  type: string;
  description: string;
  value: number | null;
  initialDate: string;
  finalDate: string;
  period: string;
  userId: string;
  categoryId: string;
  categoryName: string;
  completed: boolean;
}
