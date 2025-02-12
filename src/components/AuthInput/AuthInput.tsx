import React from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

interface AuthInputProps<T extends FieldValues> {
  type: React.HTMLInputTypeAttribute // chặt chẽ hơn string: chỉ nhận các giá trị 'email', 'password',... của thẻ <input/>
  placeholder: string
  name: Path<T> // chỉ nhận vào key của T
  // T = RegisterSchema:  name = 'email' || 'password' || 'confirm_password'
  // T = LoginSchema:     name = 'email' || 'password'
  errorMessage?: string

  register: UseFormRegister<T> // register function interface

  autoComplete?: string
}

export default function AuthInput<T extends FieldValues>({
  type,
  placeholder,
  name,
  errorMessage,
  register,
  autoComplete
}: AuthInputProps<T>) {
  return (
    <div className='mt-3'>
      <input
        type={type}
        className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(name)}
      />
      <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errorMessage}</div>
    </div>
  )
}
