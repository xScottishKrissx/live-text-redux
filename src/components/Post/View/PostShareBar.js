import React from 'react'
import {  FaFacebookSquare, FaShareAlt, FaTwitter } from 'react-icons/fa';
export default function PostShareBar() {
  return (
    <div className='post-item-share-bar'>
                    
        <div className='share-bar-facebook'> <FaFacebookSquare /> </div>
        <div className='share-bar-twitter'> <FaTwitter /> </div>
        <div className='share-bar-share'> 
            <FaShareAlt />  
            <span>Share</span>
        </div>
    </div>  
  )
}
