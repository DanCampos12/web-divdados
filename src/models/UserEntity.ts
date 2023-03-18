import { User } from './User'

export class UserEntity implements User {
  id?: string;
  name: string;
  surname: string;
  age: number | null;
  sex: string;
  password: string;
  confirmPassword: string;

  constructor () {
    this.name = ''
    this.surname = ''
    this.age = null
    this.sex = ''
    this.password = ''
    this.confirmPassword = ''
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
}
