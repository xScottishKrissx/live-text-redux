import React from 'react'
import { useSelector } from 'react-redux'
export default function ItemReview() {
    const itemList = useSelector((state) => state.items.value)
    console.log(itemList)
  return (
    <div className='item-review-area-wrapper'>
        <h1>Input Review Area - (author only)</h1>
        {itemList.postTitle}
        <hr />
    </div>
  )
}
