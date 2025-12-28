import React from 'react'
import Hero from '../components/Home/Hero'
import Wedo from '../components/Home/Wedo'
import Features from '../components/Home/Features'
import MidBanner from '../components/Home/MidBanner'
import PricingLast from '../components/Home/PricingLast'

const Home = () => {
  return (
    <div className='w-full'>
        <Hero/>
        <Wedo/>
        <Features/>
        <MidBanner/>
        <PricingLast />
    </div>
  )
}

export default Home