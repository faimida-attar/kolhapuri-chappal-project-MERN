import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

    const [method, setMethod] = useState('cod');
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
        phone: ''
    })

    const onChangeHandler = (event) => {
        const { name, value } = event.target
        setFormData(data => ({ ...data, [name]: value }))
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name:'Order Payment',
            description:'Order Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                try {
                    const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay',response,{headers:{token}})
                    if (data.success) {
                        navigate('/orders')
                        setCartItems({})
                    }
                } catch (error) {
                    toast.error(error.message)
                }
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {

            let orderItems = []

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }
            
            switch (method) {
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}})
                    if (response.data.success) {
                        setCartItems({})
                        navigate('/orders')
                    } else {
                        toast.error(response.data.message)
                    }
                    break;

                case 'stripe':
                    const responseStripe = await axios.post(backendUrl + '/api/order/stripe',orderData,{headers:{token}})
                    if (responseStripe.data.success) {
                        const {session_url} = responseStripe.data
                        window.location.replace(session_url)
                    } else {
                        toast.error(responseStripe.data.message)
                    }
                    break;

                case 'razorpay':
                    const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, {headers:{token}})
                    if (responseRazorpay.data.success) {
                        initPay(responseRazorpay.data.order)
                    }
                    break;
                default:
                    break;
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-8 sm:gap-12 pt-5 sm:pt-14 min-h-[80vh] border-t px-4 sm:px-16'>

            {/* -------- Left Side: Delivery Info -------- */}
            <div className='flex flex-col gap-5 w-full sm:max-w-[480px] bg-white rounded-xl shadow-lg p-6 sm:p-8'>
                <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded-lg py-2 px-3 w-full focus:ring-2 focus:ring-purple-400 outline-none transition' type="text" placeholder='First name' />
                    <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded-lg py-2 px-3 w-full focus:ring-2 focus:ring-purple-400 outline-none transition' type="text" placeholder='Last name' />
                </div>
                <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded-lg py-2 px-3 w-full focus:ring-2 focus:ring-purple-400 outline-none transition' type="email" placeholder='Email address' />
                <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded-lg py-2 px-3 w-full focus:ring-2 focus:ring-purple-400 outline-none transition' type="text" placeholder='Street' />
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded-lg py-2 px-3 w-full focus:ring-2 focus:ring-purple-400 outline-none transition' type="text" placeholder='City' />
                    <input onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded-lg py-2 px-3 w-full focus:ring-2 focus:ring-purple-400 outline-none transition' type="text" placeholder='State' />
                </div>
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded-lg py-2 px-3 w-full focus:ring-2 focus:ring-purple-400 outline-none transition' type="number" placeholder='Zipcode' />
                    <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded-lg py-2 px-3 w-full focus:ring-2 focus:ring-purple-400 outline-none transition' type="text" placeholder='Country' />
                </div>
                <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded-lg py-2 px-3 w-full focus:ring-2 focus:ring-purple-400 outline-none transition' type="number" placeholder='Phone' />
            </div>

            {/* -------- Right Side: Cart & Payment -------- */}
            <div className='flex flex-col w-full sm:w-[400px] gap-6'>
                <div className='bg-white rounded-xl shadow-lg p-6'>
                    <CartTotal />
                </div>

                <div className='bg-white rounded-xl shadow-lg p-6'>
                    <Title text1={'PAYMENT'} text2={'METHOD'} />
                    <div className='flex flex-col gap-3 mt-4 lg:flex-row'>
                        {/* Stripe */}
                        <div onClick={() => setMethod('stripe')} className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition ${method === 'stripe' ? 'border-purple-600 ring-2 ring-purple-300' : 'hover:border-gray-400'}`}>
                            <p className={`w-4 h-4 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                            <img className='h-6' src={assets.stripe_logo} alt="Stripe" />
                        </div>
                        {/* Razorpay */}
                        <div onClick={() => setMethod('razorpay')} className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition ${method === 'razorpay' ? 'border-purple-600 ring-2 ring-purple-300' : 'hover:border-gray-400'}`}>
                            <p className={`w-4 h-4 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                            <img className='h-6' src={assets.razorpay_logo} alt="Razorpay" />
                        </div>
                        {/* COD */}
                        <div onClick={() => setMethod('cod')} className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition ${method === 'cod' ? 'border-purple-600 ring-2 ring-purple-300' : 'hover:border-gray-400'}`}>
                            <p className={`w-4 h-4 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className='text-gray-600 font-medium'>CASH ON DELIVERY</p>
                        </div>
                    </div>

                    <button type='submit' className='w-full mt-6 bg-gradient-to-r from-purple-600 to-purple-400 text-white py-3 rounded-lg shadow-lg hover:from-purple-700 hover:to-purple-500 transition-all duration-300'>
                        PLACE ORDER
                    </button>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder
