import React from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

export default function ColumnHeading({toggle, setToggle, textToDisplay}) {
  return (
    <div className='colTitle' onClick={setToggle}>

        <h2  className='defaultBtnStyle'>
            <p>{textToDisplay}</p>
        </h2>

        <button className='defaultBtnStyle togglePanelBtn'>
            {toggle ? <FaChevronUp /> :  <FaChevronDown /> }
        </button>

    </div>
  )
}
