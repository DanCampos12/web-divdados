class MoneyInputHelper {
  formatValueString (value: number | string | null, fractionDigits: number, formatWithZeros: boolean, originalValue?: string) {
    if (!value || Number.isNaN(value)) return ''
    const valueFormatted = value.toLocaleString('pt-br', {
      currency: 'BRL',
      maximumFractionDigits: fractionDigits,
      minimumFractionDigits: formatWithZeros ? fractionDigits : 0
    })
    const hasDecimalSeparator = originalValue && originalValue.charAt(originalValue.length - 1) === ','
    if (hasDecimalSeparator && !valueFormatted.includes(',')) return `${valueFormatted},`
    return valueFormatted
  }

  formatValueNumber (value: string) {
    const valueFormatted = Number(value.replace(/[^0-9,]/g, '').replace(',', '.'))
    return Number.isNaN(valueFormatted) ? null : valueFormatted
  }
}

const instance = new MoneyInputHelper()
export default instance
