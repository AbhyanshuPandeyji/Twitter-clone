// i will our form to signin
import React from 'react'

const Signin = () => {
  return (
      <form className='bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-6/12 mx-auto gap-10 '>
        <h2 className='text-3xl font-bold text-center'> Signing To Twitter</h2>

        <input 
          typeof="text" 
          placeholder='Username'
          required
          className='text-xl py-2 rounded-full px-4'
        />
        <input 
          typeof="password" 
          required
          placeholder='Password'
          className='text-xl py-2 rounded-full px-4'
        />

      <button typeof="submit" className='text-xl py-3 rounded-full px-4 bg-blue-500 text-white'>Signin</button>
      
      <p className='text-center text-xl '> Don't Have An Account?</p>

      
      <input 
          typeof="text" 
          placeholder='Username'
          required
          className='text-xl py-2 rounded-full px-4'
        />
      
      <input 
          typeof="email" 
          required
          placeholder='E-mail'
          className='text-xl py-2 rounded-full px-4'
        />

        <input 
          typeof="password" 
          required
          placeholder='Password'
          className='text-xl py-2 rounded-full px-4'
        />

        <button typeof="submit" className='text-xl py-3 rounded-full px-4 bg-blue-500 text-white'>Signup</button>

      </form>
  )
}

export default Signin;
