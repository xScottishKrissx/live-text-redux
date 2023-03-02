import React from 'react'
import { useSelector } from 'react-redux'
import Post from '../Post/post'

export default function ItemReviewEditPost() {
    const getItem = useSelector((state) => state.preview.value)
    const {titleField, bodyField, subtitleField} = getItem

    return (
        <div className='item-review-container'>
            <div className={'post-item'}>
                <Post
                    title={titleField} 
                    subtitle={subtitleField} 
                    body={bodyField} 
                />
            </div>
        </div>
  )
}
