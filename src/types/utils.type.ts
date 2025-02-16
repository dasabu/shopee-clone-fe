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

/**
 * Công dụng: loại bỏ undefined và null ra khỏi thuộc tính
 * '-?': loại bỏ tính tùy chọn (optional) của các thuộc tính.
 * VD: name?: string -> name: string
 *
 * NonNullable<T[p]>: loại bỏ null và undefined khỏi kiểu của thuộc tính p
 * VD: Nếu T[p] là string | undefined | null, thì nó trở thành string
 *
 * NoUndefinedField<NonNullable<T[p]>>: Đệ quy, đảm bảo rằng mọi thuộc tính
 * bên trong đối tượng con (nested objects) cũng tuân theo quy tắc này
 */
export type NoUndefinedField<T> = {
  [p in keyof T]-?: NoUndefinedField<NonNullable<T[p]>>
}
