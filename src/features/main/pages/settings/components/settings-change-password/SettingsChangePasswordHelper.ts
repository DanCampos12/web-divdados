import { UserEntity } from '@/models'

class SettingsChangePasswordHelper {
  rulesRequired (value: string) {
    return !!value || 'Campo obrigatório'
  }

  getShowPasswordIcon (showPassword: boolean) {
    return showPassword ? 'mdi-eye-off' : 'mdi-eye'
  }

  disableCheckButton (formValid: boolean, user: UserEntity) {
    return !formValid || !user.isValidPassword()
  }

  disableConfirmButton (currentPassword: string, loading: boolean) {
    return !currentPassword || loading
  }
}

const instance = new SettingsChangePasswordHelper()
export default instance
