import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'
import Link from 'next/link'


const NotFoundPage = () => {
  return (
    <section className='bg-blue-50 min-h-screen flex-grow'>
        <div className='container m-auto max-w-2xl py-24'>
            <div className='flex justify-center'>
                <FaExclamationTriangle className='text-8xl text-yellow-400'/>
            </div>
            <div className='text-center'>
                <h1 className='text-3xl font-bold mt-4 mb-2'>Page Not Found</h1>
                <p className='text-gray-500 text-xl mb-10'>
                    The Page you are looking for does not exist.
                </p>
                <Link href='/' className='bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded'>Go Home</Link>
            </div>
        </div>
    </section>
  )
}

export default NotFoundPage