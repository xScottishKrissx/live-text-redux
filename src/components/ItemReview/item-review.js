import React,{useState} from 'react'
import Post from '../Post/post'
import './item-review.css'

export default function ItemReview({data}) {
  
  const [toggle, setToggle] = useState(false)
  if(!data) return
  const {postType, postTitle, postSubtitle, postBody, postImageName, insertTweet, insertYoutube} = data
  return (
    <div className={`${toggle ? 'item-review-container expand' : 'item-review-container'}`}>
      <h2 onClick={()=>setToggle(!toggle)} className='defaultBtnStyle colTitle'><p>Item Review</p></h2>
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


