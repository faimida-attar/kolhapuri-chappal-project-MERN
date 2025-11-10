import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  const policies = [
    {
      icon: assets.exchange_icon,
      title: "Easy Exchange Policy",
      desc: "Hassle-free exchange within days",
      color: "bg-purple-100",
    },
    {
      icon: assets.quality_icon,
      title: "7 Days Return Policy",
      desc: "Enjoy 7 days free return on orders",
      color: "bg-pink-100",
    },
    {
      icon: assets.support_img,
      title: "24/7 Customer Support",
      desc: "Always ready to help you anytime",
      color: "bg-green-100",
    }
  ];

  return (
    <div className='flex flex-col sm:flex-row justify-around gap-8 sm:gap-4 text-center py-20 px-4 sm:px-16 text-xs sm:text-sm md:text-base text-gray-700'>
      {policies.map((policy, index) => (
        <div
          key={index}
          className='flex flex-col items-center gap-3 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300'
        >
          <div className={`p-4 rounded-full ${policy.color} mb-3`}>
            <img src={policy.icon} className='w-12 h-12' alt={policy.title} />
          </div>
          <p className='font-semibold text-gray-800'>{policy.title}</p>
          <p className='text-gray-500 text-sm'>{policy.desc}</p>
        </div>
      ))}
    </div>
  )
}

export default OurPolicy
