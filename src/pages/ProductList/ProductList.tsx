import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getProductsApi } from '@/apis/product.api'
import ProductCard from './components/ProductCard'
import SortBar from './components/SortBar'
import ProductPagination from './components/ProductPagination'
import FilterSidebar from './components/FilterSidebar'
import { getCategoriesApi } from '@/apis/category.api'
import { useQueryParamsProductList } from '@/hooks/useQueryParams'

export default function ProductList() {
  const queryParams = useQueryParamsProductList()

  const { data: productsData } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => getProductsApi(queryParams),
    placeholderData: keepPreviousData
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategoriesApi
  })

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          {/* Aside Filter */}
          <div className='col-span-3'>
            {categoriesData && (
              <FilterSidebar
                queryParams={queryParams}
                categories={categoriesData.data.data}
              />
            )}
          </div>
          {/* Sort Product List + Product(s) */}
          {productsData && (
            <div className='col-span-9'>
              <SortBar
                queryParams={queryParams}
                pageSize={productsData.data.data.pagination.page_size}
              />
              <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
                {productsData.data.data.products.map((product) => (
                  <div className='col-span-1'>
                    <ProductCard key={product._id} product={product} />
                  </div>
                ))}
              </div>
              <ProductPagination
                queryParams={queryParams}
                pageSize={productsData.data.data.pagination.page_size}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
