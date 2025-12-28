import React from 'react'
import Testimonial from './Testimonial'

const PricingLast = () => {
  return (
    <section className="flex mt-[-15px] flex-col items-center justify-center max-md:px-2 w-full text-center py-20 md:py-24 bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/banners/image-2.png')] bg-cover bg-center bg-no-repeat">
                <h1 className="text-2xl md:text-3xl font-medium text-white max-w-2xl">Empower Your Sales & Marketing with a Next-Gen AI Workforce</h1>
                <div className="h-[3px] w-32 my-1 bg-gradient-to-l from-transparent to-white"></div>
                <p className="text-sm md:text-base text-white max-w-xl">
                    Leverage AI Agents for real-time calling and unified multi-channel engagement, optimizing customer interactions at scale.
                </p>
                <button className="px-10 py-3 mt-4 text-sm bg-white text-blue-600 font-semibold hover:scale-105 transition duration-300 rounded-full">
                    Our Community Work
                </button>
                <Testimonial/>
            </section>
  )
}

export default PricingLast