export interface SuccessResponse<Data> {
  message: string
  data: Data
}

export interface ErrorResponse<Data> {
  message: string
  data?: Data
}

export interface Paginate {
  page: number
  limit: number
  page_size: number
}
