class SingUpHelper {
  rulesRequired (value: string) {
    return !!value || 'Campo obrigatório'
  }

  rulesEmail (value: string) {
    return /.+@.+\..+/.test(value) || 'E-mail inválido'
  }

  disableSignUpButton (formValid: boolean, loading: boolean) {
    return !formValid || loading
  }

  getShowPasswordIcon (showPassword: boolean) {
    return showPassword ? 'mdi-eye-off' : 'mdi-eye'
  }
}

const instance = new SingUpHelper()
export default instance
