import React from 'react'
import errorImg from '../../images/error.svg'

export default function NotFound() {
  return <>
  
    <div className='w-50 mx-auto'>
      <img className='w-100' src={errorImg} alt="Error404" />
    </div>

  </>
}
