import React from 'react'

import { FaPlus } from 'react-icons/fa'


export default function AddNewButton({handleClick, title, greyOut}) {
  return (
    <>
        <button 
          className={`${greyOut ? 'addNewButton greyOut' : 'addNewButton'}`} 
          title={title} 
          onClick={handleClick}>
            <FaPlus />
          </button>
    </>
  )
}
