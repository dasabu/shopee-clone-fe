import React from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

interface AuthInputProps<T extends FieldValues> {
  type: React.HTMLInputTypeAttribute
  placeholder: string
  name: Path<T>
  errorMessage?: string

  register: UseFormRegister<T>

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
