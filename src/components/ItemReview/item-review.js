import React from 'react'
// import { useSelector } from 'react-redux'
import Post from '../Post/post'
import './item-review.css'

export default function ItemReview({data}) {
  
  // const itemList = useSelector((state) => state.items.value)
  // const liveText = useSelector((state) => state.livetext.value)
  // const editModeState = useSelector((state) => state.edit.value)
  // const getCurrentPost = liveText.filter(x => x.id === editModeState.editId)
  // console.log(data)

  if(!data) return
  const {postType, postTitle, postSubtitle, postBody, postImageName, insertTweet, insertYoutube} = data
  return (
    <div className='item-review-container'>
      <div className={'post-item ' + postType}>
        <Post 
        // This achieves the desired effect of placing the current post title in the item review area as soon as you hit the edit button....it just looks mental.
          title={postTitle} 
          subtitle={postSubtitle} 
          body={postBody} 
          // type={postType} 
          // image={postImageName} 
          // tweet={insertTweet} 
          // youtube={insertYoutube} 
        />
      </div>
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