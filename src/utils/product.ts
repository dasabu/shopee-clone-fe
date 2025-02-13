import { ProductListQueryParams } from '@/types/product.type'
import { createSearchParams } from 'react-router-dom'

export const formatCurrency = (currency: number) =>
  new Intl.NumberFormat('de-DE').format(currency)

export const formatToSocialStyle = (value: number) =>
  new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')

export const handleSearchParams = (queryParams: ProductListQueryParams) => {
  return createSearchParams(
    Object.fromEntries(
      Object.entries(queryParams).map(([key, value]) => [
        key,
        value?.toString() || ''
      ])
    )
  ).toString()
}
