class RecoverPasswordHelper {
  rulesRequired (value: string) {
    return !!value || 'Campo obrigatório'
  }

  rulesEmail (value: string) {
    return /.+@.+\..+/.test(value) || 'E-mail inválido'
  }

  disableSendButton (formValid: boolean, loading: boolean) {
    return !formValid || loading
  }
}

const instance = new RecoverPasswordHelper()
export default instance
