import React from 'react'
import { Link } from 'react-router-dom'

export default function RegisterHeader() {
  return (
    <header className='py-5'>
      <div className='max-w-7xl mx-auto px-4'>
        <nav className='flex items-end'>
          <Link to='/'>
            <img className='h-8 lg:h-11' src='/src/assets/shopee-logo.svg' alt='Shopee Logo' />
          </Link>
          <div className='ml-5 text-xl lg:text-2xl'>Đăng ký</div>
        </nav>
      </div>
    </header>
  )
}
