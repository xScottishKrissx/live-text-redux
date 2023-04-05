import React from 'react'
import { FaTrash } from 'react-icons/fa'

export default function DeleteButton({handleClick, title}) {
  return (
    <>
        <button className='deleteButton' title={title} onClick={handleClick}><FaTrash /></button>
    </>
  )
}
