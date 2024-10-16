import React from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface AuthInputProps {
  type: React.HTMLInputTypeAttribute
  placeholder: string
  name: string
  errorMessage?: string

  register: UseFormRegister<any>
  authRule: RegisterOptions

  autoComplete?: string
}

export default function AuthInput({
  type,
  placeholder,
  name,
  errorMessage,
  register,
  authRule,
  autoComplete
}: AuthInputProps) {
  return (
    <div className='mt-3'>
      <input
        type={type}
        className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(name, authRule)}
      />
      <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errorMessage}</div>
    </div>
  )
}
