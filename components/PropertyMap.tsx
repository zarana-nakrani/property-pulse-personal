'use client';
import'mapbox-gl/dist/mapbox-gl.css';
import { IProperty } from '@/models/Property'
import { useState, useEffect } from 'react'
import { Map, MapLib, Marker } from 'react-map-gl';
import { setDefaults, fromAddress, OutputFormat } from 'react-geocode';
import Spinner from './Spinner';
import Image from 'next/image';
import pin from '@/assets/images/pin.svg';
import React from 'react'
import mapboxgl from 'mapbox-gl';

const PropertyMap = ({ property }:{
    property: IProperty,
} ) => {
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [geoCodeError, setGeoCodeError] = useState(false);
    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 12,
        width: '100%',
        height: '500px'
    });

    const [loading, setLoading] = useState(true);
    setDefaults({
        key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
        language:'en',
        region: 'us',
        outputFormat: OutputFormat.JSON
    })

    useEffect(() => {
        const fetchCoords = async () => {
        try {
                const res = await fromAddress(`${property.location?.street} ${property.location?.city} ${property.location?.state} ${property.location?.zipcode}`);

                //Check if results array has any elements
                if(res.results.length === 0){
                    setGeoCodeError(true);
                    setLoading(false);
                    return;
                }
                const {lat, lng} = res.results[0].geometry.location;
    
                setLat(lat);
                setLng(lng);
                setViewport({
                    ...viewport,
                    latitude: lat,
                    longitude: lng,
                })
                setLoading(false);
            }
         catch (error) {
            console.log(error);
            setGeoCodeError(true);
            setLoading(false)
        }
    };
        fetchCoords();
    }, [])

    if(loading) return (<Spinner loading={loading} />)
    if(geoCodeError) {
        //Handle the case where geocoding fails
        return (<div className='text-xl'>No location data found.</div>)
    }
  return (
    !loading && (
        <Map 
        mapboxAccessToken={ process.env.NEXT_PUBLIC_MAPBOX_TOKEN }
        mapLib={mapboxgl as any}
        initialViewState={{
            latitude: lat,
            longitude: lng,
            zoom:15
        }}
        style={{width: '100%', height:500}}
        mapStyle={'mapbox://styles/mapbox/streets-v9'}>
            <Marker
            latitude={lat ? lat as number : 0}
            longitude={lng ? lng as number : 0}
            anchor='bottom'>
                <Image src={pin} alt='location' width={40} height={40}/>
            </Marker>
        </Map>
    ) 
  )
}

export default PropertyMap