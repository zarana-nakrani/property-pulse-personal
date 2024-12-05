'use client'
import React, { SetStateAction } from 'react'
import { useEffect, useState } from 'react'
import PropertyCard from '@/components/PropertyCard'
import { IProperty } from '@/models/Property'
import Spinner from './Spinner'
import Pagination from '@/components/Pagination'



const Properties = () => {
    const [properties, setProperties] = useState<IProperty[]>();
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [totalItems, setTotalItems] = useState(0);


    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const res = await fetch(`api/properties?page=${page}&pageSize=${pageSize}`);
                if(res.ok) {
                    const data = await res.json();
                    setProperties(data.properties);
                    setTotalItems(data.totalProperties)
                    console.log(totalItems)
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }

        fetchProperties();
    }, [page, pageSize])

    const handlePageChange = (newPage: SetStateAction<number>) => {
        setPage(newPage);
    }
  return loading ? <Spinner /> : (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        {properties?.length === 0 ? (
          <p>No properties found</p>
        ) : (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {properties?.map((property: any) => (
            <PropertyCard keys={property._id} property={property}/>
          ))} 
        </div>
        )}
      <Pagination page={page} pageSize={pageSize} totalItems={totalItems} onPageChange={handlePageChange}/>
      </div>
    </section>
  )
}

export default Properties