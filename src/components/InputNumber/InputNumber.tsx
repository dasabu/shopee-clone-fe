import { forwardRef, InputHTMLAttributes } from 'react'

export interface InputNumberProps
  extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}

/** Đổi từ component bình thường thành forwardRef component
 * Để component dùng được ref
 * Và truyền ref từ React Hook Form vào component
 **/

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  (
    {
      errorMessage,
      className,
      classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
      classNameError = 'my-2 text-red-600 min-h-[1.25rem] text-sm',
      onChange,
      ...rest
    },
    ref
  ) => {
    /** Không cho nhập ký tự khác ngoài số
     * Khi người dùng nhập vào số thì onChange mới chạy, không thì không chạy
     **/
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      if ((/^\d+$/.test(value) || value === '') && onChange) {
        onChange(event)
      }
    }
    return (
      <div className={className}>
        <input
          className={classNameInput}
          onChange={handleChange}
          {...rest}
          ref={ref}
        />
        <div className={classNameError}>{errorMessage}</div>
      </div>
    )
  }
)

export default InputNumber
