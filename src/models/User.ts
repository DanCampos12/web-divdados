import { UserPreference } from './UserPreference'

export interface User {
  id?: string;
  name: string;
  birthDate: string;
  sex: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  preference: UserPreference;
}
