import React from 'react'
import Link from 'next/link'
import Hero from '@/components/Hero'
import InfoBoxes from '@/components/InfoBoxes'
import Footer from '@/components/Footer'
import RecentProperties from '@/components/RecentProperties'

type Props = {}

const HomePage = () => {
  return (
    <div>
        <Hero />
        <InfoBoxes />
        <RecentProperties />
        <Footer />
    </div>
  )
}

export default HomePage