import React, {useState} from 'react'
import { FaRegWindowClose, FaTimes, FaTrash, FaUndo, FaWindowClose } from 'react-icons/fa'

export default function ClearColumnsButton({clearColumns}) {
  const [clearAllBtn, setClearAllBtnVis] = useState(false)

  const showClearAllBtn = () => setClearAllBtnVis(!clearAllBtn) 
  return (
    <>
      
      {clearAllBtn ? 
        <div className='clearColumnsBtnContainer'>
          <div className='clearColumnsBtnActive'>
            <button className='defaultBtnStyle' onClick={showClearAllBtn}><FaTimes />Cancel</button>  
            <button className='defaultBtnStyle warningBtn' onClick={clearColumns}> <FaTrash /> Delete All</button>  
          </div>
        </div>
      :
        <button className='defaultBtnStyle' onClick={showClearAllBtn}>
          <FaTrash />
          Delete All
          </button>
      }
    </>
  )
}
