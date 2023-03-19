export interface User {
  id?: string;
  name: string;
  surname: string;
  age: number | null;
  sex: string;
  email: string;
  password?: string;
  confirmPassword?: string;
}
