import React from 'react'
import { useSelector } from 'react-redux'
import Post from '../Post/post'

export default function ItemReviewEditPost() {
    const getItem = useSelector((state) => state.preview.value)
    const {postTitle, postSubtitle, postBody} = getItem

    return (
        <div className='item-review-container'>
            <div className={'post-item'}>
                <Post
                    title={postTitle} 
                    subtitle={postSubtitle} 
                    body={postBody} 
                />
            </div>
        </div>
  )
}
