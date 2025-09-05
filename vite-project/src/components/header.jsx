import React, { useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import { AppContext } from '../context/appcontext'
const Header = () => {
  const navigate = useNavigate()
  const {userData}=useContext(AppContext)
  return (
    <div className='flex flex-col items-center px-4 text-center sm:px-4'>
      <img src="/src/assets/logo.png" alt="Logo" className="mb-4 w-40 h-40 sm:w-20 sm:h-20" />
    <h1  className='text-3xl p-5'>Hey {userData?userData.name:'there!'}</h1>
      <h1 className='text-4xl font-semibold mb-4 sm:text-5xl '>Welcome to ClosetCook</h1>
      <h2 className='text-2xl text-gray-600 p-5 max-w-2xl mb-4'>Discover outfit recommendations tailored to your taste. Record your creations and explore styling options from a vibrant range of options.</h2>
    <button onClick={() => navigate('./test') } className='border border-gray-600 text-lg px-4 py-2 rounded-full hover:bg-gray-50'>Get started</button>
    </div>
  )
}

export default Header
