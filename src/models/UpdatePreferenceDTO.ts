import { UserEntity } from './UserEntity'

export class UpdatePreferenceDTO {
  userId: string;
  dark: boolean;
  displayValues: boolean;

  constructor (user: UserEntity) {
    this.userId = user.id || ''
    this.dark = user.preference.dark
    this.displayValues = user.preference.displayValues
  }
}
