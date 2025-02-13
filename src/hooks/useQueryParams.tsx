import { useSearchParams } from 'react-router-dom'

// hook lấy tất cả query params trong url
export default function useQueryParams() {
  const [searchParams] = useSearchParams()
  return Object.fromEntries([...searchParams])
}
