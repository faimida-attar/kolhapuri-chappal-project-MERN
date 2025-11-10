import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate('/collection'); // navigate to the collection page
  }

  return (
    <div className='relative flex flex-col sm:flex-row bg-gray-50 overflow-hidden rounded-xl shadow-lg'>
      
      {/* Hero Left Side */}
      <div className='w-full sm:w-1/2 flex flex-col justify-center items-start p-8 sm:p-16 gap-4 relative z-10'>
        <div className='flex items-center gap-2'>
          <div className='w-10 h-[2px] bg-purple-600'></div>
          <p className='font-medium text-purple-700 uppercase text-sm md:text-base tracking-wider'>Our Bestsellers</p>
        </div>

        <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold leading-snug text-gray-800 drop-shadow-md'>
          Latest Kolhapuri Chappals
        </h1>

        <p className='text-gray-600 text-sm md:text-base sm:max-w-md'>
          Explore our handcrafted Kolhapuri Chappals collection, perfect blend of comfort and traditional design.
        </p>

        <button 
          onClick={handleShopNow}
          className='mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-300'
        >
          Shop Now
        </button>
      </div>

      {/* Hero Right Side */}
      <div className='w-full sm:w-1/2 relative'>
        <img 
          className='w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-700'
          src={assets.hero_img} 
          alt="Kolhapuri Chappals" 
        />
        {/* Optional Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-l from-transparent to-purple-100 opacity-30'></div>
      </div>
    </div>
  )
}

export default Hero;
