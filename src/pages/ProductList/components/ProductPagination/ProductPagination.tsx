import { ProductListQueryParams } from '@/types/product.type'
import { Link, createSearchParams } from 'react-router-dom'

interface ProductPaginationProps {
  queryParams: ProductListQueryParams
  pageSize: number
}

const RANGE = 2

export default function Pagination({
  queryParams,
  pageSize
}: ProductPaginationProps) {
  const page = Number(queryParams.page)
  const renderPages = () => {
    const pages: (number | '...')[] = []

    const startRange = Math.max(1, page - RANGE)
    const endRange = Math.min(pageSize, page + RANGE)

    // Thêm trang đầu tiên
    pages.push(1)

    // Nếu startRange > 2, nghĩa là có khoảng trống sau số 1 => thêm '...'
    if (startRange > 2) {
      pages.push('...')
    }

    // Thêm các trang nằm trong khoảng [startRange, endRange]
    for (let i = startRange; i <= endRange; i++) {
      if (i !== 1 && i !== pageSize) {
        pages.push(i)
      }
    }

    // Nếu endRange < pageSize - 1, nghĩa là có khoảng trống trước số cuối cùng => thêm '...'
    if (endRange < pageSize - 1) {
      pages.push('...')
    }

    // Luôn thêm trang cuối cùng nếu nó chưa có
    if (pageSize > 1) {
      pages.push(pageSize)
    }

    return pages
  }

  return (
    <div className='flex flex-wrap mt-6 justify-center'>
      {renderPages().map((p, index) =>
        p === '...' ? (
          <span key={index} className='px-3 py-2 mx-2'>
            ...
          </span>
        ) : (
          <Link
            to={{
              pathname: '/',
              // search: '?page=1&limit=10'
              // createSearchParams nhận vào list các [key: string, value: string]
              search: createSearchParams(
                Object.fromEntries(
                  Object.entries({ ...queryParams, page: p.toString() }).map(
                    ([key, value]) => [key, value?.toString() || '']
                  )
                )
              ).toString()
            }}
            key={index}
            className={`rounded px-3 py-2 shadow-sm mx-2 border ${
              p === page ? 'bg-shopee_orange text-white' : 'bg-white'
            }`}
          >
            {p}
          </Link>
        )
      )}
    </div>
  )
}
