import React from 'react'
import './global-view.css'

import { useSelector } from 'react-redux'
import Post from './Post/post'


export default function GlobalView() {

  const loggedIn = true
  // localStorage.clear()

  const liveText = useSelector((state) => state.livetext.value)
  const activeLiveText = useSelector((state) => state.active.value)
  // console.log(activeLiveText)
  // return
  if(!liveText || !activeLiveText.item) return
  // console.log(activeLiveText.item)
  
  const getActiveLiveText = liveText.filter(x => x.id === activeLiveText.item.id)
  // console.log(getActiveLiveText)
  // if(!getActiveLiveText) return

  
  // Sort items by timestamp
  const liveTextArray = [...getActiveLiveText]
  // console.log(liveTextArray[0].content)
  // if(!liveTextArray[0].content) return

  liveTextArray[0].content.sort((a, b) => {
    console.log(liveTextArray)
    const valA = a.timestamp; 
    const valB = b.timestamp; 
    if (valA < valB) { return 1; }
    if (valA > valB) { return -1; }
    return 0;
  });



  // console.log("Hello")
  const displayLiveText = liveTextArray[0].content.map((x, index) => {
    if(!loggedIn && x.hidden ) return 

    const timeSincePostCreation = (Date.now() - x.timestamp) / 1000
    const changeClassWithTime = timeSincePostCreation < 70 && index === 0 ? "newPost " + index : ""

    return(
      <div 
        className={'post-item ' + x.type + ' ' + changeClassWithTime} 
        key={x.id} 
        >
          
        <Post
        
          id={x.id}
          title={x.title}
          subtitle={x.subtitle}
          body={x.body}
          type={x.type}
          timestamp={x.timestamp}
          hidden={x.hidden}
          loggedIn={loggedIn}
          image={x.image}
          tweet={x.tweet}
          youtube={x.youtube}
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
