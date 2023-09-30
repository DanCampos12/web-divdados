import { UserPreference } from './UserPreference'

export class UserPreferenceEntity implements UserPreference {
  dark: boolean;
  displayValues: boolean;

  constructor () {
    this.dark = false
    this.displayValues = true
  }

  static parse (preference: UserPreference) {
    const instance = new UserPreferenceEntity()
    if (preference) {
      instance.dark = preference.dark
      instance.displayValues = preference.displayValues
    }
    return instance
  }
}
