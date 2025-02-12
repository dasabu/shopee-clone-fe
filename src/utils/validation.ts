import * as yup from 'yup'

export const registerValidationSchema = yup.object({
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
    .oneOf([yup.ref('password')], 'Mật khẩu nhập lại không khớp')
})

// Login
export const loginValidationSchema = registerValidationSchema.omit(['confirm_password'])
