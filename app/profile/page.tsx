'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import profileDefault from '@/assets/images/profile.png'
import { useState, useEffect } from 'react'
import Spinner from '@/components/Spinner'
import { UserSession } from '@/utils/authOptions'
import { IProperty } from '@/models/Property'
import type { ObjectId } from 'mongodb'
import { Bounce, toast } from 'react-toastify'

type Props = {}

const ProfilePage = (props: Props) => {

  const {data: session} = useSession();
  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProperties = async (userId: string) => {
      if(!userId){
        return;
      }
      try {
        const res = await fetch(`/api/properties/user/${userId}`);
        if(res.status === 200){
          const data = await res.json();
          setProperties(data)
        }
        
      } catch (error) {
        console.log(error)
      }
      finally{
        setLoading(false);
      }
    } 
    //Fetch user propertie when session is available
    if((session as UserSession)?.user.id){
      fetchUserProperties((session as UserSession)?.user.id)
    }
  }, [session])

  const handleDeleteProperty =  async (propertyId: ObjectId | undefined) => {
    const confirmed = confirm('Are you sure you want to delete a property?');
    if(!confirmed){
      return;
    }

    try {
      const res = await fetch(`/api/properties/${propertyId}`, {method: 'DELETE'});

      if(res.status === 200){
        const updatedProperties = properties.filter((property:IProperty) => property._id !== propertyId)
        setProperties(updatedProperties);
        toast.success('Property Deleted', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
      else{
        toast.error('Failed to delete property');  
      }
    } catch (error) {
      toast.error('Failed to delete property');
    }
  };
  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0 "
                  src={profileImage || profileDefault}
                  alt="User"
                  width={200}
                  height={200}
                />
              </div>

              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span> {profileName}
              </h2>
              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Email: </span> {profileEmail}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              {!loading && properties.length === 0 && (
                <p>You have no property listings</p>
              )}
              {loading ? (<Spinner loading={loading}/>) : (
                properties.map((property: IProperty) => (
                  <div key={property._id?.toString()} className="mb-10">
                <Link href={`/properties/${property._id}`}>
                  <Image
                    className="h-32 w-full rounded-md object-cover"
                    src={property.images ? property.images[0] : ""}
                    alt="Property 1"
                    width={200}
                    height={200}
                    priority={true}
                  />
                </Link>
                <div className="mt-2">
                  <p className="text-lg font-semibold">{property.name}</p>
                  <p className="text-gray-600">Address: {property.location?.street} {property.location?.city} {property.location?.state}</p>
                </div>
                <div className="mt-2">
                  <Link
                    href={`/properties/${property._id}/edit`}
                    className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                  >
                    Edit
                  </Link>
                  <button
                  onClick={() => handleDeleteProperty(property._id)}
                    className="bg-red-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                    type="button"
                  >
                    Delete
                  </button>
                </div>
              </div>    
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfilePage