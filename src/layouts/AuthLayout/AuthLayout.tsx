import React from 'react'
import AuthHeader from '../../components/AuthHeader'
import Footer from '../../components/Footer'

interface AuthLayoutProps {
  children?: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div>
      <AuthHeader />
      {children}
      <Footer />
    </div>
  )
}
