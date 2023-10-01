class MoneyInputHelper {
  formatValueString (value: number | string | null, fractionDigits: number) {
    if (!value) return ''
    return value.toLocaleString('pt-br', {
      currency: 'BRL',
      maximumFractionDigits: fractionDigits
    })
  }

  formatValueNumber (value: string) {
    const valueFormatted = Number(value.replaceAll('.', '').replace(',', '.'))
    return Number.isNaN(valueFormatted) ? null : valueFormatted
  }
}

const instance = new MoneyInputHelper()
export default instance
