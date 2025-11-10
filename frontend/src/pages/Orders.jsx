import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {

  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  const statusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-400';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  }

  return (
    <div className='px-4 md:px-16 pt-16'>
      <div className='text-3xl md:text-4xl font-bold text-gray-800 mb-10'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div className='flex flex-col gap-6'>
        {orderData.length === 0 && (
          <p className='text-gray-500 text-center py-10'>No orders found.</p>
        )}
        {orderData.map((item, index) => (
          <div key={index} className='flex flex-col md:flex-row items-center justify-between bg-white rounded-2xl shadow-md p-4 md:p-6 transition-transform hover:scale-102 hover:shadow-xl gap-4'>
            
            {/* Item Info */}
            <div className='flex items-start gap-4 md:gap-6 w-full md:w-2/3'>
              <img className='w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg shadow-sm' src={item.image[0]} alt={item.name} />
              <div className='flex flex-col justify-between'>
                <p className='font-medium text-gray-800 md:text-lg'>{item.name}</p>
                <div className='flex flex-wrap items-center gap-4 mt-2 text-sm md:text-base text-gray-700'>
                  <p className='font-semibold'>{currency}{item.price}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className='text-gray-500 mt-1 text-sm'>Date: {new Date(item.date).toDateString()}</p>
                <p className='text-gray-500 text-sm'>Payment: {item.paymentMethod}</p>
              </div>
            </div>

            {/* Status and Action */}
            <div className='flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mt-2 md:mt-0'>
              <div className='flex items-center gap-2'>
                <span className={`w-3 h-3 rounded-full ${statusColor(item.status)}`}></span>
                <p className='text-sm md:text-base font-medium'>{item.status}</p>
              </div>
              <button 
                onClick={loadOrderData} 
                className='bg-purple-600 text-white text-sm md:text-base px-5 py-2 rounded-lg shadow hover:bg-purple-700 transition-all duration-300'
              >
                Track Order
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
