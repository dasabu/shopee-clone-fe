import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'

import { registerValidationSchema, RegisterValidationSchema } from '../../utils/validation'
import AuthInput from '../../components/AuthInput'
import { useMutation } from '@tanstack/react-query'
import { AuthCredentials } from '../../types/auth.type'
import { registerApi } from '../../apis/auth.api'
import { omit } from 'lodash'
import { isAxios422Error } from '../../utils/error'
import { ApiResponse } from '../../types/utils.type'
import { toast } from 'react-toastify'

export default function Register() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<RegisterValidationSchema>({
    resolver: yupResolver(registerValidationSchema)
  })

  const registerMutation = useMutation({
    mutationFn: (body: AuthCredentials) => registerApi(body)
  })

  const handleRegisterSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerMutation.mutate(body, {
      onSuccess: (data) => {
        toast.success(data.data.message)
        navigate('/')
      },
      onError: (error) => {
        if (isAxios422Error<ApiResponse<AuthCredentials>>(error)) {
          // error: AxiosError<ApiResponse<AuthCredentials>>:
          //        message:  string
          //        code:     string
          //        response: ApiResponse<AuthCredentials>
          //                  status: number
          //                  statusText: string
          //                  data: AuthCredentials
          //                        email: string
          //                        password: string

          // error.message: 'Request failed with status code 422'
          // error.code:    'ERR_BAD_REQUEST'
          // error.response
          //               .status:     422
          //               .statusText: ''
          //               .data
          //                    .message:    'Lỗi'
          //                    .data
          //                         .email?:    // If an error exists in the email input
          //                         .password?: // If an error exists in the password input

          const authInputError = error.response?.data.data
          // When the object does not have many fields
          // In this case, the object only has 2 fields: email and password
          // We can use this approach:

          // if (authInputError?.email) {
          //   setError('email', {
          //     message: authInputError.email
          //   })
          // }
          // if (authInputError?.password) {
          //   setError('password', {
          //     message: authInputError.password
          //   })
          // }

          // But in case there are so many keys in the object
          // Loop through each key and check:
          if (authInputError) {
            Object.keys(authInputError).forEach((key) => {
              setError(key as keyof AuthCredentials, {
                message: authInputError[key as keyof AuthCredentials]
              })
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
            <form className='p-10 rounded bg-white shadow-sm' noValidate onSubmit={handleRegisterSubmit}>
              <div className='mb-8 text-2xl'>Đăng ký</div>
              <AuthInput<RegisterValidationSchema>
                type='email'
                placeholder='Email'
                name='email'
                register={register}
                errorMessage={errors?.email?.message as string}
              />
              <AuthInput<RegisterValidationSchema>
                type='password'
                placeholder='Mật khẩu'
                name='password'
                register={register}
                errorMessage={errors?.password?.message as string}
                autoComplete='on'
              />
              <AuthInput<RegisterValidationSchema>
                type='password'
                placeholder='Nhập lại mật khẩu'
                name='confirm_password'
                register={register}
                errorMessage={errors?.confirm_password?.message as string}
                autoComplete='on'
              />
              <div className='mt-5'>
                <button className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'>
                  Đăng ký
                </button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link className='text-red-400 ml-1' to='/login'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
