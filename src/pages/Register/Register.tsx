import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { authRules } from '../../utils/authRules'

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm()

  const handleRegisterSubmit = handleSubmit((data) => {
    console.log(data)
  })

  console.log(errors)

  return (
    <div className='bg-shopee_orange'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' noValidate onSubmit={handleRegisterSubmit}>
              <div className='text-2xl'>Đăng ký</div>
              <div className='mt-8'>
                <input
                  type='email'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  placeholder='Email'
                  {...register('email', authRules.email)}
                />
                <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors?.email?.message as string}</div>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  autoComplete='on'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  placeholder='Password'
                  {...register('password', authRules.password)}
                />
                <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors?.password?.message as string}</div>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  autoComplete='on'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  placeholder='Confirm Password'
                  {...register('confirm_password', {
                    ...authRules.confirm_password,
                    validate: (value) => value === getValues('password') || 'Password không khớp'
                  })}
                />
                <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>
                  {errors?.confirm_password?.message as string}
                </div>
              </div>
              <div className='mt-8'>
                <button className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'>
                  Đăng ký
                </button>
              </div>
              <div className='flex items-center justify-center mt-5'>
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
