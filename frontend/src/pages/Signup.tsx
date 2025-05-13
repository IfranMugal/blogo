import React from 'react'
import Qoute from '../components/Qoute'
import Infobox from '../components/Infobox'

function Signup() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
        <Infobox />
        <Qoute />
    </div>
  )
}

export default Signup