import { IProperty } from '@/models/Property'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaBed, FaBookmark, FaPaperPlane, FaRulerCombined, FaShare } from 'react-icons/fa'
import { FaArrowLeft, FaBath, FaLocationDot, FaXmark } from 'react-icons/fa6'

type Props = {}

const PropertyHeaderImage = ({image, 
    property,
} : {
    image: string,
    property: IProperty
}) => {
  return (
    <>
    {/* Image Header */}
    <section>
        <div className='container m-auto'>
            <div className='grid grid-cols-1'>
                <Image src={`/images/properties/${image}`}
                alt='property image'
                className='object-cover h-[400px] w-full'
                width={0}
                height={0}
                sizes='100vw'
                priority={true} 
                />
            </div>
        </div>
    </section>

    
    </>
  )
}

export default PropertyHeaderImage