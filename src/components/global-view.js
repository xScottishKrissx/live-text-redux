import React from 'react'
import './global-view.css'

import { useSelector } from 'react-redux'
import Post from './Post/post'

import DOMPurify from 'dompurify'

export default function GlobalView() {
  const createMarkup = (html) =>{ return{ __html:DOMPurify.sanitize(html) } }
  const loggedIn = true
  
  const liveText = useSelector((state) => state.livetext.value)
  // const liveTextMaster = JSON.parse(localStorage.getItem("liveTextMaster")) || []
  const activeLiveText = useSelector((state) => state.active.value)
  // console.log(liveText)
  // console.log(liveTextMaster)
  if(!liveText || !activeLiveText) return
  
  const getActiveLiveText = liveText.filter(x =>x[activeLiveText])  
  const liveTextArray = [...getActiveLiveText]
  if(!liveTextArray[0]) return

  const getactiveColumnsItems = liveTextArray[0][activeLiveText].items
  if(!getactiveColumnsItems) return
  // Sort items by timestamp
  let useActiveColumnItems = [...getactiveColumnsItems].reverse()
  let useColumnHeadline = liveTextArray[0][activeLiveText].headline

  const displayLiveText = useActiveColumnItems.map((x, index) => {
    
    
    if(!loggedIn) return  
    const getPostContent = Object.values(x)
    const getPostId = Object.keys(x)[0]
    const getPostItems = getPostContent[0].items
    const {title, subtitle, body, type, timestamp, hidden, image, tweet, youtube} = getPostItems
    const timeSincePostCreation = (Date.now() - timestamp) / 1000
    const changeClassWithTime = timeSincePostCreation < 70 && index === 0 ? "newPost " + index : ""

    return(
      <div 
        className={'post-item ' + type + ' ' + changeClassWithTime} 
        key={index} 
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


  return (
    <div className='global-view-wrapper'>
        {/* {loggedIn ? <p>Logged In</p> : <p>Not Logged In</p>} */}
        <h1 className='defaultBtnStyle colTitle' dangerouslySetInnerHTML={createMarkup(useColumnHeadline)}></h1> 

        {getactiveColumnsItems.length <= 0 ? "+ Add New Post" : displayLiveText}
    </div>
  )
}
