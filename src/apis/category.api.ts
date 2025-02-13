import { Category } from '@/types/category.type'
import { SuccessResponse } from '@/types/utils.type'
import axiosInstance from '@/utils/axios'

export const getCategoriesApi = () =>
  axiosInstance.get<SuccessResponse<Category[]>>('/categories')
