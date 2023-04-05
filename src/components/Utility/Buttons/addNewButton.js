import React from 'react'

import { FaPlus } from 'react-icons/fa'


export default function AddNewButton({handleClick, title}) {
  return (
    <>
        <button className='addNewButton' title={title} onClick={handleClick}><FaPlus /></button>
    </>
  )
}
