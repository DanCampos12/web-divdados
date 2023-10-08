class ConfigurationBasicInfoHelper {
  rulesRequired (value: string) {
    return !!value || 'Campo obrigatório'
  }
}

const instance = new ConfigurationBasicInfoHelper()
export default instance
