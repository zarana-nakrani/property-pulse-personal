import React from 'react'
import { ClipLoader } from 'react-spinners'


const Spinner = ({loading} : any) => {
    const override = {
        display: 'block',
        margin: '200px auto',
    }
  return (
    <ClipLoader
        color='#3b82f6' 
        size={150}
        loading={loading}
        cssOverride={override}
        aria-label='Loading Spinner'
    />
  )
}

export default Spinner