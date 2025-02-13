import {
  Product,
  ProductList,
  ProductListQueryParams
} from '@/types/product.type'
import { SuccessResponse } from '@/types/utils.type'
import axiosInstance from '@/utils/axios'

export const getProductsApi = (params: ProductListQueryParams) => {
  return axiosInstance.get<SuccessResponse<ProductList>>('/products', {
    params
  })
}

export const getProductDetailApi = (id: string) =>
  axiosInstance.get<SuccessResponse<Product>>(`/products/${id}`)
