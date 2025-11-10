import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name,setName] = useState('')
  const [password,setPasword] = useState('')
  const [email,setEmail] = useState('')

  const onSubmitHandler = async (event) => {
      event.preventDefault();
      try {
        if (currentState === 'Sign Up') {
          const response = await axios.post(backendUrl + '/api/user/register',{name,email,password})
          if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          } else {
            toast.error(response.data.message)
          }
        } else {
          const response = await axios.post(backendUrl + '/api/user/login', {email,password})
          if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          } else {
            toast.error(response.data.message)
          }
        }
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
  }

  useEffect(()=>{
    if (token) {
      navigate('/')
    }
  },[token])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-50 to-white px-4">
      <form 
        onSubmit={onSubmitHandler} 
        className='bg-white shadow-2xl rounded-2xl p-8 sm:p-12 w-full max-w-md flex flex-col gap-6 transition-transform transform hover:scale-105 duration-300'
      >
        <div className='text-center mb-6'>
          <h2 className='text-3xl font-bold text-gray-800'>{currentState}</h2>
          <p className='text-gray-500 mt-1'>{currentState === 'Login' ? 'Welcome back! Please login.' : 'Create your account and join us!'}</p>
        </div>

        {currentState === 'Sign Up' && (
          <input 
            onChange={(e)=>setName(e.target.value)} 
            value={name} 
            type="text" 
            className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition duration-300' 
            placeholder='Full Name' 
            required
          />
        )}

        <input 
          onChange={(e)=>setEmail(e.target.value)} 
          value={email} 
          type="email" 
          className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition duration-300' 
          placeholder='Email' 
          required
        />
        <input 
          onChange={(e)=>setPasword(e.target.value)} 
          value={password} 
          type="password" 
          className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition duration-300' 
          placeholder='Password' 
          required
        />

        <div className='flex justify-between text-sm text-purple-600'>
          {currentState === 'Login' 
            ? <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer hover:underline'>Create Account</p>
            : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer hover:underline'>Login Here</p>
          }
          <p className='cursor-pointer hover:underline'>Forgot Password?</p>
        </div>

        <button 
          type="submit"
          className='bg-gradient-to-r from-purple-600 to-purple-400 text-white font-medium py-3 rounded-xl shadow-lg hover:from-purple-800 hover:to-purple-500 transition-all duration-300'
        >
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>

        <div className='text-center text-gray-400 mt-4 text-sm'>
          © 2025 Kolhapuri Chappal. All rights reserved.
        </div>
      </form>
    </div>
  )
}

export default Login
