'use client';
import React from 'react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { fetchProperty } from '@/utils/requests';
import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import {type IProperty} from '@/models/Property';
import Link from 'next/link';
import { FaBed, FaBookmark, FaPaperPlane, FaRulerCombined, FaShare } from 'react-icons/fa'
import { FaArrowLeft, FaBath, FaLocationDot, FaXmark } from 'react-icons/fa6'
import PropertyDetails from '@/components/PropertyDetails';
import BookmarksButton from '@/components/BookmarksButton';
import ShareButtons from '@/components/ShareButtons';
import PropertyContactForm from '@/components/PropertyContactForm';
import Spinner from '@/components/Spinner';
import PropertyImages from '@/components/PropertyImages';

type Props = {}

const PropertyPageId = () => {
  
  const { id }  = useParams();
  const [property, setProperty] = useState<IProperty>();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchPropertyData = async () => {
      console.log('property data is called')
      if(!id) return;
      try {
        const property = await fetchProperty(id);
        setProperty(property);
        console.log("property is", property)
      } catch (error) {
        console.error('Error fetching property ', error);
      } finally {
        setLoading(false)
      }
    }
    console.log("property before", property)
    if(property === null || property === undefined) {
      fetchPropertyData()
    }
  }, [id, property])

  if(!property && !loading){
    return (
      <h1 className='text-center text-2xl font-bold mt-10'>Property Not Found</h1>
    )
  }

  return (
    <>
    {loading && <Spinner loading={loading} />}
    {!loading && property && (
      <>
        <PropertyHeaderImage image={property.images ? property.images[0] : ""} property={property}/>

    {/* Go Back to properties link */}
        <section>
          <div className='container m-auto py-6 px-6'>
            <Link href="/properties" className='text-blue-500 hover:text-blue-600 flex items-center'>
            <FaArrowLeft />Back to Properties
            </Link>
          </div>
      </section>

    {/* Property Info */}
    <section>
        <div className='bg-blue-50'>
            <div className='container m-auto py-10 px-6'>
                <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
                    <PropertyDetails property={property}/>

                    {/* Sidebar */}
                    <aside className='space-y-4'>
                        <BookmarksButton property={property}/>
                        <ShareButtons property={property}/>

                    {/* Contact form */}
                    <PropertyContactForm property={property}/>
                    </aside>
                </div>
            </div>
        </div>
    </section>
    <PropertyImages images={property.images ?? [""]}/>
      </>
    )}
    </>

  )
}

export default PropertyPageId