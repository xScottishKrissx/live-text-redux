import React from 'react'
import './global-view.css'

import { useSelector } from 'react-redux'
import Post from './Post/post'

export default function GlobalView() {

  const liveText = useSelector((state) => state.livetext.value)
  if(!liveText) return

  const displayLiveText = liveText.map((x, index) => {
    // const postStyle = {
    //   boxShadow:"5px 5px 0px 0px red"
    // }
    return(
      <div className={'post-item ' + x.type} key={index} >
        <Post
          title={x.title}
          subtitle={x.subtitle}
          body={x.body}
          type={x.type}
        />
      </div>
    )
  })

  return (
    <div className='global-view-wrapper'>
        {displayLiveText}
    </div>
  )
}
