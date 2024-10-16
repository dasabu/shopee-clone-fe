import { type RegisterOptions } from 'react-hook-form'

type CustomAuthRule = { [key in 'email' | 'password' | 'confirm_password']: RegisterOptions }

export const authRules: CustomAuthRule = {
  email: {
    required: {
      value: true,
      message: 'Email không được rỗng'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không đúng định dạng'
    },
    minLength: {
      value: 5,
      message: 'Email có độ dài từ 5 - 160 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Email có độ dài từ 5 - 160 ký tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Mật khẩu không được rỗng'
    },
    minLength: {
      value: 6,
      message: 'Mật khẩu có độ dài từ 6 - 160 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Mật khẩu có độ dài từ 6 - 160 ký tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Bạn phải nhập lại mật khẩu'
    }
  }
}
