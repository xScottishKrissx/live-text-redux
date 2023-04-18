import React from 'react'
import { FaCheck, FaRegCircle } from 'react-icons/fa'

export default function SetColumnActive({colIsActive, handleSetActive, columnId, columnContent}) {
  return (
    <div className='manageColumns-activeCheck'>{colIsActive ? 
        <span className='checkActiveButton' title="Column is active" id="colIsActive"><FaCheck /></span> 
        : 
        <span className='checkActiveButton' title="Set Column Active" onClick={()=>handleSetActive(columnId, columnContent)}><FaRegCircle /></span>
        }
    </div>
  )
}
