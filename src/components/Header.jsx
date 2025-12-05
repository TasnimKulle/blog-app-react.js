import React from 'react'
import { Link } from 'react-router'

export const Header = () => {
  return (
    <header>
        <div className='bg-white shadow'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
                
                <div className='flex justify-between h-16'>
                    <div className='flex'>
                        <div className='flex-shrink-0 flex items-center'>
                            <Link to='/'>Blogify</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
  )
}
