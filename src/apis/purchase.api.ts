import { Purchase, PurchaseListStatus } from '@/types/purchase.type'
import { SuccessResponse } from '@/types/utils.type'
import axiosInstance from '@/utils/axios'

export const addToCartApi = (body: {
  product_id: string
  buy_count: number
}) => {
  return axiosInstance.post<SuccessResponse<Purchase>>(
    '/purchases/add-to-cart',
    body
  )
}

export const getPurchaseListApi = (params: { status: PurchaseListStatus }) => {
  return axiosInstance.get<SuccessResponse<Purchase[]>>('/purchases', {
    params
  })
}
