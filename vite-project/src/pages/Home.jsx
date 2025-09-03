import React from 'react'
import Navbar from '../components/navbar'
import Header from '../components/header'

const Home = () => {
  return (
    <div className='items-center justify-center min-h-screen bg-[url("/src/assets/bgp.jpg")] bg-cover bg-center flex flex-col'>
      <img src="/src/assets/logo.png" alt="Logo" className="mb-4 w-40 h-40" />
      <Navbar />
      <Header />
    </div>
  )
}

export default Home
