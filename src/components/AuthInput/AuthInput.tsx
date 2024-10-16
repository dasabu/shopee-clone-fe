import React from 'react'
import { UseFormRegister } from 'react-hook-form'
import { RegisterValidationSchema } from '../../utils/validation'
interface AuthInputProps {
  type: React.HTMLInputTypeAttribute
  placeholder: string
  name: keyof RegisterValidationSchema // 'name' || 'password' || 'confirm_password'
  errorMessage?: string

  register: UseFormRegister<RegisterValidationSchema>

  autoComplete?: string
}

export default function AuthInput({ type, placeholder, name, errorMessage, register, autoComplete }: AuthInputProps) {
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
