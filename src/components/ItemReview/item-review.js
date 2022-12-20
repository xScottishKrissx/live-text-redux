import React from 'react'
import {v4 as uuidv4} from 'uuid'

import { useSelector, useDispatch } from 'react-redux'
import { updateArray } from '../../features/live-text'

import Post from '../Post/post'

import './item-review.css'

export default function ItemReview() {
  const dispatch = useDispatch()
  
  const itemList = useSelector((state) => state.items.value)
  const {postType, postTitle, postSubTitle, postBody} = itemList
  
  const liveText = useSelector((state) => state.livetext.value)

  if(!postBody) return

  const pushLive = () =>{
    const newPost = [{
      id: uuidv4(), 
      body: postBody, 
      title: postTitle, 
      subtitle: postSubTitle, 
      type: postType
    }]

    const updateLiveTextArray = [newPost[0]].concat(liveText)
    dispatch(updateArray(updateLiveTextArray))
    localStorage.setItem("live-text", JSON.stringify(updateLiveTextArray))
    console.log("Clear Form")
  }

  return (
    <div className='item-review-container'>
      <div className={'post-item ' + postType}>
        <Post title={postTitle} subtitle={postSubTitle} body={postBody} type={postType} />
      </div>

        {postTitle.length > 10 && postBody.length > 10 ? 
          <div className='item-review-confirm-button'>
            <button onClick={pushLive}>Confirm</button>
            <button>Cancel</button>
          </div>
        :
        null
        }
    </div>
  )
}


// Notes

// function GetId(string){
//   let pattern = /@([\s\S]*?)(?= )/g;
//   let result = string.match(pattern)
//   for(let i = 0; i < result?.length; i++){
//     if(result[i].length > 1){
//       result[i] = result[i].substring(1, result[i].length)
//     }
//     return result[i]
//   }
// }
    // https://regexr.com/
    // https://stackoverflow.com/questions/9313071/retrieve-substring-between-two-characters
// let pattern = /@([\s\S]*?)(?= )/g;
      // @ Matches a @ character code
      // (  ) -- Capturing Group 1, groups multiple tokens together and creates a caprture group for extracting a substring or using a backtrace reference
      // [ ] - Matches any character in the the set
      // \s - Whitespace - Matches any whitespace character (spaces, tabs, line breaks)
      // \S - Not Whitespace - Matches any non whitespace character (spaces, tabs, line breaks)
      // * - Quantifiter - Match 0 or more of the preceding token
      // ? - Lazy - Makes the preceding quantifier lazy, causing it to match as few characters as possible
      // (?= ) - Postive lookahead - Matches a group after the main expression without including it in the result