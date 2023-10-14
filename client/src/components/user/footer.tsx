import React from 'react'
import {  Logo } from '../../constants/common'
import { UilFacebook , UilYoutube , UilInstagram } from '@iconscout/react-unicons'
import { useNavigate } from 'react-router-dom'


const FooterComponent : React.FC = () =>{
  const navigate = useNavigate()
  return (
    <footer className='bg-gray-700'>
      <div className='flex h-35 w-full pt-5'>
        <div className='items-center text-center  pl-6 w-1/3 mx-auto'>
            <img 
              onClick={()=>{
                navigate('/')
              }}
              src={Logo}
              className='w-20 h-20 hover:cursor-pointer'
            />
        </div>
        <div className=' text-white text-lg w-1/3 pt-2'>    
            <p>Social</p>
            <div className='flex  gap-2 mt-3 hover:cursor-pointer'>
            <UilFacebook  />
            <UilYoutube  />
            <UilInstagram/>
            </div>
        </div>
        <div className='text-lg text-white pt-2 mx-auto w-1/3'>
          <p >
            <a href="#about">About</a>
          </p>
          <p >
            <a href="#Contact us">Contact Us</a>
          </p>
        </div>     
      </div>
      <div className='flex justify-end text-white font-light pt-3 pr-6'>
        <p>
          @ All rights reserved 
        </p>
      </div>
    </footer>
  )
}

export default FooterComponent