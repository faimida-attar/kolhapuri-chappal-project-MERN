import React, { useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import { MdLocationOn, MdPhone, MdEmail } from 'react-icons/md'

const Contact = () => {
  const [showModal, setShowModal] = useState(false)

  const toggleModal = () => setShowModal(!showModal)

  const onSubmitHandler = (e) => {
    e.preventDefault()
    alert("Thank you for your feedback! We'll get back to you soon.")
    setShowModal(false)
  }

  return (
    <div className="px-4 md:px-16 relative">
      {/* Header */}
      <div className='text-center text-3xl md:text-4xl pt-10 border-t font-bold text-gray-800'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      {/* Contact Section */}
      <div className='my-10 flex flex-col md:flex-row gap-10 mb-28 items-center relative'>
        {/* Background Circles */}
        <div className='absolute top-0 left-1/4 w-40 h-40 bg-purple-200 rounded-full opacity-30 animate-pulse hidden md:block'></div>
        <div className='absolute bottom-0 right-1/3 w-52 h-52 bg-purple-300 rounded-full opacity-20 animate-ping hidden md:block'></div>

        {/* Image */}
        <img 
          className='w-full md:max-w-[480px] rounded-xl shadow-2xl hover:scale-105 transition-transform duration-500' 
          src={assets.contact_img} 
          alt="Contact" 
        />

        {/* Info */}
        <div className='flex flex-col gap-6 md:w-2/4 bg-gradient-to-tr from-purple-50 to-white rounded-xl shadow-xl p-8 md:p-12 transition-all duration-500 hover:scale-102 hover:shadow-2xl'>
          
          <p className='font-semibold text-xl text-gray-700 flex items-center gap-2'>
            <MdLocationOn className='text-purple-600 animate-bounce' /> Our Store
          </p>
          <p className='text-gray-600 pl-6'>CS No. 2191 , BDO Office, Panchayat Samiti Kagal, Kolhapur</p>
          
          <p className='font-semibold text-xl text-gray-700 flex items-center gap-2'>
            <MdPhone className='text-purple-600 animate-bounce' /> Phone
          </p>
          <p className='text-gray-600 pl-6'>9876543210</p>
          
          <p className='font-semibold text-xl text-gray-700 flex items-center gap-2'>
            <MdEmail className='text-purple-600 animate-bounce' /> Email
          </p>
          <p className='text-gray-600 pl-6'>faimida@.com</p>

          <p className='font-semibold text-xl text-gray-700 mt-4'>Careers & Feedback</p>
          <p className='text-gray-600'>Explore opportunities or give us your feedback!</p>

          <button 
            onClick={toggleModal}
            className='bg-gradient-to-r from-purple-600 to-purple-400 text-white px-8 py-4 rounded-full shadow-lg hover:from-purple-800 hover:to-purple-500 hover:scale-105 transition-all duration-500 hover:shadow-purple-500/50'
          >
            Give Feedback
          </button>
        </div>
      </div>

      {/* Newsletter */}
      <NewsletterBox />

      {/* Feedback Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 relative animate-fadeIn">
            {/* Close Button */}
            <button 
              onClick={toggleModal} 
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold text-lg"
            >
              &times;
            </button>

            {/* Modal Title */}
            <h2 className="text-2xl font-semibold text-purple-600 mb-4 text-center">Feedback Form</h2>

            {/* Form */}
            <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
              <input type="text" placeholder="Full Name" required className="border px-3 py-2 rounded-md outline-none" />
              <input type="email" placeholder="Email" required className="border px-3 py-2 rounded-md outline-none" />
              <textarea placeholder="Your Message" rows="4" className="border px-3 py-2 rounded-md outline-none"></textarea>
              <button type="submit" className="bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-all duration-300">
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Contact
