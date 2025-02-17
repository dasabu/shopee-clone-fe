import { ProductListQueryParams } from '@/types/product.type'
import { isUndefined, omitBy } from 'lodash'
import { useSearchParams } from 'react-router-dom'

// hook lấy tất cả query params trong url
export function useQueryParams() {
  const [searchParams] = useSearchParams()
  return Object.fromEntries([...searchParams])
}

// hook lấy query params của page product list
export function useQueryParamsProductList(): ProductListQueryParams {
  const {
    page,
    limit,
    sort_by,
    exclude,
    name,
    order,
    price_max,
    price_min,
    rating_filter,
    category
  } = useQueryParams()
  // Filter ra các key bị undefined
  const queryParamsProductList = omitBy(
    {
      page: page || 1,
      limit: limit || 10,
      sort_by,
      exclude,
      name,
      order,
      price_max,
      price_min,
      rating_filter,
      category
    },
    isUndefined
  )

  return queryParamsProductList
}
