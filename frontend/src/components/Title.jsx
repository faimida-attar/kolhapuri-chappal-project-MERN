import React from 'react'

const Title = ({ text1, text2 }) => {
  return (
    <div className='flex items-center gap-3 mb-4 justify-center sm:justify-start'>
      {/* Text */}
      <p className='text-gray-500 text-sm sm:text-base'>
        {text1}{' '}
        <span className='text-gray-800 font-semibold tracking-wide text-lg sm:text-xl'>
          {text2}
        </span>
      </p>
      {/* Decorative line with gradient */}
      <div className='flex-1 h-[2px] sm:h-[3px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full'></div>
    </div>
  )
}

export default Title
