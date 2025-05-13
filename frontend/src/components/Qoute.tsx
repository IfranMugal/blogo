import React from 'react'
import { Link } from 'react-router-dom';


function Qoute() {
  return (
    <div className='bg-slate-300 h-screen flex justify-center flex-col'>
        <div className='p-4 flex justify-center flex-col'>
            <div className='text-xl font-bold text-center '>I'm Irfan, a passionate developer and writer. I created this platform to give people a clean, distraction-free place to write and share ideas without worrying about algorithms or noise.</div>
            <Link to="https://github.com/IfranMugal/blogo" className=' p-4 text-center hover:underline text-gray-500'>
                Github
            </Link>
        </div>
    </div>
  )
}

export default Qoute