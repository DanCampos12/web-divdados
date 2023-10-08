import { UserEntity } from '@/models'

class ConfigurationBasicInfoHelper {
  rulesRequired (value: string) {
    return !!value || 'Campo obrigatório'
  }

  getShowPasswordIcon (showPassword: boolean) {
    return showPassword ? 'mdi-eye-off' : 'mdi-eye'
  }

  disableCheckButton (formValid: boolean, currentUser: UserEntity, userModified: UserEntity) {
    return !formValid || (
      currentUser.name === userModified.name &&
      currentUser.sex === userModified.sex &&
      currentUser.birthDate === userModified.birthDate)
  }

  disableConfirmButton (user: UserEntity, loading: boolean) {
    return !user.password || loading
  }
}

const instance = new ConfigurationBasicInfoHelper()
export default instance
