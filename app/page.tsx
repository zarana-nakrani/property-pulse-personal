import React from 'react'
import Link from 'next/link'
import Hero from '@/components/Hero'
import InfoBoxes from '@/components/InfoBoxes'
import Footer from '@/components/Footer'
import RecentProperties from '@/components/RecentProperties'
import connectDB from '@/config/database'

type Props = {}

const HomePage = async () => {
  await connectDB();
  return (
    <div>
        <Hero />
        <InfoBoxes />
        <RecentProperties />
    </div>
  )
}

export default HomePage