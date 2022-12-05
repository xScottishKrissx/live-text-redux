import React from 'react'
import { useSelector } from 'react-redux'

import { Japan, Poland } from './Tags/names'

import DOMPurify from 'dompurify'

export default function ItemReview() {
    const itemList = useSelector((state) => state.items.value)
    const {postType, postTitle, postBody} = itemList
    if(!postBody) return

    const createMarkup = (html) =>{
      return{
        __html:DOMPurify.sanitize(html)
      }
    }

    const getId = (id) =>{
      return 
    }


    // const changePostBody = postBody.replaceAll("@goal" , "Goal")
    var mySubString = postBody.substring(
      postBody.indexOf("@") + 1, 
      postBody.lastIndexOf("@")
  );
  console.log(mySubString)
    let shortcode = 1;
    let replaceShortCode = "name";
    const changePostBodyTest = postBody.replaceAll("@" + shortcode , replaceShortCode)

  return (
    <div className='item-review-area-wrapper'>
        <h1>Input Review Area - (author only)</h1>
        {itemList.postType} - {itemList.postTitle}
  
        <div dangerouslySetInnerHTML={createMarkup(changePostBodyTest)}></div>
        <hr />
    </div>
  )
}
