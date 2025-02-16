import * as yup from 'yup'

function isValidPriceRange(this: yup.TestContext<yup.AnyObject>) {
  const { price_min, price_max } = this.parent
  if (price_max !== '' && price_min !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

export const formSchema = yup.object({
  email: yup
    .string()
    .required('Bạn chưa nhập email')
    .email('Email không đúng định dạng')
    .min(5, 'Email phải có độ dài từ 5 - 160 ký tự')
    .max(160, 'Email phải có độ dài từ 5 - 160 ký tự'),
  password: yup
    .string()
    .required('Bạn chưa nhập mật khẩu')
    .min(6, 'Mật khẩu phải có độ dài từ 6 - 160 ký tự')
    .max(160, 'Mật khẩu phải có độ dài từ 6 - 160 ký tự'),
  confirm_password: yup
    .string()
    .required('Bạn chưa nhập lại mật khẩu')
    .oneOf([yup.ref('password')], 'Mật khẩu nhập lại không khớp'),
  price_min: yup.string().test({
    name: 'invalid-price',
    message: 'Giá không hợp lệ',
    // Viết chung
    test: isValidPriceRange
    // Viết riêng cho từng field
    /*
    test: function (value?: string) {
      const price_min = value ?? ''
      const price_max = this.parent.price_max ?? ''

      if (price_min !== '' && price_max !== '') {
        return Number(price_max) >= Number(price_min)
      }
      return price_min !== '' || price_max !== ''
    }
    */
  }),
  price_max: yup.string().test({
    name: 'invalid-price',
    message: 'Giá không hợp lệ',
    test: isValidPriceRange
  })
})

export type FormSchema = yup.InferType<typeof formSchema>
