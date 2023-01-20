import React from 'react'
import './global-view.css'

import { useSelector } from 'react-redux'
import Post from './Post/post'

export default function GlobalView() {

  const loggedIn = true

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
    // const postStyle = {
    //   boxShadow:"5px 5px 0px 0px red"
    // }
    if(!loggedIn && x.hidden ) return 
    return(
      <div className={'post-item ' + x.type} key={index} >
        <Post
          id={x.id}
          title={x.title}
          subtitle={x.subtitle}
          body={x.body}
          type={x.type}
          timestamp={x.timestamp}
          hidden={x.hidden}
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
