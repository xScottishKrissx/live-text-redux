import React, {useState} from 'react'
import { FaTrash, FaTimes, FaCheck } from 'react-icons/fa'

export default function DeleteButton({handleClick, title, showText}) {
  const [deleteVisible, setBtnVis] = useState(false)

  const handleDelete = () =>{
    handleClick()
    setBtnVis(false)
  }
  return (
    <>
        {deleteVisible ?
        <button className='deleteButton' title={title} onClick={handleDelete}>
          <FaCheck />
          {showText ? "Delete" : null}
        </button>
        :null
        }

        {deleteVisible ? 
          <button className='deleteButton' title="Cancel Delete" onClick={()=>setBtnVis(false)}>
            <FaTimes />
            {showText ? "Cancel" : null}
          </button>
          :
          <button className='deleteButton' title={title} onClick={()=>setBtnVis(true)}>
            <FaTrash />
            {showText ? "Delete" : null}
          </button>
        }


    </>
  )
}
