import React from 'react'
import Post from '../Post/post'
import './item-review.css'

export default function ItemReview({data}) {
  
  if(!data) return
  const {postType, postTitle, postSubtitle, postBody, postImageName, insertTweet, insertYoutube} = data
  return (
    <div className='item-review-container'>
      <div className={'post-item ' + postType}>
        <Post 
          hideEditBtn
          title={postTitle} 
          subtitle={postSubtitle} 
          body={postBody} 
          type={postType} 
          image={postImageName} 
          tweet={insertTweet} 
          youtube={insertYoutube} 
        />
      </div>
    </div>
  )
}


