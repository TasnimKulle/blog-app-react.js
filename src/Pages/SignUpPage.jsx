import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router';
import {signUp} from '../lib/auth'

export const SignUpPage = () => {
  const[email,setEmail]=useState();
  const [username,setUsername]=useState()
  const[password,setPassword]=useState()
  const[confimePassword ,setConfimePassword]=useState()
  const[isLoading,setIsLoading]=useState(false);
  const[error,setError]=useState(null)
  const[success,setSuccess]=useState()
    const navigate = useNavigate()

  const handleSubmit =async(event)=>{
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    if(password!==confimePassword){
      setError('password do not match')
      setIsLoading(false)
      return
    }
    try{
      await signUp( email,password,username)
      setSuccess(true)
        setTimeout(() => {
        navigate('/signin')
      }, 3000)
    }catch(error){
      console.error(error)
      setError(error.message||'Failet To Create Account please try again')
    }finally{
      setIsLoading(false)
    }
  }
    if (success) {


    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h2 className="text-2xl font-bold mb-2">Account Created!</h2>
            <p className="text-gray-600 mb-4">
              Your account has been created successfully. Please check your email for verification.
            </p>
            <p className="text-gray-500 text-sm">
              Redirecting to sign in page in a few seconds...
            </p>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='min-h-screen bg-gray-50 px-4 flex items-center justify-center'>
      <div className='max-w-md w-full'>
        <div className='text-center my-8'>
          <h1 className='text-3xl font-bold'>Create An Account</h1>
          <p className='text-gray-600 mt-1'>Join Our Community and Start sharing you ideas</p>
        </div>
        <div className='bg-white rounded-lg shadow-md p-8 mb-6'>
          {
            error && (
            <div className="bg-red-100 mb-4 p-3 text-red-700 rounded-md">
                {error}
            </div>
            )
          }
          <form onSubmit={handleSubmit} >
            <div className='mb-6'>
              <label htmlFor="email" className='block text-gray-700 text-sm font-bold mb-2'> 
                Your Email:
              </label>
              <input type="emial"
              value={email}
              placeholder='your@email.com'
              onChange={(e)=>setEmail(e.target.value)}
              required
              className='w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-orange-500' />

            </div>
             <div className='mb-6'>
              <label htmlFor="email" className='block text-gray-700 text-sm font-bold mb-2'> 
                UserName:
              </label>
              <input type="emial"
              value={username}
              placeholder='TasnimKulle'
              onChange={(e)=>setUsername(e.target.value)}
              required
              className='w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-orange-500' />

            </div>
             <div className='mb-6'>
              <label htmlFor="userName" className='block text-gray-700 text-sm font-bold mb-2'> 
                Password:
              </label>
              <input type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder='.....'
              required
              minLength={6}
              className='w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-orange-500' />
              <p className='text-xs text-gray-500 mt-1'>
                must be at least 6 characters
              </p>

            </div>
             <div className='mb-6'>
              <label htmlFor="email" className='block text-gray-700 text-sm font-bold mb-2'> 
                Confirm Password:
              </label>
              <input type="password"
              value={confimePassword}
              placeholder='.....'
              required
              minLength={6}
              onChange={(e)=>setConfimePassword(e.target.value)}
              className='w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-orange-500' />

            </div>
            <button 
            type="submit"
            className='w-full bg-orange-700 px-4 py-3 text-orange-50 rounded-md  font-bold focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200 cursor-pointer disabled:cursor-not-allowed disabled:bg-orange-500 '
            disabled={isLoading}
            >{
              isLoading ? 'Creating Account...':'Create Account'
            }</button>

          </form>
          <div className='text-center mt-6'>
            <p className='text-gray-600 text-sm'>
              Al-ready Have An Account?{''}
              <Link to='/signin' className='font-semibold text-orange-600 hover:text-orange-800'>Sign In</Link>
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}
