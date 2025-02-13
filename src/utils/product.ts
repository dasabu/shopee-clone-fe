export const formatCurrency = (currency: number) =>
  new Intl.NumberFormat('de-DE').format(currency)

export const formatToSocialStyle = (value: number) =>
  new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
