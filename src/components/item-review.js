import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import DOMPurify from 'dompurify'

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

export default function ItemReview() {
    const itemList = useSelector((state) => state.items.value)
    const {postType, postTitle, postBody} = itemList
    const [newPostBody, setNewPostBody] = useState("")
    if(!postBody) return

  const createMarkup = (html) =>{
    return{
      __html:DOMPurify.sanitize(html)
    }
  }

  return (
    <div className='item-review-area-wrapper'>
        <h1>Input Review Area - (author only)</h1>
        
        <div className='item-review-area-title'>
          <div>{itemList.postType + " - "}  </div> 
          <div dangerouslySetInnerHTML={createMarkup(itemList.postTitle)}></div>
        </div>
        - 
        <div dangerouslySetInnerHTML={createMarkup(itemList.postBody)}></div>
    </div>
  )
}


// Notes
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