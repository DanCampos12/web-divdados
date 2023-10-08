class ConfigurationChangePasswordHelper {
  rulesRequired (value: string) {
    return !!value || 'Campo obrigatório'
  }

  getShowPasswordIcon (showPassword: boolean) {
    return showPassword ? 'mdi-eye-off' : 'mdi-eye'
  }
}

const instance = new ConfigurationChangePasswordHelper()
export default instance
