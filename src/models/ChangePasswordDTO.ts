import { UserEntity } from './UserEntity'

export class ChangePasswordDTO {
  userId: string;
  password: string;
  newPassword: string;
  confirmNewPassword: string;

  constructor (user: UserEntity, currentPassword: string) {
    this.userId = user.id || ''
    this.password = currentPassword
    this.newPassword = user.password
    this.confirmNewPassword = user.confirmPassword
  }
}
