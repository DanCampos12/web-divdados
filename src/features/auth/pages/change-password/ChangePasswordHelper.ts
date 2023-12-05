class ChangePasswordHelper {
  rulesRequired (value: string) {
    return !!value || 'Campo obrigatório'
  }

  disableRegisterButton (formValid: boolean, loading: boolean, isValidPassword: boolean) {
    return !formValid || loading || !isValidPassword
  }

  getShowPasswordIcon (showPassword: boolean) {
    return showPassword ? 'mdi-eye-off' : 'mdi-eye'
  }
}

const instance = new ChangePasswordHelper()
export default instance
