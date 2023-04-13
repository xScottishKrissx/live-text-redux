import React from 'react'
import { useSelector } from 'react-redux'

import Post from '../Post/post'

export default function DisplayColumn({getactiveColumnsItems}) {

    let useActiveColumnItems = [...getactiveColumnsItems].reverse()
    const loggedIn = true
    const editModeState = useSelector((state) => state.edit.value)

    const displayLiveText = useActiveColumnItems.map((x, index) => {
    
        if(!loggedIn) return  
        const getPostContent = Object.values(x)
        const getPostId = Object.keys(x)[0]
        const getPostItems = getPostContent[0].items
        const {title, subtitle, body, type, timestamp, hidden, image, tweet, youtube} = getPostItems
        const timeSincePostCreation = (Date.now() - timestamp) / 1000
        const changeClassWithTime = timeSincePostCreation < 70 && index === 0 ? "newPost " + index : ""
    
        // Checking Edit Mode
        const {editing, editId} = editModeState
        const editingIsActiveOnThisPost = editing && editId === getPostId
    
        return(
          <div 
            className={'post-item ' + type + ' ' + changeClassWithTime} 
            key={index} 
            id={`${editingIsActiveOnThisPost ? "post-item-edit-mode" : null }`}
            >
            <Post
            
              id={getPostId}
              title={title}
              subtitle={subtitle}
              body={body}
              type={type}
              timestamp={timestamp}
              hidden={hidden}
              loggedIn={loggedIn}
              image={image}
              tweet={tweet}
              youtube={youtube}
            />
          </div>
        )
      })

      return displayLiveText
}
