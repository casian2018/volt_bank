import React from 'react';
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";



const Footer = () => {
  return (
    <>
   
   <div className='bg-gray-200 flex items-center p-7'>

    <div>
        <a className='text-l mr-4 ml-16 font-semibold hover:scale-150' href="">Home</a>
        <a href="/profile" className='text-l mr-4 font-semibold'>My account</a>
        <a href="/terms" className='text-l mr-4 font-semibold'>Terms</a>
        <a href="" className='text-l mr-4 mr-[700px] font-semibold'>Contact</a>

    </div>


<div className='flex'>
    <a className='text-xl mr-4 hover:scale-150' href="https://www.youtube.com/watch?v=07BQNEAXs_s"><FaInstagram /></a>
    <a href="" className='text-xl mr-4 hover:scale-150'><FaFacebook /></a>
    <a href="" className='text-xl mr-4 hover:scale-150'><FaGithub /></a>
    <a href="" className='text-xl mr-4 hover:scale-150'><FaLinkedin /></a>
</div>
</div>

</>
  )
}

export default Footer
