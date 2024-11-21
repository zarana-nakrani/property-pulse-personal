'use client'
import { useState, useEffect } from 'react'
type Props = {}
type formFields = {
    type: string,
    name: string,
    description?: string,
    location: {
        street?: '',
        city: string,
        state: string,
        zipcode?: '',
    },
        beds: string,
        baths: string,
        square_feet: string,
        amenities: string[],
        rates: {
            weekly?: string,
            monthly?: string,
            nightly?: string,
        },
        seller_info: {
            name: string,
            email: string,
            phone: string,
        },
        images: {}[],
}
const PropertyAddForm = (props: Props) => {

    const [mounted, setMounted] = useState(false);
    const [fields, setFields] = useState<formFields>({
        type: '',
        name: '',
        description: '',
        location: {
            street: '',
            city: '',
            state: '',
            zipcode: '',
        },
        beds: '',
        baths: '',
        square_feet: '',
        amenities: [''],
        rates: {
            weekly: '',
            monthly: '',
            nightly: '',
        },
        seller_info: {
            name: '',
            email: '',
            phone: '',
        },
        images: [{}],
    })


    useEffect(() => {
        setMounted(true);
    })

    const handleChange = (e: React.FormEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>): void => {

      const {name, value} = e.currentTarget;
      //Check if there exists a nested property
      if(name.includes('.')){
        const [outerKey, innerKey] = name.split('.') as [keyof formFields, string]
        setFields((prevFields) => ({
          ...prevFields,
          [outerKey]: {
            ...prevFields[outerKey] as Record<string, any>,
            [innerKey]: value,
          }
        }))
      } else {
        //if not directly update value for that field
        setFields((prevFields) => ({
          ...prevFields,
          [name]: value,
        }))
      }
    }
    const handleAmenitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {value, checked} = e.currentTarget

      //clone current array
      const updatedAmenities = [...fields.amenities]

      if(checked) {
        //Add value to array
        updatedAmenities.push(value);
      } else {
        //remove value from array
        const index = updatedAmenities.indexOf(value);
        
        if(index !== -1) {
          updatedAmenities.splice(index, 1)
        }
      }

      setFields((prevFields) => ({
        ...prevFields,
        amenities: updatedAmenities,
      }))
    }
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e.currentTarget;
      console.log(files)
      //Clone Existing Images Array
      const updatedImages = [...fields.images];

      //Add new files to the array
      if(files) {
        for(const file of files) {
          updatedImages.push(file)
        }
      }

      setFields((prevFields) => ({
        ...prevFields,
        images: updatedImages,
      }))
    }


  return mounted &&
    <form action='/api/properties' method='POST' encType='multipart/form-data'>
            <h2 className='text-3xl text-center font-semibold mb-6'>
              Add Property
            </h2>

            <div className='mb-4'>
              <label htmlFor="type" className='block text-gray-700 font-bold mb-2'>
                Property Type
              </label>
              <select
              id="type" 
              name="type" 
              className='border rounded w-full py-2 px-3' required
              value={fields.type}
              onChange={handleChange}>
                <option value="Apartment">Apartment</option>
                <option value="Condo">Condo</option>
                <option value="House">House</option>
                <option value="CabinOrCottage">Cabin or Cottage</option>
                <option value="Room">Room</option>
                <option value="Studio">Studio</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Listing Name
              </label>
                <input type="text" name="name" id="name" className='border rounded w-full py-2 px-3 mb-2' placeholder='eg. Beautiful Apartment in Miami' required value={fields.name} onChange={handleChange}/>
            </div>

            <div className='mb-4'>
              <label htmlFor='Description' className='block text-gray-700 font-bold mb-2'>
               Description
              </label>
                <textarea name="description" 
                id="description" 
                rows={4}
                className='border rounded w-full py-2 px-3 mb-2' placeholder='Add an optional description of your property' 
                value={fields.description}
              onChange={handleChange}/>
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Location
              </label>
                <input type="text" name="location.street" id="street" className='border rounded w-full py-2 px-3 mb-2' placeholder='Street' 
                value={fields.location.street}
                onChange={handleChange}/>

                <input type="text" name="location.city" id="city" className='border rounded w-full py-2 px-3 mb-2' placeholder='City' 
                value={fields.location.city}
                onChange={handleChange}/>

                <input type="text" name="location.state" id="state" className='border rounded w-full py-2 px-3 mb-2' placeholder='State' 
                value={fields.location.state}
                onChange={handleChange}/>

                <input type="text" name="location.zipcode" id="zipcode" className='border rounded w-full py-2 px-3 mb-2' placeholder='Zipcode' 
                value={fields.location.zipcode}
                onChange={handleChange}/>
            </div>

            <div className='mb-4 flex flex-wrap'>
              <div className='w-fulll sm:w-1/3 pr-2'>
              <label className='block text-gray-700 font-bold mb-2'>
                Beds
              </label>
                <input type="number" name="beds" id="beds" className='border rounded w-full py-2 px-3' required
                value={fields.beds}
                onChange={handleChange}/>
              </div>
              <div className='w-fulll sm:w-1/3 px-2'>
              <label className='block text-gray-700 font-bold mb-2'>
                Baths
              </label>
                <input type="number" name="baths" id="baths" className='border rounded w-full py-2 px-3' required
                value={fields.baths}
                onChange={handleChange}/>
              </div>
              <div className='w-fulll sm:w-1/3 pl-2'>
              <label className='block text-gray-700 font-bold mb-2'>
                Square Feet
              </label>
                <input type="number" name="square_feet" id="square_feet" className='border rounded w-full py-2 px-3' required
                value={fields.square_feet}
                onChange={handleChange}/>
              </div>
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Amenities
              </label>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
                <div>
                <input type="checkbox" name="amenities" id="amenity_wifi"
                value="Wifi" className='mr-2' 
                checked = { fields.amenities.includes("Wifi") }
                onChange={handleAmenitiesChange}/>
                <label htmlFor="amenity_wifi">Wifi</label>
                </div>

                <div>
                <input type="checkbox" name="amenities" id="amenity_kitchen"
                value="Full Kitchen" className='mr-2' 
                checked = { fields.amenities.includes("Full Kitchen") }
                onChange={handleAmenitiesChange}/>
                <label htmlFor="amenity_kitchen">kitchen</label>
                </div>

                <div>
                <input type="checkbox" name="amenities" id="amenity_washer_dryer"
                value="Washer & Dryer" className='mr-2' 
                checked = { fields.amenities.includes("Washer & Dryer") }
                onChange={handleAmenitiesChange}/>
                <label htmlFor="amenity_washer_dryer">Washer & Dryer</label>
                </div>

                <div>
                <input type="checkbox" name="amenities" id="amenity_free_parking"
                value="Free Parking" className='mr-2' 
                checked = { fields.amenities.includes("Free Parking") }
                onChange={handleAmenitiesChange}/>
                <label htmlFor="amenity_free_parking">Free Parking</label>
                </div>

                <div>
                <input type="checkbox" name="amenities" id="amenity_pool"
                value="Swimming Pool" className='mr-2' 
                checked = { fields.amenities.includes("Swimming Pool") }
                onChange={handleAmenitiesChange} />
                <label htmlFor="amenity_pool">Swimming Pool</label>
                </div>

                <div>
                <input type="checkbox" name="amenities" id="amenity_hot
                _tub"
                value="Hot Tub" className='mr-2' 
                checked = { fields.amenities.includes("Hot Tub") }
                onChange={handleAmenitiesChange}/>
                <label htmlFor="amenity_hot_tub">Hot Tub</label>
                </div>

                <div>
                <input type="checkbox" name="amenities" id="amenity_24_7_security"
                value="24/7 Security" className='mr-2' 
                checked = { fields.amenities.includes("24/7 Security") }
                onChange={handleAmenitiesChange}/>
                <label htmlFor="amenity_24_7_security">24/7 Security</label>
                </div>
                <div>
                <input type="checkbox" name="amenities" id="amenity_wheelchair_accessible"
                value="Wheelchair Accessible" className='mr-2' 
                checked = { fields.amenities.includes("Wheelchair Accessible") }
                onChange={handleAmenitiesChange}/>
                <label htmlFor="amenity_wheelchair_accessible">Wheelchair Accessible</label>
                </div>

                <div>
                <input type="checkbox" name="amenities" id="amenity_elevator_access"
                value="Elevator Access" className='mr-2' 
                checked = { fields.amenities.includes("Elevator Access") }
                onChange={handleAmenitiesChange}/>
                <label htmlFor="amenity_elevator_access">Elevator Access</label>
                </div>

                <div>
                <input type="checkbox" name="amenities" id="amenity_dishwasher"
                value="Dishwasher" className='mr-2' 
                checked = { fields.amenities.includes("Dishwasher") }
                onChange={handleAmenitiesChange}/>
                <label htmlFor="amenity_dishwasher">Dishwasher</label>
                </div>

                <div>
                <input type="checkbox" name="amenities" id="amenity_gym_fitness_center"
                value="Gym/Fitness Center" className='mr-2' 
                checked = { fields.amenities.includes("Gym/Fitness Center") }
                onChange={handleAmenitiesChange}/>
                <label htmlFor="amenity_gym_fitness_center">Gym/Fitness Center</label>
                </div>

                <div>
                <input type="checkbox" name="amenities" id="amenity_balcony_patio"
                value="Balcony/Patio" className='mr-2'
                checked = { fields.amenities.includes("Balcony/Patio") }
                onChange={handleAmenitiesChange} />
                <label htmlFor="amenity_balcony_patio">Balcony/Patio</label>
                </div>

                <div>
                <input type="checkbox" name="amenities" id="amenity_smart_tv"
                value="Smart TV" className='mr-2' 
                checked = { fields.amenities.includes("Smart TV") }
                onChange={handleAmenitiesChange}/>
                <label htmlFor="amenity_smart_tv">Smart TV</label>
                </div>

                <div>
                <input type="checkbox" name="amenities" id="amenity_coffee_maker"
                value="Coffee Maker" className='mr-2' 
                checked = { fields.amenities.includes("Coffee Maker") }
                onChange={handleAmenitiesChange}/>
                <label htmlFor="amenity_coffee_maker">Coffee Maker</label>
                </div>
              </div>
            </div>  

            <div className='mb-4 bg-blue-50 p-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Rates (leave blank if not applicable)
              </label>
                <div className='flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm: space-x-4'>
                  <div className="flex items-center">
                    <label htmlFor="weekly_rate" className='mr-2'>
                      Weekly
                    </label>
                    <input type="number" name="rates.weekly" id="weekly_rates" className='border rounded w-full py-2 px-3' 
                    value={fields.rates.weekly}
                    onChange={handleChange}/>
                  </div>

                  <div className="flex items-center">
                    <label htmlFor="monthly_rate" className='mr-2'>
                      Monthly
                    </label>
                    <input type="number" name="rates.monthly" id="monthly_rates" className='border rounded w-full py-2 px-3' 
                    value={fields.rates.monthly}
                    onChange={handleChange}/>
                  </div>

                  <div className="flex items-center">
                    <label htmlFor="nightly_rate" className='mr-2'>
                      Nightly
                    </label>
                    <input type="number" name="rates.nightly" id="nightly_rates" className='border rounded w-full py-2 px-3' 
                    value={fields.rates.nightly}
                    onChange={handleChange}/>
                  </div>
                </div>
              </div>          

              <div className='mb-4'>
                <label htmlFor="seller_name" className='block text-gray-700 font-bold mb-2'>
                  Seller Name
                </label>

                <input type="text" id='seller_name'
                name='seller_info.name'
                className='border rounded w-full py-2 px-3' placeholder='Name' 
                value={fields.seller_info.name}
                onChange={handleChange}/>
              </div>

              <div className='mb-4'>
                <label htmlFor="seller_email" className='block text-gray-700 font-bold mb-2'>
                  Seller Email
                </label>

                <input type="email" id='seller_email'
                name='seller_info.email'
                className='border rounded w-full py-2 px-3' placeholder='Email Address' required 
                value={fields.seller_info.email}
                onChange={handleChange}/>
              </div>

              <div className='mb-4'>
                <label htmlFor="seller_phone" className='block text-gray-700 font-bold mb-2'>
                  Seller Phone
                </label>

                <input type="tel" id='seller_phone'
                name='seller_info.phone'
                className='border rounded w-full py-2 px-3' placeholder='Phone' 
                value={fields.seller_info.phone}
                onChange={handleChange}/>
              </div>

              <div className='mb-4'>
                <label htmlFor="images" className='block text-gray-700 font-bold mb-2'>
                  Images (Select up to 4 images)
                </label>

                <input type="file" id='images'
                name='images'
                className='border rounded w-full py-2 px-3' accept='image/*' multiple required
                onChange={handleImageChange}/>
              </div>

              <div>
                <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline' type='submit'>
                  Add Property
                </button>
              </div>
          </form>
}

export default PropertyAddForm