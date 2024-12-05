import React from 'react'
import Hero from '@/components/Hero'
import InfoBoxes from '@/components/InfoBoxes'
import RecentProperties from '@/components/RecentProperties'
import FeaturedProperties from '@/components/FeaturedProperties'

const HomePage = () => {
  return (
    <div>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <RecentProperties />
    </div>
  )
}
export default HomePage
