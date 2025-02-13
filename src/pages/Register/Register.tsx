import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import { toast } from 'react-toastify'
import { useContext } from 'react'

import Input from '@/components/Input'
import { registerValidationSchema } from '@/utils/validation'
import { isAxios422Error } from '@/utils/error'
import { AuthCredentials } from '@/types/auth.type'
import { ErrorResponse } from '@/types/utils.type'
import { registerApi } from '@/apis/auth.api'
import { AppContext } from '@/contexts/app.context'
import Button from '@/components/Button'

type RegisterValidationSchema = yup.InferType<typeof registerValidationSchema>

export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
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
        setProfile(data.data.data.user)
        setIsAuthenticated(true)
        toast.success(data.data.message)
        navigate('/')
      },
      onError: (error) => {
        // Hiển thị lỗi cho từng input
        if (isAxios422Error<ErrorResponse<AuthCredentials>>(error)) {
          // Trong trường hợp lỗi 422 thì error là object như sau:
          // error: AxiosError<ErrorResponse<AuthCredentials>>:
          //        message:  string
          //        code:     string
          //        response: ErrorResponse<AuthCredentials>
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
          // Trong trường hợp object không có nhiều field (chỉ có email và password) thì có thể làm như sau:
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

          // Nhưng đối với object có rất nhiều field: lặp qua từng field và check
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
        <div className='grid grid-cols-1 md:px-52 sm:px-24 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form
              className='p-10 rounded bg-white shadow-sm'
              noValidate
              onSubmit={handleRegisterSubmit}
            >
              <div className='mb-8 text-2xl'>Đăng ký</div>
              <Input<RegisterValidationSchema>
                type='email'
                placeholder='Email'
                name='email'
                register={register}
                errorMessage={errors?.email?.message as string}
              />
              <Input<RegisterValidationSchema>
                type='password'
                placeholder='Mật khẩu'
                name='password'
                register={register}
                errorMessage={errors?.password?.message as string}
                autoComplete='on'
              />
              <Input<RegisterValidationSchema>
                type='password'
                placeholder='Nhập lại mật khẩu'
                name='confirm_password'
                register={register}
                errorMessage={errors?.confirm_password?.message as string}
                autoComplete='on'
              />
              <div className='mt-5'>
                <Button
                  type='submit'
                  className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                  isLoading={registerMutation.isPending}
                  disabled={registerMutation.isPending}
                >
                  Đăng ký
                </Button>
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
