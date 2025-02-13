import AsideFilter from './components/AsideFilter'
import SortProductList from './components/SortProductList'
import Product from './components/Product'
import useQueryParams from '@/hooks/useQueryParams'
import { useQuery } from '@tanstack/react-query'
import { getProductsApi } from '@/apis/product.api'

export default function ProductList() {
  const queryParams = useQueryParams()
  const { data } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => getProductsApi(queryParams)
  })
  return (
    <div>
      <div className='bg-gray-200 py-6'>
        <div className='container'>
          <div className='grid grid-cols-12 gap-6'>
            {/* Aside Filter */}
            <div className='col-span-3'>
              <AsideFilter />
            </div>
            {/* Sort Product List + Product(s) */}
            <div className='col-span-9'>
              <SortProductList />
              <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
                {data &&
                  data.data.data.products.map((product) => (
                    <div className='col-span-1'>
                      <Product key={product._id} product={product} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
