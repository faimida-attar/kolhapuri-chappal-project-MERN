import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {

    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

    const subtotal = getCartAmount();
    const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

    return (
        <div className='w-full max-w-sm mx-auto bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-shadow duration-300'>
            <div className='text-2xl mb-4 text-center'>
                <Title text1={'CART'} text2={'TOTALS'} />
            </div>

            <div className='flex flex-col gap-3 text-gray-700 text-sm'>
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>{currency} {subtotal}.00</p>
                </div>
                <div className='flex justify-between'>
                    <p>Shipping Fee</p>
                    <p>{currency} {delivery_fee}.00</p>
                </div>
                <hr className='my-2 border-gray-300' />
                <div className='flex justify-between items-center text-base sm:text-lg font-semibold bg-gradient-to-r from-purple-600 to-purple-400 text-white px-4 py-2 rounded-md shadow-md'>
                    <p>Total</p>
                    <p>{currency} {total}.00</p>
                </div>
            </div>
        </div>
    );
}

export default CartTotal;
