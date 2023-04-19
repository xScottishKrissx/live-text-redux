import React from 'react'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'
export default function ToggleExtraInfo({allowExtraInfoView, extraInfo, columnId}) {
  return (
    <div className="manageColumns-toggleExtraInfo">
        {allowExtraInfoView ? 
            <button className='defaultBtnStyle' onClick={()=>extraInfo(false)}>
              <span className='rotateTo180'>
                <FaChevronDown />
              </span>
            </button>
            :
            <button className='defaultBtnStyle' onClick={()=>extraInfo(columnId, true)}>
              <span className='rotateTo0'>
                <FaChevronDown />
              </span>
            </button>
        }
    </div>
  )
}
