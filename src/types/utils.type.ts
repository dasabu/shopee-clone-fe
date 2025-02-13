export interface SuccessResponse<Data> {
  message: string
  data: Data
}

export interface ErrorResponse<Data> {
  message: string
  data?: Data
}

export interface Pagination {
  page: number
  limit: number
  page_size: number
}
