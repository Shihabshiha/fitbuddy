import React from 'react'
import {  Logo } from '../../constants/common'
import { UilFacebook , UilYoutube , UilInstagram } from '@iconscout/react-unicons'
import { Link, useNavigate } from 'react-router-dom'


const FooterComponent : React.FC = () =>{
  const navigate = useNavigate()
  return (
    <footer className='bg-gray-700'>
      <div className='flex h-35 w-full pt-5'>
        <div className='items-center text-center  md:pl-6 md:w-1/3 mx-auto'>
            <img 
              onClick={()=>{
                navigate('/')
              }}
              src={Logo}
              className='w-20 h-20 hover:cursor-pointer'
            />
        </div>
        <div className=' text-white text-sm md:text-lg  md:w-1/3 pt-2'>    
            <p>Social</p>
            <div className='flex  gap-2 mt-3 hover:cursor-pointer text-sm'>
            <UilFacebook />
            <UilYoutube  />
            <UilInstagram/>
            </div>
        </div>
        <div className='text-sm md:text-lg text-white pt-2 mx-auto md:w-1/3'>
          <p >
            <Link to={"/about"}>About</Link>
          </p>
          <p >
            <Link to={"/#contact"}>Contact Us</Link>
          </p>
        </div>     
      </div>
      <div className='flex justify-center md:justify-start text-white font-light pt-3 text-sm md:text-base md:pl-4'>
        <p>
          @ All rights reserved 
        </p>
      </div>
    </footer>
  )
}

export default FooterComponent