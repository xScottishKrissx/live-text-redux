import React from 'react'
import { useSelector } from 'react-redux'

import DOMPurify from 'dompurify'

export default function ItemReview() {
    const itemList = useSelector((state) => state.items.value)

    const createMarkup = (html) =>{
      return{
        __html:DOMPurify.sanitize(html)
      }
    }

  return (
    <div className='item-review-area-wrapper'>
        <h1>Input Review Area - (author only)</h1>
        {itemList.postTitle}
  
        <div dangerouslySetInnerHTML={createMarkup(itemList.postBody)}></div>
        <hr />
    </div>
  )
}
