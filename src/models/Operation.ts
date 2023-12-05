export interface Operation {
  id?: string;
  type: string;
  description: string;
  value: number | null;
  date: string;
  effected: boolean;
  userId: string;
  categoryId: string;
  categoryName: string;
  eventId?: string;
}
