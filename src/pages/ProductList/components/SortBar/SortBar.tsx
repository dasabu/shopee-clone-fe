import { ProductListQueryParams } from '@/types/product.type'
import { ORDER, SORT_BY } from '@/utils/constants'
import { handleSearchParams } from '@/utils/product'
import { Link, useNavigate } from 'react-router-dom'

interface SortBarProps {
  queryParams: ProductListQueryParams
  pageSize: number
}

type SortOption = Exclude<ProductListQueryParams['sort_by'], undefined>

type OrderOption = Exclude<ProductListQueryParams['order'], undefined>

export default function SortBar({ queryParams, pageSize }: SortBarProps) {
  const navigate = useNavigate()
  const { sort_by = SORT_BY.CREATED_AT, order } = queryParams
  const page = Number(queryParams.page)

  const getSortOptionClassName = (sortOption: SortOption) => {
    const baseClassName = 'h-8 px-4 capitalize text-sm'
    return sort_by === sortOption
      ? `${baseClassName} bg-shopee_orange text-white hover:bg-shopee_orange/80`
      : `${baseClassName} bg-white text-black hover:bg-slate-100`
  }

  const handleSort = (sortOption: SortOption) => {
    // Khi đang sort theo price tăng dần (order = 'ASC') mà chuyển qua sort theo category khác
    // thì order vẫn được giữ nguyên (không đúng) => loại bỏ order
    const { order, ...restQueryParams } = queryParams

    navigate({
      pathname: '/',
      search: handleSearchParams({ ...restQueryParams, sort_by: sortOption })
    })
  }

  const handlePriceOrder = (orderOption: OrderOption) => {
    navigate({
      pathname: '/',
      search: handleSearchParams({
        ...queryParams,
        sort_by: SORT_BY.PRICE,
        order: orderOption
      })
    })
  }

  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex items-center flex-wrap gap-2'>
          <div>Sắp xếp theo</div>
          <button
            className={`text-center ${getSortOptionClassName(SORT_BY.VIEW)}`}
            onClick={() => handleSort(SORT_BY.VIEW)}
          >
            Phổ biến
          </button>
          <button
            className={`text-center ${getSortOptionClassName(SORT_BY.CREATED_AT)}`}
            onClick={() => handleSort(SORT_BY.CREATED_AT)}
          >
            Mới nhất
          </button>
          <button
            className={`text-center ${getSortOptionClassName(SORT_BY.SOLD)}`}
            onClick={() => handleSort(SORT_BY.SOLD)}
          >
            Bán chạy
          </button>
          <select
            className={`text-left ${getSortOptionClassName(SORT_BY.PRICE)}`}
            value={order || ''}
            onChange={(e) => handlePriceOrder(e.target.value as OrderOption)}
          >
            <option value='' disabled>
              Giá
            </option>
            <option value={ORDER.ASC}>Giá: Thấp đến cao</option>
            <option value={ORDER.DESC}>Giá: Cao đến thấp</option>
          </select>
        </div>
        <div className='flex items-center gap-2'>
          {page === 1 ? (
            <span className='flex justify-center items-center w-9 h-8 rounded-tl-sm rounded-bl-sm bg-white/60 hover:bg-slate-100 cursor-not-allowed shadow'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-3 h-3'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 19.5L8.25 12l7.5-7.5'
                />
              </svg>
            </span>
          ) : (
            <Link
              to={{
                pathname: '/',
                search: handleSearchParams({ ...queryParams, page: page - 1 })
              }}
              className='flex justify-center items-center w-9 h-8 px-3 rounded-tl-sm rounded-bl-sm bg-white hover:bg-slate-100 shadow'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-3 h-3'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 19.5L8.25 12l7.5-7.5'
                />
              </svg>
            </Link>
          )}
          <div>
            <span className='text-shopee_orange'>{page}</span>
            <span>/{pageSize}</span>
          </div>
          {page === pageSize ? (
            <span className='flex justify-center items-center w-9 h-8 rounded-tl-sm rounded-bl-sm bg-white/60 hover:bg-slate-100 cursor-not-allowed shadow'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-3 w-3'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M8.25 4.5l7.5 7.5-7.5 7.5'
                />
              </svg>
            </span>
          ) : (
            <Link
              to={{
                pathname: '/',
                search: handleSearchParams({ ...queryParams, page: page + 1 })
              }}
              className='flex justify-center items-center w-9 h-8 px-3 rounded-tl-sm rounded-bl-sm bg-white hover:bg-slate-100 shadow'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-3 w-3'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M8.25 4.5l7.5 7.5-7.5 7.5'
                />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
