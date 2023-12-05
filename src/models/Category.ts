export interface Category {
  id?: string;
  name: string;
  color: string;
  userId: string;
  allocation: number;
  maxValueMonthly: number | null;
  isAutomaticInput: boolean;
}
