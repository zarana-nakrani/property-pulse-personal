'use client';
import React from 'react'
import { useRouter, useParams, useSearchParams } from 'next/navigation'

type Props = {}

const PropertyPageId = (props: Props) => {
    const router = useRouter();
    const { id } = useParams();
    const searchParams  = useSearchParams();
    const name = searchParams.get('name');
  return (
    <div>
        <p>PropertyPageId</p>
        <button onClick={() => router.push('/')} className='bg-blue-400 p-2'>Go Home from { name }</button>
    </div>

  )
}

export default PropertyPageId