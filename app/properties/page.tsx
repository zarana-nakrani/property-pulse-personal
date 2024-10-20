import React from 'react'
import PropertyCard from '@/components/PropertyCard'
import { error } from 'console';
import {type IProperty} from '@/models/Property';
import { fetchProperties } from '@/utils/requests';
type Props = {}



const PropertiesPage = async () => {
  const properties: IProperty[] = await fetchProperties();
  properties.sort((a: IProperty ,b:  IProperty) => new Date(a.createdAt ?? "").getDate() - new Date(b.createdAt ?? "").getDate())
  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {properties.map((property: any) => (
            <PropertyCard keys={property._id} property={property}/>
          ))} 
        </div>
        )}
      </div>
    </section>
  )
}

export default PropertiesPage