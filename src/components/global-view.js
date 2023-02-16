import React, {useEffect} from 'react'
import './global-view.css'

import { useSelector } from 'react-redux'
import Post from './Post/post'

export default function GlobalView() {

  const loggedIn = true
  // localStorage.clear()

  const liveText = useSelector((state) => state.livetext.value)
  // console.log(liveText)
  if(!liveText) return
  
  // Sort items by timestamp
  const liveTextArray = [...liveText]
  liveTextArray.sort((a, b) => {
    const valA = a.timestamp; 
    const valB = b.timestamp; 
    if (valA < valB) { return 1; }
    if (valA > valB) { return -1; }
    return 0;
  });




  const displayLiveText = liveTextArray.map((x, index) => {

    if(!loggedIn && x.hidden ) return 
    // console.log(index)
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
