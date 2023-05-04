import React from 'react'
import "../column.css"

import { FaStepForward, FaStepBackward } from 'react-icons/fa'

export default function ChangePageButton({ pagesState, setPages, itemsOnPage, columnItemsCount}) {

  const {start, end} = pagesState

  const handlePrev = () => setPages({start:start - itemsOnPage, end: end - itemsOnPage,}) 
  const handleNext = () => setPages({start:start + itemsOnPage, end: end + itemsOnPage, }) 
  const currentPage = Math.ceil(start / itemsOnPage) + 1;

  return (
    <div className='changePageButtonContainer'>

        {start === 0 ? 
          <button className='defaultBtnStyle greyOut'><FaStepBackward /></button> 
          : 
          <button className='defaultBtnStyle' onClick={()=>handlePrev()}><FaStepBackward /></button>
        }

        Page {currentPage} of {Math.ceil(columnItemsCount / itemsOnPage)}

        {end >= columnItemsCount ? 
          <button className='defaultBtnStyle greyOut'><FaStepForward /></button>
          :
          <button className='defaultBtnStyle' onClick={()=>handleNext()}><FaStepForward /></button>
        }
    </div>
  )
}
