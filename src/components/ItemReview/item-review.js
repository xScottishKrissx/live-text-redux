import React,{useState} from 'react'
import Post from '../Post/post'
import ColumnHeading from '../Utility/columnHeading'
import './item-review.css'

export default function ItemReview({data}) {
  
  const [toggle, setToggle] = useState(false)
  if(!data) return
  const {postType, postTitle, postSubtitle, postBody, postImageName, insertTweet, insertYoutube} = data
  return (
    <div className={`${toggle ? 'item-review-container expand' : 'item-review-container'}`}>

      <ColumnHeading
        textToDisplay="Item Review"
        setToggle={()=>setToggle(!toggle)} 
        toggle={toggle} 
      />
      
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


