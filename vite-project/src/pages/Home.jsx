import React from 'react'
import Navbar from '../components/navbar'
import Header from '../components/header'

const Home = () => {
  return (
    <div className='items-center justify-center min-h-screen bg-[url("/src/assets/bg.jpg")] bg-cover bg-center flex flex-col'>
      <Navbar />
      <Header />
    </div>
  )
}

export default Home
