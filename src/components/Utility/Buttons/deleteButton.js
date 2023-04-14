import React, {useState} from 'react'
import { FaTrash, FaTimes, FaCheck, FaUndo } from 'react-icons/fa'

export default function DeleteButton({handleClick, title, showText}) {
  const [deleteVisible, setBtnVis] = useState(false)

  const handleDelete = () =>{
    handleClick()
    setBtnVis(false)
  }
  return (
    <div className={`${deleteVisible ? 'deleteButtonWrapper deleteActive' :'deleteButtonWrapper'}`}>
        {deleteVisible ?
        <button className='deleteButton marginLeft0' title={title} onClick={handleDelete}>
           <FaTrash />
          {showText ? "Delete" : null}
        </button>
        :null
        }

        {deleteVisible ? 
          <button className='deleteButton marginRight0' title="Cancel Delete" onClick={()=>setBtnVis(false)}>
            <FaUndo />
            {showText ? "Cancel" : null}
          </button>
          :
          <button className='deleteButton' title={title} onClick={()=>setBtnVis(true)}>
            <FaTrash />
            {showText ? "Delete" : null}
          </button>
        }


    </div>
  )
}
