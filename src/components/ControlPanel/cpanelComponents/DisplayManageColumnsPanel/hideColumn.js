import React from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

export default function HideColumn({hidden, columnId, handleHideColumn}) {
    const assignClassName = hidden ? "defaultBtnStyle columnHidden" : "defaultBtnStyle"

    return (
    <div className='manageColumns-manageHide'>
            <button className={assignClassName} onClick={()=>handleHideColumn(columnId, hidden)}>
                {hidden ? 
                    <span title="Hidden"> <FaEyeSlash/> </span>
                    : 
                    <span title="Visible"> <FaEye /> </span>
                }
            </button>
    </div>
    )
}
