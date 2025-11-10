import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa'

const Verify = () => {

  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext)
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState('pending') // pending, success, error

  const success = searchParams.get('success')
  const orderId = searchParams.get('orderId')

  const verifyPayment = async () => {
    try {
      if (!token) return

      setStatus('pending')
      const response = await axios.post(
        backendUrl + '/api/order/verifyStripe', 
        { success, orderId }, 
        { headers: { token } }
      )

      if (response.data.success) {
        setCartItems({})
        setStatus('success')
        toast.success("Payment verified successfully!")
        setTimeout(() => navigate('/orders'), 2000)
      } else {
        setStatus('error')
        toast.error("Payment verification failed!")
        setTimeout(() => navigate('/cart'), 2000)
      }

    } catch (error) {
      console.log(error)
      setStatus('error')
      toast.error(error.message)
      setTimeout(() => navigate('/cart'), 2000)
    }
  }

  useEffect(() => {
    verifyPayment()
  }, [token])

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4'>
      {status === 'pending' && (
        <div className='flex flex-col items-center gap-4'>
          <FaSpinner className='animate-spin text-purple-600 text-6xl' />
          <p className='text-gray-700 text-lg'>Verifying your payment...</p>
        </div>
      )}

      {status === 'success' && (
        <div className='flex flex-col items-center gap-4'>
          <FaCheckCircle className='text-green-500 text-6xl animate-bounce' />
          <p className='text-gray-700 text-lg'>Payment Successful! Redirecting to Orders...</p>
        </div>
      )}

      {status === 'error' && (
        <div className='flex flex-col items-center gap-4'>
          <FaTimesCircle className='text-red-500 text-6xl animate-bounce' />
          <p className='text-gray-700 text-lg'>Payment Failed! Redirecting to Cart...</p>
        </div>
      )}
    </div>
  )
}

export default Verify
