import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import AuthInput from '../../components/AuthInput'
import { loginValidationSchema, LoginValidationSchema } from '../../utils/validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { loginApi } from '../../apis/auth.api'
import { AuthCredentials } from '../../types/auth.type'
import { toast } from 'react-toastify'
import { ApiResponse } from '../../types/utils.type'
import { isAxios422Error } from '../../utils/error'

export default function Login() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<LoginValidationSchema>({
    resolver: yupResolver(loginValidationSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (body: AuthCredentials) => loginApi(body)
  })

  const handleLoginSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        toast.success(data.data.message)
        navigate('/')
      },
      onError: (error) => {
        if (isAxios422Error<ApiResponse<AuthCredentials>>(error)) {
          const authInputError = error.response?.data.data
          if (authInputError) {
            Object.keys(authInputError).forEach((key) => {
              setError(key as keyof AuthCredentials, {
                message: authInputError[key as keyof AuthCredentials]
              })
              console.log(errors)
            })
          }
        }
      }
    })
  })

  return (
    <div className='bg-shopee_orange'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' noValidate onSubmit={handleLoginSubmit}>
              <div className='mb-8 text-2xl'>Đăng nhập</div>
              <AuthInput<LoginValidationSchema>
                type='email'
                placeholder='Email'
                name='email'
                register={register}
                errorMessage={errors?.email?.message}
              />
              <AuthInput<LoginValidationSchema>
                type='password'
                placeholder='Mật khẩu'
                name='password'
                register={register}
                errorMessage={errors?.password?.message}
                autoComplete='on'
              />
              <div className='mt-5'>
                <button className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'>
                  Đăng nhập
                </button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link className='text-red-400 ml-1' to='/register'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
