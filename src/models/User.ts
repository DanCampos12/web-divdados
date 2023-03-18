export interface User {
  id?: string;
  name: string;
  surname: string;
  age: number | null;
  sex: string;
  password: string;
  confirmPassword: string;
}
