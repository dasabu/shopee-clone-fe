import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { authRules } from '../../utils/authRules'
import AuthInput from '../../components/AuthInput'

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
              <div className='mb-8 text-2xl'>Đăng ký</div>
              <AuthInput
                type='email'
                placeholder='Email'
                name='email'
                register={register}
                authRule={authRules.email}
                errorMessage={errors?.email?.message as string}
              />
              <AuthInput
                type='password'
                placeholder='Mật khẩu'
                name='password'
                register={register}
                authRule={authRules.password}
                errorMessage={errors?.password?.message as string}
                autoComplete='on'
              />
              <AuthInput
                type='password'
                placeholder='Nhập lại mật khẩu'
                name='confirm_password'
                register={register}
                authRule={{
                  ...authRules.confirm_password,
                  validate: (value) => value === getValues('password') || 'Mật khẩu không khớp'
                }}
                errorMessage={errors?.confirm_password?.message as string}
                autoComplete='on'
              />
              <div className='mt-5'>
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
