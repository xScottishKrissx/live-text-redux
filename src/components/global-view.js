import React from 'react'
import './global-view.css'

import { useSelector } from 'react-redux'
import Post from './Post/post'


export default function GlobalView() {

  const loggedIn = true
  // localStorage.clear()

  const liveText = useSelector((state) => state.livetext.value)
  console.log(liveText)
  const activeLiveText = useSelector((state) => state.active.value)
  console.log(activeLiveText)
  if(!liveText || !activeLiveText) return
  // console.log(activeLiveText.item)
  
  const getActiveLiveText = liveText.filter(x =>x[activeLiveText])
  console.log(getActiveLiveText)
  // if(!getActiveLiveText) return
  
  
  // Sort items by timestamp
  const liveTextArray = [...getActiveLiveText]
  console.log(liveTextArray)
  // return
  // console.log(liveTextArray[0][activeLiveText].items)
  const getactiveColumnsItems = liveTextArray[0][activeLiveText].items
  if(!getactiveColumnsItems) return
  console.log(getactiveColumnsItems)
  let useActiveColumnItems = [...getactiveColumnsItems].reverse()

  // liveTextArray[0].content.sort((a, b) => {
  //   console.log(liveTextArray)
  //   const valA = a.timestamp; 
  //   const valB = b.timestamp; 
  //   if (valA < valB) { return 1; }
  //   if (valA > valB) { return -1; }
  //   return 0;
  // });
  // activeColumnsItems.sort((a, b) => {
  //   console.log(liveTextArray)
  //   const valA = a.timestamp; 
  //   const valB = b.timestamp; 
  //   if (valA < valB) { return 1; }
  //   if (valA > valB) { return -1; }
  //   return 0;
  // });

  
  // console.log("Hello")

  const displayLiveText = useActiveColumnItems.map((x, index) => {

    if(!loggedIn && x.hidden ) return  
    const getPostContent = Object.values(x)
    const getPostItems = getPostContent[0].items
    const {id, title, subtitle, body, type, timestamp, hidden, image, tweet, youtube} = getPostItems

    const timeSincePostCreation = (Date.now() - timestamp) / 1000
    const changeClassWithTime = timeSincePostCreation < 70 && index === 0 ? "newPost " + index : ""

    return(
      <div 
        className={'post-item ' + type + ' ' + changeClassWithTime} 
        key={x.id} 
        >
          
        <Post
        
          id={id}
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
        {loggedIn ? <p>Logged In</p> : <p>Not Logged In</p>}
        {displayLiveText}
    </div>
  )
}
