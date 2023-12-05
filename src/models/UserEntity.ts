import { User } from './User'
import { UserPreference } from './UserPreference'
import { UserPreferenceEntity } from './UserPreferenceEntity'

export class UserEntity implements User {
  id?: string;
  name: string;
  birthDate: string;
  sex: string;
  email: string;
  password: string;
  confirmPassword: string;
  preference: UserPreference;
  flowComplete: boolean;

  constructor () {
    this.name = ''
    this.birthDate = ''
    this.sex = ''
    this.email = ''
    this.password = ''
    this.confirmPassword = ''
    this.preference = new UserPreferenceEntity()
    this.flowComplete = false
  }

  static parse (user: User) {
    const instance = new UserEntity()
    if (user) {
      instance.id = user.id
      instance.name = user.name
      instance.birthDate = user.birthDate
      instance.sex = user.sex
      instance.email = user.email
      instance.password = user.password || ''
      instance.confirmPassword = user.confirmPassword || ''
      instance.preference = UserPreferenceEntity.parse(user.preference)
      instance.flowComplete = user.flowComplete
    }
    return instance
  }

  isLogged () {
    return !!this.id
  }

  isValidPasswordSize () {
    return this.password.length >= 6
  }

  passwordContainsNumber () {
    return /\d/.test(this.password)
  }

  passwordContainsUpperCase () {
    return /[A-Z]/.test(this.password)
  }

  passwordContainsLowerCase () {
    return /[a-z]/.test(this.password)
  }

  passwordContainsSpecialChar () {
    return /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(this.password)
  }

  passwordsMatch () {
    return this.password === this.confirmPassword
  }

  isValidPassword () {
    return this.isValidPasswordSize() &&
    this.passwordContainsNumber() &&
    this.passwordContainsUpperCase() &&
    this.passwordContainsLowerCase() &&
    this.passwordContainsSpecialChar() &&
    this.passwordsMatch()
  }

  toggleTheme () {
    this.preference.dark = !this.preference.dark
  }

  toggleDisplayValues () {
    this.preference.displayValues = !this.preference.displayValues
  }
}
