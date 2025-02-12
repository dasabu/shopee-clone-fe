import AuthHeader from '@/components/AuthHeader'
import Footer from '@/components/Footer'
import React from 'react'

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
