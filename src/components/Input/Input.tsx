import { InputHTMLAttributes } from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

interface InputProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string // css cho input
  classNameError?: string // css cho error message
  errorMessage?: string

  /* React Hook Form */
  register?: UseFormRegister<T> // register function interface
  name?: Path<T> // chỉ nhận vào key của T
  // T = RegisterSchema:  name = 'email' || 'password' || 'confirm_password'
  // T = LoginSchema:     name = 'email' || 'password'
}

export default function Input<T extends FieldValues>({
  errorMessage,
  classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
  classNameError = 'my-2 text-red-600 min-h-[1.25rem] text-sm',
  register,
  name,
  className,
  ...rest
}: InputProps<T>) {
  return (
    <div className={className}>
      <input
        className={classNameInput}
        {...(register && name ? register(name) : {})} // có register và name mới truyền vào
        {...rest}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
